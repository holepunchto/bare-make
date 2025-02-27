declare class MakeError extends Error {
  constructor(msg: string, code: string, fn?: MakeError)

  static UNKNOWN_TOOLCHAIN(msg: string): MakeError
  static GENERATE_FAILED(msg: string): MakeError
  static BUILD_FAILED(msg: string): MakeError
  static INSTALL_FAILED(msg: string): MakeError
  static TEST_FAILED(msg: string): MakeError
}

export = MakeError
