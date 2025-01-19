'use client'

import { CENTER_MAP, ZOOM_MAP } from '@/constants/constants'
import { Game } from '@/types/types'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MarkerGame } from '../MarkerGame'
import 'leaflet/dist/leaflet.css'

type MapViewProps = {
  games: Game[]
}

export const MapView = ({ games }: MapViewProps) => {
  const mapProps = {
    center: CENTER_MAP,
    zoom: ZOOM_MAP,
    style: { height: '100vh', width: '100%', zIndex: 0 },
  }

  return (
    <MapContainer {...mapProps}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/italobarros1/cl0nw20po002r14neu9kepgod/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      />
      {games.map((game) => (
        <MarkerGame key={game.id} game={game} />
      ))}
    </MapContainer>
  )
}
