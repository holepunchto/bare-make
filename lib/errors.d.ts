declare class MakeError extends Error {
  /**
   * Construct a `MakeError` with the given message and `code`.
   * @param msg - Human-readable error message.
   * @param code - The error code, assigned to `err.code`.
   * @param fn - The function to omit from the captured stack trace (default the `MakeError` constructor).
   */
  constructor(msg: string, code: string, fn?: MakeError)

  /**
   * Create a `MakeError` with code `'UNKNOWN_TOOLCHAIN'`.
   * @param msg - Human-readable error message.
   */
  static UNKNOWN_TOOLCHAIN(msg: string): MakeError
  /**
   * Create a `MakeError` with code `'GENERATE_FAILED'`.
   * @param msg - Human-readable error message.
   */
  static GENERATE_FAILED(msg: string): MakeError
  /**
   * Create a `MakeError` with code `'BUILD_FAILED'`.
   * @param msg - Human-readable error message.
   */
  static BUILD_FAILED(msg: string): MakeError
  /**
   * Create a `MakeError` with code `'INSTALL_FAILED'`.
   * @param msg - Human-readable error message.
   */
  static INSTALL_FAILED(msg: string): MakeError
  /**
   * Create a `MakeError` with code `'TEST_FAILED'`.
   * @param msg - Human-readable error message.
   */
  static TEST_FAILED(msg: string): MakeError
}

export = MakeError
