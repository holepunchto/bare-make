#!/usr/bin/env node
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
  flag('--no-cache', 'Disregard the build variable cache'),
  flag('--debug|-d', 'Configure a debug build'),
  flag('--sanitize <name>', 'Enable a sanitizer'),
  flag('--define|-D <var>[:<type>]=<value>', 'Create or update a build variable cache entry'),
  flag('--verbose', 'Enable verbose output'),
  async (cmd) => {
    const { source, build, platform, arch, simulator, cache, debug, sanitize, define, verbose } = cmd.flags

    try {
      await make.generate({
        source,
        build,
        platform,
        arch,
        simulator,
        cache,
        debug,
        sanitize,
        define,
        verbose,
        stdio: 'inherit'
      })
    } catch {
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
  flag('--parallel|-j <number>', 'Build in parallel using the given number of jobs'),
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
  flag('--parallel|-j <number>', 'Install in parallel using the given number of jobs'),
  flag('--verbose', 'Enable verbose output'),
  async (cmd) => {
    const { build, prefix, component, parallel, verbose } = cmd.flags

    try {
      await make.install({
        build,
        prefix,
        component,
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
  'bare-make',
  summary(pkg.description),
  generate,
  build,
  install
)

cmd.parse()
