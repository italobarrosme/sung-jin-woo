import { describe, it, expect, beforeEach, vi } from 'vitest'
import ky from 'ky'
import { getTeamById, getListTeams } from '../getTeams'
import { Team, TeamsResponse, GetTeamError } from '../../types/types'

vi.mock('ky')

describe('TeamsService', () => {
  const mockTeam: Team = {
    id: 1,
    name: 'Test Team',
    shortName: 'TEST',
    tla: 'TST',
    crest: 'test.png',
    address: 'Test Address',
    website: 'test.com',
    founded: 2000,
    clubColors: 'Red / Blue',
    venue: 'Test Stadium',
    lastUpdated: '2024-01-01',
  }

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe.skip('getTeamById', () => {
    it('deve retornar um time quando a requisição for bem sucedida', async () => {
      vi.mocked(ky.get).mockResolvedValueOnce({
        json: async () => mockTeam,
      } as Response)

      const result = await getTeamById(1)
      expect(result).toEqual(mockTeam)
    })

    it('deve lançar erro quando a requisição falhar', async () => {
      vi.mocked(ky.get).mockRejectedValueOnce(new Error('Erro ao buscar time'))

      await expect(getTeamById(1)).rejects.toThrowError('Erro ao buscar time')
    })
  })

  describe.skip('getListTeams', () => {
    const mockResponse: TeamsResponse = {
      count: 1,
      teams: [mockTeam],
    }

    it('deve retornar lista de times quando a requisição for bem sucedida', async () => {
      vi.mocked(ky.get).mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response)

      const result = await getListTeams()
      expect(result).toEqual(mockResponse)
    })

    it('deve lançar erro quando a requisição falhar', async () => {
      vi.mocked(ky.get).mockRejectedValueOnce(new Error('Erro ao listar times'))

      await expect(getListTeams()).rejects.toThrowError('Erro ao listar times')
    })
  })
})
