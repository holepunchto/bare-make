const test = require('brittle')
const path = require('path')
const make = require('.')

test('basic', { timeout: 120000 }, async (t) => {
  const cwd = path.resolve(__dirname, 'test/fixtures/basic')

  const build = await make.generate({ cwd, cache: false })

  t.is(build, path.resolve(__dirname, 'test/fixtures/basic/build'))

  await make.build({ build, cwd })

  const install = await make.install({ build, cwd })

  t.is(install, path.resolve(__dirname, 'test/fixtures/basic/prebuilds'))
})
