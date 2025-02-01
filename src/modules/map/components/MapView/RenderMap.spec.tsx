import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { RenderMap } from './RenderMap'
import { useLeagueMap } from '@/modules/leagues/hooks/useLeagueMap'
import { mockTeam } from '@/test/mocks/teamMock'

vi.mock('@/modules/leagues/hooks/useLeagueMap')

const mockMapLocation = {
  center: [51.505, -0.09] as [number, number],
  zoom: 13,
}

describe('RenderMap', () => {
  it('should render loading state', () => {
    vi.mocked(useLeagueMap).mockReturnValue({
      teams: [],
      isLoading: true,
      mapLocation: mockMapLocation,
    })

    render(<RenderMap />)
    expect(
      screen.getByText('Carregando ligas, carregando times...'),
    ).toBeInTheDocument()
  })
})
