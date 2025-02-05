'use server'

import { getTeamById, getListTeams } from '../team/services/getTeams'
import { Team, TeamsResponse, GetTeamError } from '../team/types/types'

export async function getTeamAction(
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
