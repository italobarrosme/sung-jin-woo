import ky from 'ky'

interface Coordinates {
  lat: number
  lng: number
}

interface OpenCageResponse {
  results: {
    geometry: {
      lat: number
      lng: number
    }
  }[]
}

export async function getCoordinates(address: string): Promise<Coordinates> {
  try {
    const response: OpenCageResponse = await ky
      .get('https://api.opencagedata.com/geocode/v1/json', {
        searchParams: new URLSearchParams({
          key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY!, // Sua chave da API OpenCage
          q: address,
          limit: '1',
        }),
      })
      .json()

    if (response.results?.[0]) {
      return {
        lat: response.results[0].geometry.lat,
        lng: response.results[0].geometry.lng,
      }
    }

    throw new Error(`Coordinates not found for address: ${address}`)
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    throw error
  }
}
