import { get } from '@/infra/http/apiKy'

export const getMatchesPLFootball = async () => {
  const response = await get(
    `${process.env.FOOTBALL_API_URL}/competitions/PL/matches?matchday=1`,
    {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    },
  )

  return response
}
