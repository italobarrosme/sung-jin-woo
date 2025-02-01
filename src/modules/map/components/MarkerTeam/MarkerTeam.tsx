'use client'

import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import Image from 'next/image'
import { Team } from '@/types/types'

type MarkerTeamProps = {
  team: Team
}

export const MarkerTeam = ({ team }: MarkerTeamProps) => {
  const customIcon = new Icon({
    iconUrl: team.crest,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'rounded-full bg-white p-1 border-2 border-gray-200',
  })

  return (
    <Marker position={[team.lat, team.lng]} icon={customIcon}>
      <Popup>
        <div className="flex flex-col items-center gap-2 p-2">
          <Image
            src={team.crest}
            alt={`${team.name} logo`}
            width={50}
            height={50}
            className="rounded-full"
            data-testid="team-logo"
          />
          <h3 className="text-lg font-bold" data-testid="team-name">
            {team.name}
          </h3>
          <p className="text-sm text-gray-600" data-testid="team-address">
            {team.address}
          </p>
          <p className="text-sm text-gray-600" data-testid="team-website">
            {team.website}
          </p>
          <p className="text-sm text-gray-600">{team.founded}</p>
          <p className="text-sm text-gray-600">{team.clubColors}</p>
          <p className="text-sm text-gray-600">{team.venue}</p>
          <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            {team.tla}
          </span>
        </div>
      </Popup>
    </Marker>
  )
}
