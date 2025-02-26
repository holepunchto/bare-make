import Pipe from 'bare-pipe'

declare interface BuildOptions {
  build?: string
  clean?: boolean
  cwd?: string
  parallel?: number
  stdio?: Pipe
  target?: string
  verbose?: boolean
}

declare function build(opts?: BuildOptions): Promise<void>

declare namespace build {
  export { type BuildOptions }
}

export = build
