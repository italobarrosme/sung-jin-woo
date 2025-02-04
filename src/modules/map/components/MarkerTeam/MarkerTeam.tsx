'use client'

import { Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Team } from '@/types/types'
import { useTeamDetailsStore } from '@/modules/leagues/store/useTeamDetailsStore'
import { useMap } from 'react-leaflet'
import { useSideBar } from '../SideBar/useSideBar'

type MarkerTeamProps = {
  team: Team
}

export const MarkerTeam = ({ team }: MarkerTeamProps) => {
  const setTeam = useTeamDetailsStore((state) => state.setTeam)
  const map = useMap()
  const { openSideBar } = useSideBar()

  const customIcon = new Icon({
    iconUrl: team.crest,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'rounded-full bg-white p-1 border-2 border-gray-200',
  })

  const handleClick = () => {
    setTeam(team)
    map.flyTo([team.lat, team.lng], 15, {
      animate: true,
      duration: 0.5,
    })
    openSideBar()
  }

  return (
    <Marker
      position={[team.lat, team.lng]}
      icon={customIcon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  )
}
