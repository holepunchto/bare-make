import Pipe from 'bare-pipe'

declare interface InstallOptions {
  build?: string
  component?: string
  cwd?: string
  link?: boolean
  parallel?: boolean
  prefix?: string
  stdio?: Pipe
  strip?: boolean
  verbose?: boolean
}

declare function install(opts?: InstallOptions): Promise<void>

declare namespace install {
  export { type InstallOptions }
}

export = install
