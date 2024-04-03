import { existsRule } from '#rules/exists'
import { Options, uniqueRule } from '#rules/unique'
import { VineNumber, VineString } from '@vinejs/vine'

declare module '@vinejs/vine' {
  interface VineString {
    unique(options: Options): this
  }

  interface VineNumber {
    exists(options: Options): this
  }
}

VineString.macro('unique', function (this: VineString, options: Options) {
  return this.use(uniqueRule(options))
})

VineNumber.macro('exists', function (this: VineNumber, options: Options) {
  return this.use(existsRule(options))
})
