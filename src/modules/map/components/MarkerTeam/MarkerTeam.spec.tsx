import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkerTeam } from './MarkerTeam'
import { MapContainer } from 'react-leaflet'
import { mockTeam } from '@/test/mocks/teamMock'

describe.skip('MarkerTeam', () => {
  it('should render marker with team information', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <MarkerTeam team={mockTeam} />
      </MapContainer>,
    )

    expect(screen.getByTestId('marker')).toBeInTheDocument()
    expect(screen.getByTestId('popup')).toBeInTheDocument()
    expect(screen.getByTestId('team-logo')).toBeInTheDocument()
  })

  it('should display team details in popup', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <MarkerTeam team={mockTeam} />
      </MapContainer>,
    )

    const popup = screen.getByTestId('popup')
    expect(popup).toHaveTextContent(mockTeam.name)
    expect(popup).toHaveTextContent(mockTeam.tla)
    expect(popup).toHaveTextContent(mockTeam.venue)
    expect(popup).toHaveTextContent(mockTeam.website)
    expect(popup).toHaveTextContent(String(mockTeam.founded))
    expect(popup).toHaveTextContent(mockTeam.clubColors)
  })

  it('should render team logo with correct attributes', () => {
    render(
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <MarkerTeam team={mockTeam} />
      </MapContainer>,
    )

    const logo = screen.getByTestId('team-logo')
    expect(logo).toHaveAttribute('src', mockTeam.crest)
    expect(logo).toHaveAttribute('alt', `${mockTeam.name} logo`)
  })
})
