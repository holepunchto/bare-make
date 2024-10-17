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

## API

#### `await generate([options])`

Options include:

```js
{
  source: '.',
  build: 'build',
  platform: os.platform(),
  arch: os.arch(),
  simulator: false,
  cache: true,
  sanitize,
  debug,
  define,
  cwd: path.resolve('.'),
  verbose: false,
  stdio
}
```

#### `await build([options])`

Options include:

```js
{
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
{
  build: 'build',
  prefix: 'prebuilds',
  component,
  link: false,
  parallel,
  cwd: path.resolve('.'),
  verbose: false,
  stdio
}
```

## CLI

#### `generate [flags]`

Flags include:

```console
--source|-s <path>
--build|-b <path>
--platform|-p <name>
--arch|-a <name>
--simulator
--no-cache
--debug|-d
--sanitize <name>
--define|-D <var>[:<type>]=<value>
--verbose
--help|-h
```

#### `build [flags]`

Flags include:

```console
--build|-b <path>
--target|-t <name>
--clean|-c
--parallel|-j <number>
--verbose
--help|-h
```

#### `install [flags]`

Flags include:

```console
--build|-b <path>
--prefix|-p <path>
--component|-c <name>
--link|-l
--parallel|-j <number>
--verbose
--help|-h
```

## License

Apache-2.0
