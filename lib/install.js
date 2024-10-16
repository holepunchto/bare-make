const path = require('path')
const cmake = require('cmake-runtime/spawn')
const errors = require('./errors')

module.exports = async function install (opts = {}) {
  const {
    build = 'build',
    prefix = 'prebuilds',
    component = null,
    parallel = 0,
    cwd = path.resolve('.'),
    verbose = false,
    stdio
  } = opts

  const args = [
    '--install', path.resolve(cwd, build),
    '--prefix', path.resolve(cwd, prefix)
  ]

  if (component) args.push('--component', component)
  if (parallel > 0) args.push('--parallel', parallel)
  if (verbose) args.push('--verbose')

  const job = cmake({ args, cwd, stdio })

  return new Promise((resolve, reject) => {
    job.on('exit', () => {
      if (job.exitCode === 0) {
        resolve(path.resolve(cwd, prefix))
      } else {
        reject(errors.INSTALL_FAILED('Install failed'))
      }
    })
  })
}
