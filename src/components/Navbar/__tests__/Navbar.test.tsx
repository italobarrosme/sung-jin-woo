import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '../Navbar'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
    getAll: vi.fn(),
    has: vi.fn(),
    forEach: vi.fn(),
    entries: vi.fn(),
    keys: vi.fn(),
    values: vi.fn(),
    toString: vi.fn(),
  })),
  usePathname: vi.fn(),
}))

describe('Navbar', () => {
  const mockItems = [
    {
      label: 'Premier League',
      value: 'premier-league',
      icon: <span data-testid="pl-icon">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>,
    },
    {
      label: 'La Liga',
      value: 'la-liga',
      icon: <span data-testid="laliga-icon">🇪🇸</span>,
    },
  ]

  const mockRouter = useRouter()
  const mockParams = useSearchParams()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePathname).mockReturnValue('/map')
    vi.mocked(mockParams.get).mockReturnValue(null)
  })

  it('should render navbar with title and items', () => {
    render(<Navbar items={mockItems} />)

    expect(screen.getByText('GeoMatches')).toBeInTheDocument()
    expect(screen.getByText('Premier League')).toBeInTheDocument()
    expect(screen.getByText('La Liga')).toBeInTheDocument()
    expect(screen.getByTestId('pl-icon')).toBeInTheDocument()
    expect(screen.getByTestId('laliga-icon')).toBeInTheDocument()
  })

  it.skip('should update URL when clicking league button', () => {
    render(<Navbar items={mockItems} />)

    fireEvent.click(screen.getByText('Premier League'))

    expect(mockRouter.push).toHaveBeenCalledWith('/league=premier-league')
  })
})
