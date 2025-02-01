import { RenderMap } from '@/modules/map/components/MapView/RenderMap'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-black p-4 text-neutral-white">
        <Suspense fallback={<div>Loading...</div>}>
          <RenderMap />
        </Suspense>
      </div>
    </>
  )
}
