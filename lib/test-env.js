const fs = require('fs')
const os = require('os')
const path = require('path')
const cmake = require('cmake-runtime/spawn')
const errors = require('./errors')

module.exports = async function env(opts = {}) {
  const { build = 'build', cwd = path.resolve('.') } = opts

  const cache = readCache(path.resolve(cwd, build))

  const launcher = entry(cache, 'bare_make_test_launcher').split(';').filter(Boolean)
  const runtime = entry(cache, 'bare_make_asan_runtime')

  const result = {}

  if (launcher.length) {
    const environment = [require('cmake-runtime')(), '-E', 'environment']

    // The launcher may change the environment in any way, so compare what a
    // program sees with and without it.
    const before = await capture(cwd, environment)
    const after = await capture(cwd, [...launcher, ...environment])

    for (const [key, entry] of after) {
      if (before.has(key) && before.get(key).value === entry.value) continue

      result[entry.name] = entry.value
    }
  }

  // The runtime takes itself out of the variable before starting children, so
  // the variable must be set on the program itself, not on a shell around it.
  if (runtime) {
    result[os.platform() === 'darwin' ? 'DYLD_INSERT_LIBRARIES' : 'LD_PRELOAD'] = runtime
  }

  return result
}

function readCache(build) {
  try {
    return fs.readFileSync(path.join(build, 'CMakeCache.txt'), 'utf8')
  } catch {
    throw errors.ENV_FAILED(`No build tree found at '${build}'`)
  }
}

function entry(cache, name) {
  const match = cache.match(new RegExp(`^${name}:INTERNAL=(.*?)\\r?$`, 'm'))

  return match ? match[1] : ''
}

async function capture(cwd, command) {
  const job = cmake({
    args: ['-E', 'env', '--', ...command],
    cwd,
    stdio: ['ignore', 'pipe', 'inherit']
  })

  let output = ''

  job.stdout.on('data', (data) => {
    output += data
  })

  await new Promise((resolve, reject) => {
    job.on('exit', () => {
      if (job.exitCode === 0) {
        resolve()
      } else {
        reject(errors.ENV_FAILED('Environment resolution failed'))
      }
    })
  })

  const variables = new Map()

  for (const line of output.split(/\r?\n/)) {
    // Windows keeps per-drive working directories in variables named `=C:`.
    const i = line.indexOf('=', 1)

    if (i === -1) continue

    const name = line.substring(0, i)

    // Environment variable names are case insensitive on Windows.
    const key = os.platform() === 'win32' ? name.toUpperCase() : name

    variables.set(key, { name, value: line.substring(i + 1) })
  }

  return variables
}
