import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { type ReactNode } from 'react'

// Mock do Leaflet
vi.mock('leaflet', () => ({
  Icon: vi.fn().mockImplementation(() => ({
    options: {
      iconUrl: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: 'rounded-full bg-white p-1 border-2 border-gray-200',
    },
  })),
}))

// Mock do next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="team-logo" />
  ),
}))

// Mock dos componentes do react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  Marker: ({
    children,
    position,
  }: {
    children: ReactNode
    position: [number, number]
  }) => (
    <div data-testid="marker" data-lat={position[0]} data-lng={position[1]}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
  TileLayer: ({ url }: { url: string }) => (
    <div data-testid="tile-layer" data-url={url} />
  ),
}))
