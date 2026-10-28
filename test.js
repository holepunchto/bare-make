const test = require('brittle')
const os = require('os')
const path = require('path')
const cmake = require('cmake-runtime/spawn')
const make = require('.')

test('basic', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false, stdio: 'inherit' }))

  await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))

  await t.execution(make.install({ cwd, stdio: 'inherit' }))
})

test('address sanitizier', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(
    make.generate({
      cwd,
      cache: false,
      stdio: 'inherit',
      sanitize: 'address'
    })
  )

  await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))

  const env = await make.test.env({ cwd })

  const name = Object.keys(env).find((name) => name.toUpperCase() === 'PATH')

  const symbolizer = path.dirname(require('llvm-runtime')('llvm-symbolizer'))

  t.ok(env[name].split(path.delimiter).includes(symbolizer), 'puts llvm-symbolizer on PATH')
})

test(
  'address sanitizer, preload',
  { skip: os.platform() === 'win32', timeout: 120000 },
  async (t) => {
    const cwd = path.resolve(__dirname, 'test/fixtures/preload')

    await t.execution(
      make.generate({
        cwd,
        cache: false,
        stdio: 'inherit',
        sanitize: 'address'
      })
    )

    await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))

    const env = await make.test.env({ cwd })

    // The program is not sanitized itself, so only the preloaded runtime reports.
    const output = await run(cwd, env, [
      path.join(cwd, 'build/exe'),
      path.join(cwd, 'build/liblib.so')
    ])

    t.ok(
      /AddressSanitizer: heap-buffer-overflow/.test(output),
      'preloads the AddressSanitizer runtime'
    )
  }
)

test('color', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false, color: true, stdio: 'inherit' }))

  await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))
})

test('env', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/launcher')

  await t.execution(make.generate({ cwd, cache: false, stdio: 'inherit' }))

  const env = await make.test.env({ cwd })

  t.is(env.BARE_MAKE_TEST, 'launcher')
})

test('env, no build tree', async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/missing')

  await t.exception(make.test.env({ cwd }), /ENV_FAILED/)
})

function run(cwd, env, command) {
  const args = [
    '-E',
    'env',
    ...Object.entries(env).map(([name, value]) => `${name}=${value}`),
    '--',
    ...command
  ]

  const job = cmake({ args, cwd, stdio: ['ignore', 'pipe', 'pipe'] })

  let output = ''

  job.stdout.on('data', (data) => {
    output += data
  })

  job.stderr.on('data', (data) => {
    output += data
  })

  return new Promise((resolve) => job.on('close', () => resolve(output)))
}
