import { create } from 'zustand'

type SideBarDetailDataStore = {
  isExpanded: boolean
  toggleSideBar: () => void
  openSideBar: () => void
  closeSideBar: () => void
}

export const useSideBarDetailDataStore = create<SideBarDetailDataStore>(
  (set) => ({
    isExpanded: false,
    toggleSideBar: () => set((state) => ({ isExpanded: !state.isExpanded })),
    openSideBar: () => set({ isExpanded: true }),
    closeSideBar: () => set({ isExpanded: false }),
  }),
)
