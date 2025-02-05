import { get } from '@/modules/infra/'
import { Team, TeamsResponse, GetTeamError } from '../types/types'

const BASE_PATH = 'teams'

export async function getTeamById(id: number): Promise<Team> {
  try {
    return await get(`${BASE_PATH}/${id}`, {
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
  limit = 20,
): Promise<TeamsResponse> {
  try {
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: ((page - 1) * limit).toString(),
    })

    return await get(BASE_PATH, {
      searchParams,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    })
  } catch (error) {
    throw {
      message: 'Erro ao listar times',
      code: error instanceof Error ? 500 : 400,
    } as GetTeamError
  }
}
