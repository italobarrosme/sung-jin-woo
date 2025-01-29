import { get } from '@/modules/infra'

export const getListTeamPLFootball = async () => {
  const response: any = await get(
    `${process.env.FOOTBALL_API_URL}/competitions/PL/teams`,
    {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    },
  )

  return response
}
