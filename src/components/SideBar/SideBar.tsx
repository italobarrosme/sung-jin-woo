'use client'

import { useState } from 'react'
import { MenuItems, MenuOption } from './MenuItems'
import { cn } from '@/utils/cn'

type SideBarProps = {
  items: MenuOption[]
  isExpandedFlag?: boolean
}

export const SideBar = ({ items, isExpandedFlag }: SideBarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(isExpandedFlag || false)

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 h-screen bg-neutral-dark text-white z-50 shadow-lg transition-all duration-300 ease-in-out animate-fade-in cursor-pointer',
        {
          'w-64': isExpanded,
          'w-16': !isExpanded,
        },
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? (
        <nav className="h-full animate-fade-in px-3 py-4">
          <MenuItems
            items={items}
            isExpanded={isExpanded}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
          />
        </nav>
      ) : (
        <div className="flex h-screen animate-fade-in flex-col items-center justify-center">
          <span className="h-8 w-1 rounded-lg bg-complementary-highlight"></span>
        </div>
      )}
    </aside>
  )
}
