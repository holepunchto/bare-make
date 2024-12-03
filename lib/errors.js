module.exports = class MakeError extends Error {
  constructor(msg, code, fn = MakeError) {
    super(`${code}: ${msg}`)
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, fn)
    }
  }

  get name() {
    return 'MakeError'
  }

  static UNKNOWN_TOOLCHAIN(msg) {
    return new MakeError(msg, 'UNKNOWN_TOOLCHAIN', MakeError.UNKNOWN_TOOLCHAIN)
  }

  static GENERATE_FAILED(msg) {
    return new MakeError(msg, 'GENERATE_FAILED', MakeError.GENERATE_FAILED)
  }

  static BUILD_FAILED(msg) {
    return new MakeError(msg, 'BUILD_FAILED', MakeError.BUILD_FAILED)
  }

  static INSTALL_FAILED(msg) {
    return new MakeError(msg, 'INSTALL_FAILED', MakeError.INSTALL_FAILED)
  }

  static TEST_FAILED(msg) {
    return new MakeError(msg, 'TEST_FAILED', MakeError.TEST_FAILED)
  }
}
