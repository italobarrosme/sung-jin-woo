import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { RenderMap } from './RenderMap'
import { useLeagueMap } from '@/modules/football/leagues/hooks/useLeagueMap'

vi.mock('@/modules/football/leagues/hooks/useLeagueMap')

vi.mock('@/modules/map/components/MapView/MapView', () => ({
  MapView: ({
    teams,
    center,
    zoom,
  }: {
    teams: any
    center: number[]
    zoom: number
  }) => {
    return (
      <div data-testid="mapview">
        MapView Component - Center: {center.join(', ')} - Zoom: {zoom} - Teams:{' '}
        {teams.length}
      </div>
    )
  },
}))

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

  it('should render MapView when not loading', async () => {
    vi.mocked(useLeagueMap).mockReturnValue({
      teams: [{ id: 1, name: 'Team A' }],
      isLoading: false,
      mapLocation: mockMapLocation,
    })

    render(<RenderMap />)

    // Aguarda o fallback do Suspense (se necessário) e a renderização do MapView
    await waitFor(() => {
      expect(screen.getByTestId('mapview')).toBeInTheDocument()
    })

    expect(screen.getByText(/MapView Component/)).toBeInTheDocument()
  })
})
