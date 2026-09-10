import Pipe from 'bare-pipe'

/** Options for `test()`. */
declare interface TestOptions {
  /** Path to the build tree (default `'build'`). */
  build?: string
  /** Working directory the tests run in (default the process working directory). */
  cwd?: string
  /** Number of parallel jobs; a negative value lets the runner decide (default `-1`). */
  parallel?: number
  /** CMake preset to use (default none). */
  preset?: string
  /** Standard I/O configuration passed to the CMake subprocess. */
  stdio?: Pipe
  /** Default per-test timeout in seconds (default `30`). */
  timeout?: number
  /** Enable verbose output (default `false`). */
  verbose?: boolean
}

/**
 * @param opts - Options; `build` defaults to `'build'`, `timeout` to `30` seconds, `parallel` to
 * `-1`, and `verbose` to `false`.
 * @throws {TEST_FAILED} one or more tests fail.
 */
declare function test(opts?: TestOptions): Promise<void>

declare namespace test {
  export { type TestOptions }
}

export = test
