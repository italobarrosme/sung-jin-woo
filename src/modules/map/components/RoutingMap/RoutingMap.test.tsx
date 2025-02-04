import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { RoutingMap } from './RoutingMap'

// Mock do react-leaflet
vi.mock('react-leaflet', () => ({
  useMap: () => ({
    removeLayer: vi.fn(),
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe.skip('RoutingMap', () => {
  it('should render routing between two points', () => {
    const pointA = { lat: -23.5505, lng: -46.6333 }
    const pointB = { lat: -22.9068, lng: -43.1729 }

    render(<RoutingMap pointA={pointA} pointB={pointB} />)

    // Verifica se o controle de rota foi criado com as opções corretas
    expect(L.Routing.control).toHaveBeenCalledWith(
      expect.objectContaining({
        waypoints: expect.arrayContaining([
          expect.objectContaining({ lat: pointA.lat, lng: pointA.lng }),
          expect.objectContaining({ lat: pointB.lat, lng: pointB.lng }),
        ]),
        show: false,
        collapsible: false,
        addWaypoints: false,
        routeWhileDragging: true,
        showAlternatives: true,
        fitSelectedRoutes: true,
        lineOptions: expect.objectContaining({
          extendToWaypoints: true,
          missingRouteTolerance: 100,
          styles: [
            expect.objectContaining({
              color: 'hsl(39 100% 50%)',
              opacity: 0.8,
              weight: 6,
            }),
          ],
        }),
        altLineOptions: expect.objectContaining({
          extendToWaypoints: true,
          missingRouteTolerance: 100,
          styles: [
            expect.objectContaining({
              color: 'hsl(0 0% 97.6%)',
              opacity: 0.4,
              weight: 4,
            }),
          ],
        }),
        createMarker: expect.any(Function),
      }),
    )

    // Verifica se o controle de rota foi adicionado ao mapa
    expect(mockRoutingControl.addTo).toHaveBeenCalled()

    // Verifica se o evento routesfound foi registrado
    expect(mockRoutingControl.on).toHaveBeenCalledWith(
      'routesfound',
      expect.any(Function),
    )
  })

  it('should cleanup when unmounting', () => {
    const pointA = { lat: -23.5505, lng: -46.6333 }
    const pointB = { lat: -22.9068, lng: -43.1729 }

    const { unmount } = render(<RoutingMap pointA={pointA} pointB={pointB} />)
    unmount()

    // Verifica se o controle foi removido
    expect(mockRoutingControl.remove).toHaveBeenCalled()
  })
})
