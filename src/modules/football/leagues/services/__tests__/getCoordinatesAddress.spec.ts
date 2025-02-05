import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCoordinates } from '../getCoordinatesAddress'
import ky from 'ky'

vi.mock('ky')

describe('getCoordinates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockAddress = 'Emirates Stadium, London'

  it('should return coordinates for valid address', async () => {
    const mockResponse = {
      results: [
        {
          geometry: {
            lat: 51.5550403,
            lng: -0.1083997,
          },
        },
      ],
    }

    vi.mocked(ky.get).mockReturnValue({
      json: () => Promise.resolve(mockResponse),
    } as any)

    const result = await getCoordinates(mockAddress)

    expect(result).toEqual({
      lat: 51.5550403,
      lng: -0.1083997,
    })

    expect(ky.get).toHaveBeenCalledWith(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        searchParams: expect.any(URLSearchParams),
      },
    )
  })

  it('should throw error when no coordinates found', async () => {
    const mockResponse = {
      results: [],
    }

    vi.mocked(ky.get).mockReturnValue({
      json: () => Promise.resolve(mockResponse),
    } as any)

    await expect(getCoordinates(mockAddress)).rejects.toThrow(
      `Coordinates not found for address: ${mockAddress}`,
    )
  })
})
