import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from '@headlessui/react'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

export const FileInput = forwardRef<
  HTMLInputElement,
  {
    type?: 'file'
  } & HeadlessInputProps
>(function FileInput({ className, ...props }, ref) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,

        // Basic layout
        'relative block w-full',

        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow',

        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',

        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500',

        // Disabled state
        'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none',

        // Invalid state
        'before:has-[[data-invalid]]:shadow-red-500/10',
      ])}>
      <HeadlessInput
        ref={ref}
        className={clsx([
          // Basic layout
          'relative block w-full file:appearance-none rounded-lg file:px-[calc(theme(spacing[3.5])-1px)] file:py-[calc(theme(spacing[2.5])-1px)] file:sm:px-[calc(theme(spacing[3])-1px)] file:sm:py-[calc(theme(spacing[1.5])-1px)]',
          // Typography
          'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
          // input file Typography
          'file:text-base/6 file:text-zinc-950 file:placeholder:text-zinc-500 file:sm:text-sm/6 file:dark:text-white',
          //Input file border
          'file:border-none',
          // Border
          'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
          // Input file background color
          'file:bg-zinc-700 file:dark:bg-zinc-800',
          // Background color
          'bg-transparent dark:bg-white/5',
          // Hide default focus styles
          'focus:outline-none',
          // Hide default focus styles
          'file:focus:outline-none',
          // Invalid state
          'file:data-[invalid]:border-red-500 file:data-[invalid]:data-[hover]:border-red-500 file:data-[invalid]:dark:border-red-500 file:data-[invalid]:data-[hover]:dark:border-red-500 file:data-[invalid]:dark:bg-red-600/40',
          // file input invalid state
          'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500',
          // Disabled state
          'data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]',
          // input file disabled state
          'file:disabled:border-zinc-950/20 file:disabled:dark:border-white/15 file:disabled:dark:bg-white/[2.5%]',

          // File input
          // 'file:bg-transparent file:dark:bg-white/5 file:border-none',
        ])}
        {...props}
      />
    </span>
  )
})
