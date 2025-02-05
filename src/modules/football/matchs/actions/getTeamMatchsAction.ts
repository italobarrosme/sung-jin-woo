import { getTeamMatches } from '../services/getTeamMatches'

export async function getTeamMatchsAction(teamId: number) {
  try {
    const response = await getTeamMatches(teamId)
    return response
  } catch (error) {
    console.error('Error fetching team matches:', error)
    return []
  }
}
