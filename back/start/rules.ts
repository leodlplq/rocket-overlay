import { Options, uniqueRule } from '#rules/unique'
import { VineString } from '@vinejs/vine'

declare module '@vinejs/vine' {
  interface VineString {
    unique(options: Options): this
  }
}

VineString.macro('unique', function (this: VineString, options: Options) {
  return this.use(uniqueRule(options))
})
