import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTeamsPLStore } from './useTeamsPLStore'
import { getListTeamsPLAction } from '../actions/getListTeamsPLAction'

vi.mock('../actions/getListTeamsPLAction')

const mockTeamsData = [
  {
    lat: 51.5549,
    lng: -0.108436,
    logo: 'https://crests.football-data.org/57.png',
    name: 'Arsenal',
    tla: 'ARS',
    id: 57,
    shortName: 'Arsenal',
    address: 'Highbury House, 75 Drayton Park London N5 1BU',
  },
  {
    lat: 51.481663,
    lng: -0.190956,
    logo: 'https://crests.football-data.org/61.png',
    name: 'Chelsea',
    tla: 'CHE',
    id: 61,
    shortName: 'Chelsea',
    address: 'Stamford Bridge, Fulham Road London SW6 1HS',
  },
]

describe('useTeamsPLStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
    expect(state.error).toBe(null)
  })

  it('should fetch teams successfully', async () => {
    vi.mocked(getListTeamsPLAction).mockResolvedValue(mockTeamsData)

    const { fetchTeams } = useTeamsPLStore.getState()
    await fetchTeams()

    const state = useTeamsPLStore.getState()
    expect(state.teams).toEqual(mockTeamsData)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(null)
  })

  it('should handle loading state during fetch', async () => {
    vi.mocked(getListTeamsPLAction).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockTeamsData), 100)),
    )

    const { fetchTeams } = useTeamsPLStore.getState()
    const fetchPromise = fetchTeams()

    const loadingState = useTeamsPLStore.getState()
    expect(loadingState.isLoading).toBe(true)

    await fetchPromise
    const finalState = useTeamsPLStore.getState()
    expect(finalState.isLoading).toBe(false)
  })

  it('should handle error when fetching teams fails', async () => {
    vi.mocked(getListTeamsPLAction).mockRejectedValue(new Error('API Error'))

    const { fetchTeams } = useTeamsPLStore.getState()
    await fetchTeams()

    const state = useTeamsPLStore.getState()
    expect(state.teams).toEqual([])
    expect(state.error).toBe('Falha ao carregar os times')
    expect(state.isLoading).toBe(false)
  })
})
