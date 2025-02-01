import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MapView } from './MapView'
import { mockTeam } from '@/test/mocks/teamMock'
import type { Team } from '@/types/types'

describe.skip('MapView', () => {
  const defaultProps = {
    teams: [mockTeam] as Team[],
    center: [51.505, -0.09] as [number, number],
    zoom: 13,
  }

  it('should render map container and tile layer', () => {
    render(<MapView {...defaultProps} />)

    expect(screen.getByTestId('map-container')).toBeInTheDocument()
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument()
  })

  it('should render team markers', () => {
    render(<MapView {...defaultProps} />)

    expect(screen.getByTestId('marker')).toBeInTheDocument()
    expect(screen.getByTestId('popup')).toHaveTextContent(mockTeam.name)
  })
})
