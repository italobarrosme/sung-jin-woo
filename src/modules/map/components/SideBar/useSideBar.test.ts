import { describe, it, expect, beforeEach } from 'vitest'
import { useSideBar } from './useSideBar'

describe('useSideBar', () => {
  beforeEach(() => {
    useSideBar.setState({ isExpanded: false })
  })

  it('should initialize with default state', () => {
    expect(useSideBar.getState().isExpanded).toBe(false)
  })

  it('should toggle sidebar state', () => {
    useSideBar.getState().toggleSideBar()
    expect(useSideBar.getState().isExpanded).toBe(true)

    useSideBar.getState().toggleSideBar()
    expect(useSideBar.getState().isExpanded).toBe(false)
  })

  it('should open sidebar', () => {
    useSideBar.getState().openSideBar()
    expect(useSideBar.getState().isExpanded).toBe(true)
  })

  it('should close sidebar', () => {
    useSideBar.setState({ isExpanded: true })
    useSideBar.getState().closeSideBar()
    expect(useSideBar.getState().isExpanded).toBe(false)
  })
})
