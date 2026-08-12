import Pipe from 'bare-pipe'

/** Options for `generate()`. */
declare interface GenerateOptions {
  /** Architecture to build for (default the host architecture). */
  arch?: string
  /** Path to the build tree (default `'build'`, unset when `preset` is given). */
  build?: string
  /** Reuse the build variable cache; set to `false` to configure fresh (default `true`). */
  cache?: boolean
  /** Working directory the generation runs in (default the process working directory). */
  cwd?: string
  /** Configure a debug build (default `false`). */
  debug?: boolean
  /**
   * Build variable cache entries to create or update, as `<var>[:<type>]=<value>` strings (default
   * `[]`).
   */
  define?: string[]
  /** The environment to build for (default none). */
  environment?: string
  /** Configure for fuzzing (default `false`). */
  fuzz?: boolean
  /** Operating system platform to build for (default the host platform). */
  platform?: string
  /** CMake preset to use (default none). */
  preset?: string
  /** Sanitizer to enable (default none). */
  sanitize?: string
  /** Build for a simulator (default `false`). */
  simulator?: boolean
  /** Path to the source tree (default `'.'`). */
  source?: string
  /** Standard I/O configuration passed to the CMake subprocess. */
  stdio?: Pipe
  /** Enable verbose output (default `false`). */
  verbose?: boolean
  /** Configure a release build with debug symbols (default `false`). */
  withDebugSymbols?: boolean
  /** Configure a release build with minimal size (default `false`). */
  withMinimalSize?: boolean
}

/**
 * @param opts - Options; `source` defaults to `'.'`, `build` to `'build'`, `platform` and `arch` to
 * the host, `cache` to `true`, and the build-type flags (`debug`, `fuzz`, `withDebugSymbols`,
 * `withMinimalSize`, `verbose`) to `false`.
 * @throws {UNKNOWN_TOOLCHAIN} no toolchain is available for the resolved `platform`-`arch` target.
 * @throws {GENERATE_FAILED} build system generation exits with a non-zero status.
 */
declare function generate(opts?: GenerateOptions): Promise<void>

declare namespace generate {
  export { GenerateOptions }
}

export = generate
