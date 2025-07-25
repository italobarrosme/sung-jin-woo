import { RenderMap } from '@/modules/leaflet-map/MapView/RenderMap'
import { Suspense } from 'react'
import { SideBarDetailData } from '@/modules/leaflet-map/MapView/components/SideBarDetailData'
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
            <SideBarDetailData>
              <TeamDetails />
            </SideBarDetailData>
          </div>
        </Suspense>
      </div>
    </>
  )
}
