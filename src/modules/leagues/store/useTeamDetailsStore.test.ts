import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTeamDetailsStore } from './useTeamDetailsStore'
import { mockTeam } from '@/mocks/team'

describe.skip('useTeamDetailsStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useTeamDetailsStore())
    result.current.clearTeam()
  })

  it('should start with null team', () => {
    const { result } = renderHook(() => useTeamDetailsStore())
    expect(result.current.team).toBe(null)
  })

  it('should set team', () => {
    const { result } = renderHook(() => useTeamDetailsStore())

    result.current.setTeam(mockTeam)

    expect(result.current.team).toBe(mockTeam)
  })

  it('should clear team', () => {
    const { result } = renderHook(() => useTeamDetailsStore())

    result.current.setTeam(mockTeam)
    result.current.clearTeam()

    expect(result.current.team).toBe(null)
  })
})
