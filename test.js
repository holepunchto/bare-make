const test = require('brittle')
const path = require('path')
const make = require('.')

test('basic', async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  const build = await make.generate({ cwd, cache: false, stdio: 'inherit' })

  t.is(build, path.resolve(__dirname, 'test/fixtures/basic/build'))

  await make.build({ build, cwd, stdio: 'inherit' })

  const install = await make.install({ build, cwd, stdio: 'inherit' })

  t.is(install, path.resolve(__dirname, 'test/fixtures/basic/prebuilds'))
})
