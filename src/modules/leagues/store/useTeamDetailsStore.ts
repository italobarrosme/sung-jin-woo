import { Team } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TeamDetailsStore = {
  team: Team | null
  setTeam: (team: Team) => void
  clearTeam: () => void
}

export const useTeamDetailsStore = create<TeamDetailsStore>()(
  persist(
    (set) => ({
      team: null,
      setTeam: (team) => set({ team }),
      clearTeam: () => set({ team: null }),
    }),
    {
      name: 'team-details',
    },
  ),
)
