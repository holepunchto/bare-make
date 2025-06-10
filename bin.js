#!/usr/bin/env node
const process = require('process')
const { command, flag, summary } = require('paparam')
const pkg = require('./package')
const make = require('.')

const generate = command(
  'generate',
  summary('Generate a build tree'),
  flag('--source|-s <path>', 'The path to the source tree'),
  flag('--build|-b <path>', 'The path to the build tree'),
  flag('--platform|-p <name>', 'The operating system platform to build for'),
  flag('--arch|-a <name>', 'The operating system architecture to build for'),
  flag('--simulator', 'Build for a simulator'),
  flag('--environment|-e <name>', 'The environment to build for'),
  flag('--no-cache', 'Disregard the build variable cache'),
  flag('--debug|-d', 'Configure a debug build'),
  flag('--with-debug-symbols', 'Configure a release build with debug symbols'),
  flag('--with-minimal-size', 'Configure a release build with minimal size'),
  flag('--sanitize <name>', 'Enable a sanitizer'),
  flag(
    '--define|-D <var>[:<type>]=<value>',
    'Create or update a build variable cache entry'
  ).multiple(),
  flag('--color', 'Enable colored output').default(process.stdout.isTTY),
  flag('--no-color', 'Disable colored output'),
  flag('--verbose', 'Enable verbose output'),
  async (cmd) => {
    const {
      source,
      build,
      platform,
      arch,
      simulator,
      environment,
      cache,
      debug,
      withDebugSymbols,
      withMinimalSize,
      sanitize,
      define,
      color,
      verbose
    } = cmd.flags

    try {
      await make.generate({
        source,
        build,
        platform,
        arch,
        simulator,
        environment,
        cache,
        debug,
        withDebugSymbols,
        withMinimalSize,
        sanitize,
        define,
        color,
        verbose,
        stdio: 'inherit'
      })
    } catch (err) {
      if (err && err.code === 'UNKNOWN_TOOLCHAIN') console.error(err)
      process.exitCode = 1
    }
  }
)

const build = command(
  'build',
  summary('Build a generated build tree'),
  flag('--build|-b <path>', 'The path to the build tree'),
  flag('--target|-t <name>', 'The target to build'),
  flag('--clean|-c', 'Clean before building'),
  flag(
    '--parallel|-j <number>',
    'Build in parallel using the given number of jobs'
  ),
  flag('--verbose', 'Enable verbose output'),
  async (cmd) => {
    const { build, target, clean, parallel, verbose } = cmd.flags

    try {
      await make.build({
        build,
        target,
        clean,
        parallel,
        verbose,
        stdio: 'inherit'
      })
    } catch {
      process.exitCode = 1
    }
  }
)

const install = command(
  'install',
  summary('Install a generated build tree'),
  flag('--build|-b <path>', 'The path to the build tree'),
  flag('--prefix|-p <path>', 'The prefix to install to'),
  flag('--component|-c <name>', 'The component to install'),
  flag('--link|-l', 'Link rather than copy the files'),
  flag('--strip|-s', 'Strip before installing'),
  flag(
    '--parallel|-j <number>',
    'Install in parallel using the given number of jobs'
  ),
  flag('--verbose', 'Enable verbose output'),
  async (cmd) => {
    const { build, prefix, component, link, strip, parallel, verbose } =
      cmd.flags

    try {
      await make.install({
        build,
        prefix,
        component,
        link,
        strip,
        parallel,
        verbose,
        stdio: 'inherit'
      })
    } catch {
      process.exitCode = 1
    }
  }
)

const test = command(
  'test',
  summary('Run tests for a generated build tree'),
  flag('--build|-b <path>', 'The path to the build tree'),
  flag('--timeout <seconds>', 'The default test timeout'),
  flag(
    '--parallel|-j <number>',
    'Run tests in parallel using the given number of jobs'
  ),
  flag('--verbose', 'Enable verbose output'),
  async (cmd) => {
    const { build, timeout, parallel, verbose } = cmd.flags

    try {
      await make.test({
        build,
        timeout,
        parallel,
        verbose,
        stdio: 'inherit'
      })
    } catch {
      process.exitCode = 1
    }
  }
)

const cmd = command(
  pkg.name,
  summary(pkg.description),
  flag('--version|-v', 'Print the current version'),
  generate,
  build,
  install,
  test,
  async (cmd) => {
    const { version } = cmd.flags

    if (version) return console.log(`v${pkg.version}`)

    console.log(cmd.command.help())
  }
)

cmd.parse()
