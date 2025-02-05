import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTeamsPLStore } from '../useTeamsPLStore'
import { getListTeamsPLAction } from '../../actions/getListTeamsPLAction'
import type { Team } from '@/modules/football/types'

// Mock do módulo da action
vi.mock('../../actions/getListTeamsPLAction')

const mockTeamsData: Team[] = [
  {
    lat: 51.5549,
    lng: -0.108436,
    crest: 'https://crests.football-data.org/57.png',
    name: 'Arsenal',
    tla: 'ARS',
    id: 57,
    shortName: 'Arsenal',
    address: 'Highbury House, 75 Drayton Park London N5 1BU',
    website: 'https://www.arsenal.com',
    founded: 1886,
    clubColors: 'Red / White',
    venue: 'Emirates Stadium',
    runningCompetitions: [],
    coach: {
      id: 1,
      name: 'Mikel Arteta',
      firstName: 'Mikel',
      lastName: 'Arteta',
      dateOfBirth: '1982-03-26',
      nationality: 'Spanish',
      contract: {
        start: '2024-01-01',
        until: '2024-01-01',
      },
    },
    staff: [],
    squad: [],
    lastUpdated: '2024-01-01T00:00:00Z',
  },
  {
    lat: 51.481663,
    lng: -0.190956,
    crest: 'https://crests.football-data.org/61.png',
    name: 'Chelsea',
    tla: 'CHE',
    id: 61,
    shortName: 'Chelsea',
    address: 'Stamford Bridge, Fulham Road London SW6 1HS',
    website: 'https://www.chelsea.com',
    founded: 1905,
    clubColors: 'Blue / White',
    venue: 'Stamford Bridge',
    runningCompetitions: [],
    staff: [],
    coach: {
      id: 2,
      name: 'Graham Potter',
      firstName: 'Graham',
      lastName: 'Potter',
      dateOfBirth: '1975-01-01',
      nationality: 'English',
      contract: {
        start: '2024-01-01',
        until: '2024-01-01',
      },
    },
    squad: [],
    lastUpdated: '2024-01-01T00:00:00Z',
  },
]

describe('useTeamsPLStore', () => {
  // Reinicia o estado da store antes de cada teste.
  beforeEach(() => {
    vi.clearAllMocks()
    // Se a store for baseada em Zustand, pode-se reiniciar seu estado manualmente:
    useTeamsPLStore.setState({
      teams: [],
      isLoading: false,
      error: null,
    })
  })

  it('should initialize with default values', () => {
    const state = useTeamsPLStore.getState()

    expect(state.teams).toEqual([])
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should fetch teams successfully', async () => {
    // Simula a resolução da promise com os dados mockados
    vi.mocked(getListTeamsPLAction).mockResolvedValueOnce(mockTeamsData)

    const { fetchTeams } = useTeamsPLStore.getState()
    await fetchTeams()

    const state = useTeamsPLStore.getState()
    expect(state.teams).toEqual(mockTeamsData)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should handle loading state during fetch', async () => {
    // Cria uma promise que resolve após 100ms
    const mockPromise = new Promise<Team[]>((resolve) => {
      setTimeout(() => resolve(mockTeamsData), 100)
    })

    vi.mocked(getListTeamsPLAction).mockImplementationOnce(() => mockPromise)

    const { fetchTeams } = useTeamsPLStore.getState()
    const promise = fetchTeams()

    // Logo após a chamada, o estado de carregamento deve ser true
    expect(useTeamsPLStore.getState().isLoading).toBe(true)

    await promise

    const finalState = useTeamsPLStore.getState()
    expect(finalState.teams).toEqual(mockTeamsData)
    expect(finalState.isLoading).toBe(false)
    expect(finalState.error).toBeNull()
  })

  it('should handle error when fetching teams fails', async () => {
    const error = new Error('API Error')
    vi.mocked(getListTeamsPLAction).mockRejectedValueOnce(error)

    const { fetchTeams } = useTeamsPLStore.getState()
    await fetchTeams()

    const state = useTeamsPLStore.getState()
    // Caso a store defina a mensagem de erro como string personalizada, verifique-a.
    expect(state.teams).toEqual([])
    expect(state.error).toBe('Falha ao carregar os times')
    expect(state.isLoading).toBe(false)
  })
})
