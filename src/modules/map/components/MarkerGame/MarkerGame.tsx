'use client'

import { Game } from '@/types/types'
import { Marker, Popup } from 'react-leaflet'

type MarkerGameProps = {
  game: Game
}

export const MarkerGame = ({ game }: MarkerGameProps) => {
  return (
    <Marker position={[game.latitude, game.longitude]}>
      <Popup>
        <div>
          <h3>
            {game.homeTeam} vs {game.awayTeam}
          </h3>
          <p>{game.date}</p>
          <p>{game.venue}</p>
        </div>
      </Popup>
    </Marker>
  )
}
