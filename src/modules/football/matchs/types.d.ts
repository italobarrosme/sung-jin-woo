type MatchTeamResponse = {
  filters: Filters
  resultSet: ResultSet
  matches: Match[]
}

type Filters = {
  competitions: string
  permission: string
  limit: number
}

type ResultSet = {
  count: number
  competitions: string
  first: string
  last: string
  played: number
  wins: number
  draws: number
  losses: number
}

type Match = {
  area: Area
  competition: Competition
  season: Season
  id: number
  utcDate: string
  status: string
  minute: number | null
  injuryTime: number | null
  attendance: number | null
  venue: string
  matchday: number
  stage: string
  group: string
  lastUpdated: string
  homeTeam: Team
  awayTeam: Team
  score: Score
  goals: any[]
  penalties: any[]
  bookings: any[]
  substitutions: any[]
  odds: Odds
  referees: any[]
}

type Area = {
  id: number
  name: string
  code: string
  flag: string | null
}

type Competition = {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

type Season = {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: string | null // ou outro tipo, caso necessário
  stages: string[]
}

type Team = {
  id: number | null
  name: string | null
  shortName: string | null
  tla: string | null
  crest: string | null
  coach: Coach
  leagueRank: number | null
  formation: string | null
  lineup: any[] // Defina um tipo mais específico, se necessário
  bench: any[]
}

type Coach = {
  id: number | null
  name: string | null
  nationality: string | null
}

type Score = {
  winner: string | null // ou number, dependendo da sua implementação
  duration: string
  fullTime: ScoreTime
  halfTime: ScoreTime
}

type ScoreTime = {
  home: number | null
  away: number | null
}

type Odds = {
  homeWin: number | null
  draw: number | null
  awayWin: number | null
}
