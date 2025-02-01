'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
// import { MarkerGame } from '../MarkerGame'
import { MarkerTeam } from '../MarkerTeam/MarkerTeam'
import 'leaflet/dist/leaflet.css'
import { Team } from '@/types/types'

interface Game {
  id: string
  lat: number
  lng: number
}

interface MapViewProps {
  games?: Game[]
  teams?: Team[]
  center: [number, number]
  zoom: number
}

export const MapView = ({
  // games = [],
  teams = [],
  center,
  zoom,
}: MapViewProps) => {
  const mapProps = {
    center,
    zoom,
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
    </MapContainer>
  )
}
