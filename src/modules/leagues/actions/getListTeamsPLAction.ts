'use server'

import { Team } from '@/types/types'
import { getListTeamPLFootball } from '../services/getListTeamPLFootball'
import stadiumCoordinates from '@/data/stadiumCoordinates.json'

export async function getListTeamsPLAction(): Promise<Team[]> {
  try {
    const response = await getListTeamPLFootball()

    return response.teams.map((team: Team) => {
      const stadium = stadiumCoordinates.find((s) => s.teams === team.name)

      return {
        lat: stadium?.coordinates?.lat ?? 51.5074,
        lng: stadium?.coordinates?.lng ?? -0.1278,
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        tla: team.tla,
        crest: team.crest,
        address: team.venue,
        website: team.website,
        founded: team.founded,
        clubColors: team.clubColors,
        venue: team.venue,
        runningCompetitions: team.runningCompetitions,
        coach: team.coach,
        squad: team.squad,
        staff: team.staff,
        lastUpdated: team.lastUpdated,
      }
    })
  } catch (error) {
    console.error('Error fetching Premier League teams:', error)
    return []
  }
}
