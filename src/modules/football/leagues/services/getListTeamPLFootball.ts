import { get } from '@/modules/infra'
import { Team } from '../../types'

type ListTeamPLFootballResponse = {
  teams: Team[]
}

export const getListTeamPLFootball = async () => {
  const response = await get<ListTeamPLFootballResponse>(
    `${process.env.FOOTBALL_API_URL}/competitions/PL/teams`,
    {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    },
  )

  return response
}
