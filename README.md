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
  environment: null,
  cache: true,
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
  cwd: path.resolve('.'),
  verbose: false,
  stdio
}
```

## CLI

#### `bare-make generate [flags]`

Flags include:

```console
--source|-s <path>
--build|-b <path>
--platform|-p <name>
--arch|-a <name>
--simulator
--environment|-e <name>
--no-cache
--debug|-d
--with-debug-symbols
--with-minimal-size
--sanitize <name>
--define|-D <var>[:<type>]=<value>
--color
--verbose
--help|-h
```

#### `bare-make build [flags]`

Flags include:

```console
--build|-b <path>
--target|-t <name>
--clean|-c
--parallel|-j <number>
--verbose
--help|-h
```

#### `bare-make install [flags]`

Flags include:

```console
--build|-b <path>
--prefix|-p <path>
--component|-c <name>
--link|-l
--strip|-s
--parallel|-j <number>
--verbose
--help|-h
```

#### `bare-make test [flags]`

Flags include:

```console
--build|-b <path>
--timeout <seconds>
--parallel|-j <number>
--verbose
--help|-h
```

## License

Apache-2.0
