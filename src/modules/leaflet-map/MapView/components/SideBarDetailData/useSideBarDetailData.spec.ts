import { describe, it, expect, beforeEach } from 'vitest'
import { useSideBarDetailDataStore } from './useSideBarDetailDataStore'

describe('useSideBar', () => {
  beforeEach(() => {
    useSideBarDetailDataStore.setState({ isExpanded: false })
  })

  it('should initialize with default state', () => {
    expect(useSideBarDetailDataStore.getState().isExpanded).toBe(false)
  })

  it('should toggle sidebar state', () => {
    useSideBarDetailDataStore.getState().toggleSideBar()
    expect(useSideBarDetailDataStore.getState().isExpanded).toBe(true)

    useSideBarDetailDataStore.getState().toggleSideBar()
    expect(useSideBarDetailDataStore.getState().isExpanded).toBe(false)
  })

  it('should open sidebar', () => {
    useSideBarDetailDataStore.getState().openSideBar()
    expect(useSideBarDetailDataStore.getState().isExpanded).toBe(true)
  })

  it('should close sidebar', () => {
    useSideBarDetailDataStore.setState({ isExpanded: true })
    useSideBarDetailDataStore.getState().closeSideBar()
    expect(useSideBarDetailDataStore.getState().isExpanded).toBe(false)
  })
})
