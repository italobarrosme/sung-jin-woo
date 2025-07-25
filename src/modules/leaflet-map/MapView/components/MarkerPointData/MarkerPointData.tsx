'use client'

import { Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useMap } from 'react-leaflet'
import { useSideBarDetailDataStore } from '../SideBarDetailData'
import { useTeamDetailsStore } from '@/modules/football/leagues/store/useTeamDetailsStore'
import { Team } from '@/modules/football/types'

type MarkerPointDataProps<T> = {
  data: T
}

export const MarkerPointData = <
  T extends { lat: number; lng: number; logo: string },
>({
  data,
}: MarkerPointDataProps<T>) => {
  const { setTeam } = useTeamDetailsStore()

  const map = useMap()
  const { openSideBar } = useSideBarDetailDataStore()

  const customIcon = new Icon({
    iconUrl: data.logo,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'rounded-full bg-white p-1 border-2 border-gray-200',
  })

  const handleClick = () => {
    setTeam(data as unknown as Team)
    map.flyTo([data.lat, data.lng], 15, {
      animate: true,
      duration: 0.5,
    })
    openSideBar()
  }

  return (
    <Marker
      position={[data.lat, data.lng]}
      icon={customIcon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  )
}
