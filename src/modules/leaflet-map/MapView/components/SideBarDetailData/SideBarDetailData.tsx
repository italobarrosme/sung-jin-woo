'use client'

import { ReactNode, useState } from 'react'
import { MenuItems, MenuOption } from './MenuItems'
import { cn } from '@/utils/cn'
import { Button } from '../../../../../components/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSideBarDetailDataStore } from './useSideBarDetailDataStore'

type SideBarProps = {
  items?: MenuOption[]
  isExpandedFlag?: boolean
  children?: ReactNode
}

export const SideBarDetailData = ({ items, children }: SideBarProps) => {
  const { isExpanded, toggleSideBar } = useSideBarDetailDataStore()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleSideBar()
    }
  }

  return (
    <aside
      className={cn(
        'h-screen bg-neutral-dark p-4 z-50 text-white shadow-2xl transition-all duration-300 ease-in-out animate-fade-in cursor-pointer relative',
        {
          'w-1/2': isExpanded,
          'w-16': !isExpanded,
        },
      )}
      onClick={handleOverlayClick}
    >
      <Button
        type="button"
        variant="small-ghost"
        className={cn('absolute top-5 right-5 size-6', {
          'opacity-0': !isExpanded,
        })}
        onClick={toggleSideBar}
      >
        <Icon icon="mdi:close" width={24} height={24} />
      </Button>
      {isExpanded ? (
        <nav className="flex h-[calc(100vh-1rem)] animate-fade-in flex-col gap-4">
          {children}
          {items && (
            <MenuItems
              items={items}
              isExpanded={isExpanded}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
            />
          )}
        </nav>
      ) : (
        <nav
          onClick={handleOverlayClick}
          className="flex h-full animate-fade-in flex-col items-start justify-center"
        >
          <span className="h-8 w-1 rounded-lg bg-complementary-highlight"></span>
        </nav>
      )}
    </aside>
  )
}
