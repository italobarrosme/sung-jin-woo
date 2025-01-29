'use client'

import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const inputVariants = cva(
  'w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-primary-regular placeholder:text-neutral-lightest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary-regular focus:border-neutral-white',
        error: 'border-feedback-error focus:border-feedback-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type InputProps = ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    label?: string
    error?: string
  }

export function Input({
  className,
  variant,
  label,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-200">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          inputVariants({ variant: error ? 'error' : variant, className }),
        )}
        {...props}
      />
      {error && <span className="text-xs text-feedback-error">{error}</span>}
    </div>
  )
}
