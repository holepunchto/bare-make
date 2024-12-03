const path = require('path')
const cmake = require('cmake-runtime/spawn')
const errors = require('./errors')

module.exports = async function test(opts = {}) {
  const {
    build = 'build',
    timeout = 30,
    parallel = -1,
    cwd = path.resolve('.'),
    verbose = false,
    stdio
  } = opts

  const args = [
    '--test-dir',
    path.resolve(cwd, build),
    '--timeout',
    timeout,
    '--output-on-failure'
  ]

  if (parallel >= 0) args.push('--parallel', parallel)
  if (verbose) args.push('--verbose')

  const job = cmake('ctest', { args, cwd, stdio })

  return new Promise((resolve, reject) => {
    job.on('exit', () => {
      if (job.exitCode === 0) {
        resolve()
      } else {
        reject(errors.TEST_FAILED('Test failed'))
      }
    })
  })
}
