export type Game = {
  id: string
  latitude: number
  longitude: number
  homeTeam: string
  awayTeam: string
  date: string
  venue: string
}

export type Coach = {
  id: number
  firstName: string
  lastName: string
  name: string
  dateOfBirth: string
  nationality: string
  contract: {
    start: string
    until: string
  }
}

export type Player = {
  id: number
  name: string
  position: string
  dateOfBirth: string | null
  nationality: string
}

export type Competition = {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

export type Team = {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors: string
  venue: string
  runningCompetitions: Competition[]
  coach: Coach
  squad: Player[]
  staff: any[] // Empty staff array, can be expanded later
  lastUpdated: string
  lat: number
  lng: number
}
