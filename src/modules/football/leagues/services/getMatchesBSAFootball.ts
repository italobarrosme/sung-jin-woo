import { get } from '@/infra/http/apiKy'

export const getMatchesBRSerieAFootball = async () => {
  const response = await get(
    `${process.env.FOOTBALL_API_URL}/competitions/BSA/matches?matchday=1`,
    {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    },
  )

  return response
}
