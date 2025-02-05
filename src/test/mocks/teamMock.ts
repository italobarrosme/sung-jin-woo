import { Team } from '@/modules/football/types'

export const mockTeam: Team = {
  lat: 51.5550403,
  lng: -0.1083997,
  crest: 'https://crests.football-data.org/57.png',
  name: 'Arsenal FC',
  tla: 'ARS',
  id: 57,
  shortName: 'Arsenal',
  address: 'Emirates Stadium',
  venue: 'Emirates Stadium',
  website: 'http://www.arsenal.com',
  founded: 1886,
  clubColors: 'Red / White',
  runningCompetitions: [],
  coach: {
    id: 1,
    firstName: 'Arsène',
    lastName: 'Wenger',
    name: 'Arsène Wenger',
    dateOfBirth: '1949-10-22',
    nationality: 'French',
    contract: {
      start: '2024-01-01',
      until: '2024-12-31',
    },
  },
  squad: [],
  staff: [],
  lastUpdated: '',
}
