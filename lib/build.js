const path = require('path')
const cmake = require('cmake-runtime/spawn')
const errors = require('./errors')

module.exports = async function build(opts = {}) {
  const {
    build = 'build',
    target = null,
    clean = false,
    parallel = 0,
    cwd = path.resolve('.'),
    verbose = false,
    stdio
  } = opts

  const args = ['--build', path.resolve(cwd, build)]

  if (target) args.push('--target', target)
  if (clean) args.push('--clean-first')
  if (parallel > 0) args.push('--parallel', parallel)
  if (verbose) args.push('--verbose')

  const job = cmake({ args, cwd, stdio })

  return new Promise((resolve, reject) => {
    job.on('exit', () => {
      if (job.exitCode === 0) {
        resolve()
      } else {
        reject(errors.BUILD_FAILED('Build failed'))
      }
    })
  })
}
