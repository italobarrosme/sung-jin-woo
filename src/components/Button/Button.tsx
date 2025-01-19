import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonStyles = cva(['bg-primary-regular px-4 py-2 text-base'], {
  variants: {
    size: {
      small: 'px-2 py-1 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
      full: 'w-full',
      fit: 'w-fit',
    },
    shape: {
      regular: 'rounded-md bg-primary-regular',
      secondary: 'rounded-lg bg-secondary-regular',
      outline:
        'border border-primary-regular bg-transparent text-primary-regular',
      ghost: 'bg-transparent text-primary-regular',
    },
  },
})

type ButtonStylesProps = VariantProps<typeof buttonStyles>

type ButtonVariants = Omit<ButtonStylesProps, 'size' | 'shape'> & {
  variant: `${NonNullable<ButtonStylesProps['size']>}-${NonNullable<ButtonStylesProps['shape']>}`
}

export type ButtonProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants

export const Button = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => {
  const [size, shape] = variant.split('-') as [
    ButtonStylesProps['size'],
    ButtonStylesProps['shape'],
  ]

  return (
    <button
      className={
        (cn(
          buttonStyles({
            size,
            shape,
          }),
        ),
        className)
      }
      {...props}
    >
      {children}
    </button>
  )
}
