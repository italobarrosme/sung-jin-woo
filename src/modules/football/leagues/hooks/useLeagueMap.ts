'use client'

import { useTeamsPLStore } from '@/modules/football/leagues/store/useTeamsPLStore'
import { useSearchParams } from 'next/navigation'
import { useMemo, useEffect } from 'react'
import { leagueLocations, defaultLocation } from '../config/leagueLocations'

interface UseLeagueMapReturn {
  teams: any[]
  isLoading: boolean
  mapLocation: {
    center: [number, number]
    zoom: number
  }
}

export function useLeagueMap(): UseLeagueMapReturn {
  const searchParams = useSearchParams()
  const currentLeague = searchParams.get('league')

  const { teams, fetchTeams, isLoading } = useTeamsPLStore()

  const mapLocation = useMemo(() => {
    if (currentLeague && leagueLocations[currentLeague]) {
      return leagueLocations[currentLeague]
    }
    return defaultLocation
  }, [currentLeague])

  useEffect(() => {
    if (currentLeague === 'premier-league') {
      fetchTeams()
    }
  }, [currentLeague, fetchTeams])

  return {
    teams: currentLeague === 'premier-league' ? teams : [],
    isLoading,
    mapLocation,
  }
}
