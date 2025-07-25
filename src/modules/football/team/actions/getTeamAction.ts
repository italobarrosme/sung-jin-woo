'use server'

import { getTeamById, getListTeams } from '../services/getTeams'
import { Team, TeamsResponse, GetTeamError } from '../types/types'

const RETRY_DELAY = 4000 // 4 segundos
const MAX_RETRIES = 3

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchWithRetry = async <T>(
  fetchFn: () => Promise<T>,
  retries = MAX_RETRIES,
): Promise<T> => {
  try {
    return await fetchFn()
  } catch (error) {
    if (retries > 0 && (error as any)?.response?.status === 429) {
      await delay(RETRY_DELAY)
      return fetchWithRetry(fetchFn, retries - 1)
    }
    throw error
  }
}

export type TeamActionResponse = {
  team?: Team
  teams?: TeamsResponse
  error?: GetTeamError
  isLoading: boolean
}

export async function getTeamAction(
  teamName: string,
  page: number = 1,
  id?: number,
): Promise<TeamActionResponse> {
  try {
    if (id) {
      const team = await fetchWithRetry(() => getTeamById(id))
      return { team, isLoading: false }
    }

    if (teamName) {
      let currentPage = page
      let teams = await fetchWithRetry(() => getListTeams(currentPage))
      let filteredTeams: Team[] = []

      while (teams.teams.length > 0) {
        filteredTeams = await getFilteredTeams(teamName, teams)

        if (filteredTeams.length > 0) {
          return {
            teams: {
              count: filteredTeams.length,
              teams: filteredTeams,
            },
            isLoading: false,
          }
        }

        currentPage += 1

        teams = await fetchWithRetry(() => getListTeams(currentPage))

        await delay(1000)
      }

      throw new Error('Nenhum time encontrado')
    }

    const teams = await fetchWithRetry(() => getListTeams(page))
    return { teams, isLoading: false }
  } catch (error) {
    return {
      error: error as GetTeamError,
      isLoading: false,
    }
  }
}

const getFilteredTeams = async (teamName: string, teams: TeamsResponse) => {
  const filteredTeams = teams.teams.filter((team) =>
    team.name.toLowerCase().includes(teamName.toLowerCase()),
  )
  return filteredTeams
}
