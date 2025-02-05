'use server'

import { getTeamById, getListTeams } from '../services/getTeams'
import { Team, TeamsResponse, GetTeamError } from '../types/types'

export async function teamAction(
  id?: number,
  page?: number,
): Promise<{
  team?: Team
  teams?: TeamsResponse
  error?: GetTeamError
}> {
  try {
    if (id) {
      const team = await getTeamById(id)
      return { team }
    }

    const teams = await getListTeams(page)
    return { teams }
  } catch (error) {
    return {
      error: error as GetTeamError,
    }
  }
}
