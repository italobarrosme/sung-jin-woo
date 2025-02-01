import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getListTeamsPLAction } from './getListTeamsPLAction'
import { getListTeamPLFootball } from '../services/getListTeamPLFootball'

vi.mock('../services/getListTeamPLFootball')

const mockTeamsData = {
  teams: [
    {
      id: 57,
      name: 'Arsenal',
      shortName: 'Arsenal',
      tla: 'ARS',
      crest: 'https://crests.football-data.org/57.png',
      venue: {
        coordinates: {
          latitude: 51.5549,
          longitude: -0.108436,
        },
        address: 'Highbury House, 75 Drayton Park London N5 1BU',
      },
    },
    {
      id: 61,
      name: 'Chelsea',
      shortName: 'Chelsea',
      tla: 'CHE',
      crest: 'https://crests.football-data.org/61.png',
      venue: {
        coordinates: {
          latitude: 51.481663,
          longitude: -0.190956,
        },
        address: 'Stamford Bridge, Fulham Road London SW6 1HS',
      },
    },
  ],
}

describe.skip('getListTeamsPLAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return formatted Premier League teams data with locations and details', async () => {
    vi.mocked(getListTeamPLFootball).mockResolvedValue(mockTeamsData)

    const result = await getListTeamsPLAction()

    expect(result.length).toBe(2)
    expect(result[0]).toEqual({
      lat: 51.5549,
      lng: -0.108436,
      logo: 'https://crests.football-data.org/57.png',
      name: 'Arsenal',
      tla: 'ARS',
      id: 57,
      shortName: 'Arsenal',
      address: 'Highbury House, 75 Drayton Park London N5 1BU',
    })
  })

  it('should return empty array when API call fails', async () => {
    vi.mocked(getListTeamPLFootball).mockRejectedValue(new Error('API Error'))

    const result = await getListTeamsPLAction()

    expect(result).toEqual([])
  })

  it('should call getListTeamPLFootball exactly once', async () => {
    vi.mocked(getListTeamPLFootball).mockResolvedValue(mockTeamsData)

    await getListTeamsPLAction()

    expect(getListTeamPLFootball).toHaveBeenCalledTimes(1)
  })
})
