'use client'

import { ReactNode, useState } from 'react'
import { MenuItems, MenuOption } from './MenuItems'
import { cn } from '@/utils/cn'

type SideBarProps = {
  items: MenuOption[]
  isExpandedFlag?: boolean
  children?: ReactNode
}

export const SideBar = ({ items, isExpandedFlag, children }: SideBarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(isExpandedFlag || false)

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 h-screen bg-neutral-dark p-4 text-white z-30 shadow-lg transition-all duration-300 ease-in-out animate-fade-in cursor-pointer',
        {
          'w-64': isExpanded,
          'w-16': !isExpanded,
        },
      )}
      onClick={handleOverlayClick}
    >
      {isExpanded ? (
        <nav className="flex animate-fade-in flex-col gap-4">
          {children}
          <MenuItems
            items={items}
            isExpanded={isExpanded}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
          />
        </nav>
      ) : (
        <aside
          onClick={handleOverlayClick}
          className="flex h-screen animate-fade-in flex-col items-center justify-center "
        >
          <span className="h-8 w-1 rounded-lg bg-complementary-highlight"></span>
        </aside>
      )}
    </aside>
  )
}
