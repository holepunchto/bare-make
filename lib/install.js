const path = require('path')
const cmake = require('cmake-runtime/spawn')
const errors = require('./errors')

module.exports = async function install(opts = {}) {
  const {
    build = 'build',
    prefix = 'prebuilds',
    component = null,
    link = false,
    strip = false,
    parallel = 0,
    cwd = path.resolve('.'),
    verbose = false,
    stdio
  } = opts

  const env = { ...require('./env') }

  const args = [
    '--install',
    path.resolve(cwd, build),
    '--prefix',
    path.resolve(cwd, prefix)
  ]

  if (component) args.push('--component', component)
  if (parallel > 0) args.push('--parallel', parallel)
  if (strip) args.push('--strip')
  if (verbose) args.push('--verbose')

  if (link) env.CMAKE_INSTALL_MODE = 'ABS_SYMLINK'

  const job = cmake({ args, cwd, stdio, env })

  return new Promise((resolve, reject) => {
    job.on('exit', () => {
      if (job.exitCode === 0) {
        resolve()
      } else {
        reject(errors.INSTALL_FAILED('Install failed'))
      }
    })
  })
}
