import { get } from '@/modules/infra'

export const getListTeamBSAFootball = async () => {
  const response = await get(
    `${process.env.FOOTBALL_API_URL}/competitions/BSA/teams`,
    {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    },
  )

  return response
}
