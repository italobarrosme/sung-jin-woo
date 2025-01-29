import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getListTeamPLFootball } from '../getListTeamPLFootball'
import { get } from '@/modules/infra'

vi.mock('@/modules/infra', () => ({
  get: vi.fn(),
}))

describe('getListTeamPLFootball', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve chamar a API com os parâmetros corretos', async () => {
    const mockResponse = { data: 'some data' }
    vi.mocked(get).mockResolvedValueOnce(mockResponse)

    const result = await getListTeamPLFootball()

    expect(get).toHaveBeenCalledWith(
      `${process.env.FOOTBALL_API_URL}/competitions/PL/teams`,
      {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_API_KEY,
        },
      },
    )
    expect(result).toEqual(mockResponse)
  })

  it('deve propagar erro quando a API falhar', async () => {
    const mockError = new Error('API Error')
    vi.mocked(get).mockRejectedValueOnce(mockError)

    await expect(getListTeamPLFootball()).rejects.toThrow('API Error')
  })
})
