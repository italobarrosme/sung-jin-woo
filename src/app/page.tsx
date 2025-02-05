import { RenderMap } from '@/modules/map/components/MapView/RenderMap'
import { Suspense } from 'react'
import { SideBar } from '@/modules/map/components/SideBar'
import { TeamDetails } from '@/modules/football/leagues/components/TeamDetails'
import { SearchTeamForm } from '@/modules/football/team/SearchTeam'

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-neutral-black text-neutral-white">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex size-full">
            <RenderMap />
            <SearchTeamForm />
            <SideBar>
              <TeamDetails />
            </SideBar>
          </div>
        </Suspense>
      </div>
    </>
  )
}
