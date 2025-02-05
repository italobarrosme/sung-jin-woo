import { get } from '@/modules/infra/'
import { Team, TeamsResponse, GetTeamError } from '../types/types'

export async function getTeamById(id: number): Promise<Team> {
  try {
    return await get(`teams/${id}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    })
  } catch (error) {
    throw {
      message: 'Erro ao buscar time',

      code: error instanceof Error ? 500 : 400,
    } as GetTeamError
  }
}

export async function getListTeams(
  page = 1,
  limit = 40,
): Promise<TeamsResponse> {
  try {
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: ((page - 1) * limit).toString(),
    })

    return await get(`${process.env.FOOTBALL_API_URL}/teams`, {
      searchParams,
      cache: 'force-cache',
      next: { revalidate: 3600 },
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    })
  } catch (error) {
    throw {
      message: 'Erro ao listar times',
      code: error instanceof Error ? 500 : 400,
    } as GetTeamError
  }
}
