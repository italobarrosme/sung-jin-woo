'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
import { MarkerTeam } from '../MarkerTeam/MarkerTeam'
import 'leaflet/dist/leaflet.css'
import { Team } from '@/types/types'
import { RoutingMap } from '../RoutingMap'

interface MapViewProps {
  teams?: Team[]
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

export const MapView = ({
  // games = [],
  teams = [],
  center,
  zoom,
  routingPoints,
}: MapViewProps) => {
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
      {/* {games.map((game) => (
        <MarkerGame key={game.id} game={game} />
      ))} */}
      {teams.map((team: Team) => (
        <MarkerTeam key={team.id} team={team} />
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
