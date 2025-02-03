import { Team } from '@/types/types'

export const mockTeam: Team = {
  id: 1,
  name: 'Mock Team',
  tla: 'MCK',
  crest: 'https://mock-crest.png',
  address: 'Mock Address',
  website: 'https://mockteam.com',
  founded: 1900,
  clubColors: 'Red / Blue',
  venue: 'Mock Stadium',
  lat: -23.5505,
  lng: -46.6333,
  shortName: 'Mock Team',
  runningCompetitions: [],
  coach: {
    id: 1,
    name: 'Mock Coach',
    nationality: 'Brazilian',
    contract: {
      start: '2020-01-01',
      until: '2024-01-01',
    },
    firstName: 'Mock',
    lastName: 'Coach',
    dateOfBirth: '1980-01-01',
  },
  squad: [],
  staff: [],
  lastUpdated: '2021-01-01',
}
