import { SideBar } from '@/components/SideBar'
import { MENU_ITEMS } from '@/constants/constants'
import { MapView } from '@/modules/map/components/MapView'

export default function Home() {
  return (
    <>
      <SideBar items={MENU_ITEMS} />
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-black p-4 text-neutral-white">
        <MapView games={[]} />
      </div>
    </>
  )
}
