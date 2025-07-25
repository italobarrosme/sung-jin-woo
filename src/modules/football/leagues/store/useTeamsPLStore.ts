import { create } from 'zustand'
import { getListTeamsPLAction } from '../actions/getListTeamsPLAction'
import { Team } from '@/modules/football/types'

interface TeamsPLStore {
  teams: Team[]
  isLoading: boolean
  error: string | null
  fetchTeams: () => Promise<void>
}

export const useTeamsPLStore = create<TeamsPLStore>((set) => ({
  teams: [],
  isLoading: false,
  error: null,
  fetchTeams: async () => {
    try {
      set({ isLoading: true, error: null })
      const teams = await getListTeamsPLAction()

      set({ teams, isLoading: false })
    } catch (error) {
      console.error('Erro ao carregar times:', error)
      set({ error: 'Falha ao carregar os times', isLoading: false })
    }
  },
}))
