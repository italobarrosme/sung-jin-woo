'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
import { MarkerPointData } from './components/MarkerPointData'
import 'leaflet/dist/leaflet.css'
import { RoutingMap } from './components/RoutingMap'

interface MapViewProps<T> {
  data: T[]
  center: [number, number]
  zoom: number
  routingPoints?: {
    pointA: {
      lat: number
      lng: number
    }
    pointB: {
      lat: number
      lng: number
    }
  }
}

export const MapView = <
  T extends { id: number; lat: number; lng: number; logo: string },
>({
  data = [],
  center,
  zoom,
  routingPoints,
}: MapViewProps<T>) => {
  const mapProps = {
    center,
    zoom,
    maxZoom: 15,
    minZoom: 4,
    zoomControl: false,
    fadeAnimation: true,
    style: { height: '100vh', width: '100%', zIndex: 0 },
  }

  return (
    <MapContainer {...mapProps}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/italobarros1/cl0nw20po002r14neu9kepgod/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      />
      {data.map((item: T) => (
        <MarkerPointData key={item.id} data={item} />
      ))}
      {routingPoints?.pointA && routingPoints?.pointB && (
        <RoutingMap
          pointA={routingPoints.pointA}
          pointB={routingPoints.pointB}
        />
      )}
    </MapContainer>
  )
}
