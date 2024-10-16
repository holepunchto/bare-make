const os = require('os')
const path = require('path')
const cmake = require('cmake-runtime/spawn')
const toolchains = require('cmake-toolchains')
const errors = require('./errors')

module.exports = async function generate (opts = {}) {
  const {
    source = '.',
    build = 'build',
    platform = os.platform(),
    arch = os.arch(),
    simulator = false,
    cache = true,
    sanitize = null,
    debug = !!sanitize,
    define = [],
    cwd = path.resolve('.'),
    verbose = false,
    stdio
  } = opts

  const target = `${platform}-${arch}${simulator ? '-simulator' : ''}`

  if (target in toolchains === false) {
    throw errors.UNKNOWN_TOOLCHAIN(`No toolchain found for target '${target}'`)
  }

  const args = [
    '-S', source,
    '-B', path.resolve(cwd, build),
    '-G', 'Ninja'
  ]

  args.push('--toolchain', toolchains[target])

  if (cache === false) args.push('--fresh')

  args.push(
    `-DCMAKE_BUILD_TYPE=${debug ? 'Debug' : 'Release'}`,

    `-DCMAKE_MESSAGE_LOG_LEVEL=${verbose ? 'VERBOSE' : 'NOTICE'}`,

    // Export compile commands for use by external tools, such as the Clangd
    // language server (https://clangd.llvm.org).
    '-DCMAKE_EXPORT_COMPILE_COMMANDS=ON'
  )

  const compilerFlags = []
  const linkerFlags = []

  if (debug || sanitize) {
    compilerFlags.push(platform === 'win32' ? '/Oy-' : '-fno-omit-frame-pointer')
  }

  if (sanitize && platform !== 'win32') {
    compilerFlags.push(`-fsanitize=${sanitize}`)
    linkerFlags.push(`-fsanitize=${sanitize}`)
  }

  if (compilerFlags.length) {
    for (const type of ['C']) {
      args.push(`-DCMAKE_${type}_FLAGS=${compilerFlags.join(' ')}`)
    }
  }

  if (linkerFlags.length) {
    for (const type of ['EXE', 'SHARED', 'MODULE']) {
      args.push(`-DCMAKE_${type}_LINKER_FLAGS=${linkerFlags.join(' ')}`)
    }
  }

  for (const entry of define) args.push(`-D${entry}`)

  const job = cmake({ args, cwd, stdio })

  return new Promise((resolve, reject) => {
    job.on('exit', () => {
      if (job.exitCode === 0) {
        resolve(path.resolve(cwd, build))
      } else {
        reject(errors.GENERATE_FAILED('Build system generation failed'))
      }
    })
  })
}
