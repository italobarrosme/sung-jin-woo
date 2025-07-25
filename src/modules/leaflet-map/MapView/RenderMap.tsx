'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLeagueMap } from '../../football/leagues/hooks/useLeagueMap'

const MapView = dynamic(
  () =>
    import('@/modules/leaflet-map/MapView/MapView').then((mod) => mod.MapView),
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
    <Suspense fallback={<div>Loading Map...</div>}>
      <MapView
        data={teams}
        center={mapLocation.center}
        zoom={mapLocation.zoom}
      />
    </Suspense>
  )
}
