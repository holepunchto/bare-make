import Pipe from 'bare-pipe'

declare interface TestOptions {
  build?: string
  cwd?: string
  parallel?: number
  stdio?: Pipe
  timeout?: number
  verbose?: boolean
}

declare function test(opts?: TestOptions): Promise<void>

declare namespace test {
  export { type TestOptions }
}

export = test
