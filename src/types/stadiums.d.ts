interface StadiumCoordinates {
  teams: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

declare module '@/data/stadiumCoordinates.json' {
  const value: StadiumCoordinates[]
  export default value
}
