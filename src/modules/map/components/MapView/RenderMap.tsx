'use client'

import dynamic from 'next/dynamic'
import { useLeagueMap } from '../../../leagues/hooks/useLeagueMap'

const MapView = dynamic(
  () =>
    import('@/modules/map/components/MapView/MapView').then(
      (mod) => mod.MapView,
    ),
  {
    ssr: false,
  },
)

export const RenderMap = () => {
  const { teams, isLoading, mapLocation } = useLeagueMap()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Carregando ligas, carregando times...
      </div>
    )
  }

  return (
    <MapView
      teams={teams}
      center={mapLocation.center}
      zoom={mapLocation.zoom}
    />
  )
}
