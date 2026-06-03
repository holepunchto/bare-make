import Pipe from 'bare-pipe'

declare interface GenerateOptions {
  arch?: string
  build?: string
  cache?: boolean
  cwd?: string
  debug?: boolean
  define?: string[]
  environment?: string
  fuzz?: boolean
  platform?: string
  preset?: string
  sanitize?: string
  simulator?: boolean
  source?: string
  stdio?: Pipe
  verbose?: boolean
  withDebugSymbols?: boolean
  withMinimalSize?: boolean
}

declare function generate(opts?: GenerateOptions): Promise<void>

declare namespace generate {
  export { GenerateOptions }
}

export = generate
