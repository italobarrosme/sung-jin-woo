'use client'

import { Match } from '@/modules/football/types'
import { Marker, Popup } from 'react-leaflet'

type MarkerGameProps = {
  match: Match
}

export const MarkerGame = ({ match }: MarkerGameProps) => {
  return (
    <Marker position={[match.latitude, match.longitude]}>
      <Popup>
        <div>
          <h3>
            {match.homeTeam} vs {match.awayTeam}
          </h3>
          <p>{match.date}</p>
          <p>{match.venue}</p>
        </div>
      </Popup>
    </Marker>
  )
}
