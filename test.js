const test = require('brittle')
const path = require('path')
const make = require('.')

test('basic', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false }))

  await t.execution(make.build({ cwd, clean: true }))

  await t.execution(make.install({ cwd }))
})

test(
  'address sanitizier',
  { skip: Bare.platform === 'win32', timeout: 120000 },
  async (t) => {
    const cwd = path.resolve(__dirname, 'test/fixtures/basic')

    await t.execution(make.generate({ cwd, cache: false, sanitize: 'address' }))

    await t.execution(make.build({ cwd, clean: true }))
  }
)

test('color', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false, color: true }))

  await t.execution(make.build({ cwd, clean: true }))
})
