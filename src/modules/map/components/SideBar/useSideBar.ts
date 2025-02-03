import { create } from 'zustand'

type SideBarStore = {
  isExpanded: boolean
  toggleSideBar: () => void
  openSideBar: () => void
  closeSideBar: () => void
}

export const useSideBar = create<SideBarStore>((set) => ({
  isExpanded: false,
  toggleSideBar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  openSideBar: () => set({ isExpanded: true }),
  closeSideBar: () => set({ isExpanded: false }),
}))
