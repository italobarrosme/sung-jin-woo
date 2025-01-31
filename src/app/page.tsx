import { SideBar } from '@/components/SideBar'
import { SearchTeamForm } from '@/modules/game/form/SearchTeam'
import { RenderMap } from '@/modules/map/components/MapView/RenderMap'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <>
      <SideBar>
        <SearchTeamForm />
      </SideBar>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-black p-4 text-neutral-white">
        <Suspense fallback={<div>Loading...</div>}>
          <RenderMap />
        </Suspense>
      </div>
    </>
  )
}
