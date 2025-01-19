import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, ButtonProps } from './Button'

const renderComponent = ({ variant, children, onClick }: ButtonProps) =>
  render(
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>,
  )

describe('Button', () => {
  it('should render the button with the correct text', () => {
    renderComponent({ variant: 'fit-secondary', children: 'Click me' })

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(/click me/i)
  })

  it('should call the onClick function when clicked', async () => {
    const onClick = vi.fn()

    renderComponent({ variant: 'fit-secondary', children: 'Click me', onClick })

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalled()
  })
})
