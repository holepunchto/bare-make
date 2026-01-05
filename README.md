# bare-make

Opinionated build system generator based on CMake. It generates build files for Ninja using Clang as the compiler toolchain across all supported systems, ensuring a consistent and reliable compilation process. Beyond forcing the build system and compiler toolchain, everything is still plain CMake, making it easy to eject to the normal CMake flow as necessary.

```
npm i [-g] bare-make
```

## Usage

Like CMake, builds happen in three steps: You first generate a build system, then run the build system, and finally install the built artefacts. To perform the steps programmatically from JavaScript, do:

```js
const make = require('bare-make')

await make.generate()
await make.build()
await make.install()
```

The steps can also be performed interactively from the command line using the included CLI:

```console
bare-make generate
bare-make build
bare-make install
```

### Testing

To run tests for projects that use [`enable_testing()`](https://cmake.org/cmake/help/latest/command/enable_testing.html#command:enable_testing) and [`add_test()`](https://cmake.org/cmake/help/latest/command/add_test.html#command:add_test), do:

```js
await make.test()
```

Tests can also be run from the command line:

```console
bare-make test
```

## API

#### `await generate([options])`

Options include:

```js
options = {
  source: '.',
  build: 'build',
  platform: os.platform(),
  arch: os.arch(),
  simulator: false,
  environment,
  cache: true,
  preset,
  sanitize,
  debug,
  withDebugSymbols,
  withMinimalSize,
  define,
  cwd: path.resolve('.'),
  color: false,
  verbose: false,
  stdio
}
```

#### `await build([options])`

Options include:

```js
options = {
  build: 'build',
  target,
  clean: false,
  parallel,
  preset,
  cwd: path.resolve('.'),
  verbose: false,
  stdio
}
```

#### `await install([options])`

Options include:

```js
options = {
  build: 'build',
  prefix: 'prebuilds',
  component,
  link: false,
  strip: false,
  parallel,
  cwd: path.resolve('.'),
  verbose: false,
  stdio
}
```

#### `await test([options])`

Options include:

```js
options = {
  build: 'build',
  timeout: 30,
  parallel,
  preset,
  cwd: path.resolve('.'),
  verbose: false,
  stdio
}
```

## CLI

#### `bare-make generate [flags]`

Flags include:

```console
--source|-s <path>                   The path to the source tree
--build|-b <path>                    The path to the build tree
--platform|-p <name>                 The operating system platform to build for
--arch|-a <name>                     The operating system architecture to build for
--simulator                          Build for a simulator
--environment|-e <name>              The environment to build for
--no-cache                           Disregard the build variable cache
--preset <name>                      The preset to use
--debug|-d                           Configure a debug build
--with-debug-symbols                 Configure a release build with debug symbols
--with-minimal-size                  Configure a release build with minimal size
--sanitize <name>                    Enable a sanitizer
--define|-D <var>[:<type>]=<value>   Create or update a build variable cache entry
--no-color                           Disable colored output
--verbose                            Enable verbose output
--help|-h                            Show help
```

#### `bare-make build [flags]`

Flags include:

```console
--build|-b <path>        The path to the build tree
--target|-t <name>       The target to build
--clean|-c               Clean before building
--parallel|-j <number>   Build in parallel using the given number of jobs
--preset <name>          The preset to use
--verbose                Enable verbose output
--help|-h                Show help
```

#### `bare-make install [flags]`

Flags include:

```console
--build|-b <path>        The path to the build tree
--prefix|-p <path>       The prefix to install to
--component|-c <name>    The component to install
--link|-l                Link rather than copy the files
--strip|-s               Strip before installing
--parallel|-j <number>   Install in parallel using the given number of jobs
--verbose                Enable verbose output
--help|-h                Show help
```

#### `bare-make test [flags]`

Flags include:

```console
--build|-b <path>        The path to the build tree
--timeout <seconds>      The default test timeout
--parallel|-j <number>   Run tests in parallel using the given number of jobs
--preset <name>          The preset to use
--verbose                Enable verbose output
--help|-h                Show help
```

## License

Apache-2.0
