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
  lastUpdated: string
}

export type TeamsResponse = {
  count: number
  teams: Team[]
}

export type GetTeamError = {
  message: string
  code: number
}
