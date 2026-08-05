import Pipe from 'bare-pipe'

/** Options for `build()`. */
declare interface BuildOptions {
  /** Path to the build tree (default `'build'`, unset when `preset` is given). */
  build?: string
  /** Clean before building (default `false`). */
  clean?: boolean
  /** Working directory the build runs in (default the process working directory). */
  cwd?: string
  /** Number of parallel jobs; `0` lets the build system decide (default `0`). */
  parallel?: number
  /** CMake preset to use (default none). */
  preset?: string
  /** Standard I/O configuration passed to the CMake subprocess. */
  stdio?: Pipe
  /** The target to build (default all targets). */
  target?: string
  /** Enable verbose output (default `false`). */
  verbose?: boolean
}

/**
 * @param opts - Options; `build` defaults to `'build'` (unset when `preset` is set), `parallel` to `0`, and `clean` and `verbose` to `false`.
 * @throws {BUILD_FAILED} the build exits with a non-zero status.
 */
declare function build(opts?: BuildOptions): Promise<void>

declare namespace build {
  export { type BuildOptions }
}

export = build
