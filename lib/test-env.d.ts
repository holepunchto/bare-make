/** Options for `test.env()`. */
declare interface EnvOptions {
  /** Path to the build tree (default `'build'`). */
  build?: string
  /** Working directory the build tree is resolved against (default the process working directory). */
  cwd?: string
}

/**
 * Resolve the environment variables that programs from the build tree need to run, as changed by
 * the test launcher.
 * @param opts - Options; `build` defaults to `'build'`.
 * @returns The changed variables with their resolved values.
 * @throws {ENV_FAILED} the build tree does not exist or the environment cannot be resolved.
 */
declare function env(opts?: EnvOptions): Promise<Record<string, string>>

declare namespace env {
  export { type EnvOptions }
}

export = env
