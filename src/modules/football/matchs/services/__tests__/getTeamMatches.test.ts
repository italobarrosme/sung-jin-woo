import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTeamMatches } from '../getTeamMatches'
import { get } from '@/modules/infra'

vi.mock('@/modules/infra', () => ({
  get: vi.fn(),
}))

describe('getTeamMatches', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar as próximas partidas de um time corretamente', async () => {
    const mockResponse = {
      matches: [
        {
          id: 1,
          homeTeam: { id: 61, name: 'Chelsea FC' },
          awayTeam: { id: 62, name: 'Manchester United' },
          status: 'SCHEDULED',
          utcDate: '2024-03-20T20:00:00Z',
        },
      ],
      count: 1,
    }

    vi.mocked(get).mockResolvedValueOnce(mockResponse)

    const teamId = 61
    const result = await getTeamMatches(teamId)

    expect(get).toHaveBeenCalledWith(
      `${process.env.FOOTBALL_API_URL}/teams/${teamId}/matches?status=SCHEDULED`,
      {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_API_KEY,
        },
      },
    )

    expect(result).toEqual(mockResponse)
  })

  it('deve propagar erro em caso de falha na API', async () => {
    const error = new Error('API Error')
    vi.mocked(get).mockRejectedValueOnce(error)

    const teamId = 61
    await expect(getTeamMatches(teamId)).rejects.toThrow('API Error')
  })
})
