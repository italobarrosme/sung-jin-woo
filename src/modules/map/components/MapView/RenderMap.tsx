'use client'
import dynamic from 'next/dynamic'

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
  return <MapView games={[]} />
}
