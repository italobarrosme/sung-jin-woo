import { get } from '@/infra/http'
import { Match } from '../../types'

type TeamMatchesResponse = {
  matches: Match[]
  count: number
}

/**
 * Busca as próximas partidas de um time específico
 * @param teamId - ID do time na API Football Data
 * @returns Promise com as próximas partidas do time
 */
export const getTeamMatches = async (
  teamId: number,
): Promise<TeamMatchesResponse> => {
  const response = await get<TeamMatchesResponse>(
    `${process.env.FOOTBALL_API_URL}/teams/${teamId}/matches?status=SCHEDULED`,
    {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    },
  )

  return response
}
