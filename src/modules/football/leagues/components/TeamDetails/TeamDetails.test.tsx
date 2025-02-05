import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TeamDetails } from './TeamDetails'
import { useTeamDetailsStore } from '../../store/useTeamDetailsStore'
import { mockTeam } from '@/modules/football/mocks/team'

vi.mock('../../store/useTeamDetailsStore')
vi.mock('next/image', () => ({
  default: () => <img alt="mock" />,
}))

describe.skip('TeamDetails', () => {
  it('should render empty state when no team is selected', () => {
    const mockUseStore = useTeamDetailsStore as vi.Mock
    mockUseStore.mockImplementation(() => ({
      team: null,
    }))

    render(<TeamDetails />)

    expect(screen.getByText('Selecione um time no mapa')).toBeDefined()
  })

  it('should render team details when team is selected', () => {
    const mockUseStore = useTeamDetailsStore as vi.Mock
    mockUseStore.mockImplementation(() => ({
      team: mockTeam,
    }))

    render(<TeamDetails />)

    expect(screen.getByText(mockTeam.name)).toBeDefined()
    expect(screen.getByText(mockTeam.tla)).toBeDefined()
    expect(screen.getByText(mockTeam.venue)).toBeDefined()
    expect(screen.getByText(mockTeam.clubColors)).toBeDefined()
  })
})
