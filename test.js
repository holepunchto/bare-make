const test = require('brittle')
const path = require('path')
const { isWindows } = require('which-runtime')
const make = require('.')

test('basic', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false, stdio: 'inherit' }))

  await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))

  await t.execution(make.install({ cwd, stdio: 'inherit' }))
})

test('address sanitizier', { skip: isWindows, timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false, stdio: 'inherit', sanitize: 'address' }))

  await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))
}
)

test('color', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  await t.execution(make.generate({ cwd, cache: false, color: true, stdio: 'inherit' }))

  await t.execution(make.build({ cwd, clean: true, stdio: 'inherit' }))
})
