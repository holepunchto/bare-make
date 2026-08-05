import Pipe from 'bare-pipe'

/** Options for `install()`. */
declare interface InstallOptions {
  /** Path to the build tree (default `'build'`). */
  build?: string
  /** The component to install (default all components). */
  component?: string
  /** Working directory the install runs in (default the process working directory). */
  cwd?: string
  /** Symlink rather than copy the installed files (default `false`). */
  link?: boolean
  /** Whether to install in parallel (default `false`). */
  parallel?: boolean
  /** The prefix to install to (default `'prebuilds'`). */
  prefix?: string
  /** Standard I/O configuration passed to the CMake subprocess. */
  stdio?: Pipe
  /** Strip symbols before installing (default `false`). */
  strip?: boolean
  /** Enable verbose output (default `false`). */
  verbose?: boolean
}

/**
 * @param opts - Options; `build` defaults to `'build'`, `prefix` to `'prebuilds'`, and `link`, `strip`, and `verbose` to `false`.
 * @throws {INSTALL_FAILED} the install exits with a non-zero status.
 */
declare function install(opts?: InstallOptions): Promise<void>

declare namespace install {
  export { type InstallOptions }
}

export = install
