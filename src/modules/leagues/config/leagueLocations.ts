export interface LeagueLocation {
  center: [number, number]
  zoom: number
  name: string
}

export const leagueLocations: Record<string, LeagueLocation> = {
  'premier-league': {
    center: [54.5, -2],
    zoom: 6,
    name: 'Premier League',
  },
  'la-liga': {
    center: [40.4637, -3.7492],
    zoom: 6,
    name: 'La Liga',
  },
  'serie-a': {
    center: [42.8333, 12.8333],
    zoom: 6,
    name: 'Serie A',
  },
  bundesliga: {
    center: [51.1657, 10.4515],
    zoom: 6,
    name: 'Bundesliga',
  },
  'ligue-1': {
    center: [46.6034, 1.8883],
    zoom: 6,
    name: 'Ligue 1',
  },
}

export const defaultLocation: LeagueLocation = {
  center: [48.8566, 2.3522],
  zoom: 4,
  name: 'Europe',
}
