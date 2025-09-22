const fs = require('fs')
const os = require('os')
const path = require('path')
const cmake = require('cmake-runtime/spawn')
const toolchains = require('cmake-toolchains')
const ninja = require('ninja-runtime')()
const errors = require('./errors')

try {
  fs.accessSync(ninja, fs.constants.X_OK)
} catch {
  fs.chmodSync(ninja, 0o755)
}

module.exports = async function generate(opts = {}) {
  const {
    source = '.',
    build = 'build',
    platform = os.platform(),
    arch = os.arch(),
    simulator = false,
    environment = null,
    cache = true,
    sanitize = null,
    debug = false,
    withDebugSymbols = false,
    withMinimalSize = false,
    define = [],
    cwd = path.resolve('.'),
    color = false,
    verbose = false,
    stdio
  } = opts

  let target = `${platform}-${arch}`

  if (simulator) target += '-simulator'
  else if (environment) target += `-${environment}`

  if (target in toolchains === false) {
    throw errors.UNKNOWN_TOOLCHAIN(`No toolchain found for target '${target}'`)
  }

  const args = ['-S', source, '-B', path.resolve(cwd, build), '-G', 'Ninja']

  args.push('--toolchain', toolchains[target])

  if (cache === false) args.push('--fresh')

  args.push(
    `-DCMAKE_BUILD_TYPE=${debug ? 'Debug' : withDebugSymbols ? 'RelWithDebInfo' : withMinimalSize ? 'MinSizeRel' : 'Release'}`,

    `-DCMAKE_MESSAGE_LOG_LEVEL=${verbose ? 'VERBOSE' : 'NOTICE'}`,

    `-DCMAKE_MAKE_PROGRAM=${ninja}`,

    // Export compile commands for use by external tools, such as the Clangd
    // language server (https://clangd.llvm.org).
    '-DCMAKE_EXPORT_COMPILE_COMMANDS=ON'
  )

  const compilerFlags = []
  const linkerFlags = []

  if (debug || sanitize) {
    compilerFlags.push(
      platform === 'win32' ? '/Oy-' : '-fno-omit-frame-pointer'
    )
  }

  if (sanitize) {
    compilerFlags.push(`-fsanitize=${sanitize}`)
    linkerFlags.push(`-fsanitize=${sanitize}`)
  }

  if (color) compilerFlags.push('-fcolor-diagnostics')

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
        resolve()
      } else {
        reject(errors.GENERATE_FAILED('Build system generation failed'))
      }
    })
  })
}
