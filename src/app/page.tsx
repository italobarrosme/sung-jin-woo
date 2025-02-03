import { RenderMap } from '@/modules/map/components/MapView/RenderMap'
import { Suspense } from 'react'
import { SideBar } from '@/modules/map/components/SideBar'
import { TeamDetails } from '@/modules/leagues/components/TeamDetails'

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-black text-neutral-white overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex h-full w-full">
            <RenderMap />
            <SideBar>
              <TeamDetails />
            </SideBar>
          </div>
        </Suspense>
      </div>
    </>
  )
}
