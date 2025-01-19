'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'

export type MenuOption = {
  label: string
  link?: string
  icon?: string
  subItems?: MenuOption[]
}

export type MenuItemsProps = {
  items: MenuOption[]
  isExpanded: boolean
  expandedItems: string[]
  setExpandedItems: React.Dispatch<React.SetStateAction<string[]>>
  level?: number
}

export const MenuItems = ({
  items,
  isExpanded,
  expandedItems,
  setExpandedItems,
  level = 0,
}: MenuItemsProps) => {
  const pathname = usePathname()

  const toggleItem = (label: string): void => {
    setExpandedItems((prev: string[]) =>
      prev.includes(label)
        ? prev.filter((item: string) => item !== label)
        : [...prev, label],
    )
  }

  return (
    <ul className={`space-y-2 ${level > 0 ? 'ml-4' : ''}`}>
      {items.map((item, index) => {
        const isActive = pathname === item.link
        const isItemExpanded = expandedItems.includes(item.label)

        return (
          <li key={index}>
            {item.link ? (
              <Link
                href={item.link}
                className={`
                  flex items-center rounded-lg p-2
                  ${isExpanded ? 'hover:bg-gray-700' : 'hover:bg-gray-700/50'}
                  ${isActive ? 'bg-gray-700' : ''}
                  ${!isExpanded ? 'size-1' : 'w-full'}
                  transition-all duration-200
                `}
              >
                {item.icon && <Icon icon={item.icon} className="size-5" />}
                {isExpanded && <span className="ml-3">{item.label}</span>}
              </Link>
            ) : (
              <button
                onClick={() => toggleItem(item.label)}
                className={`
                  flex w-full items-center rounded-lg p-2
                  ${isExpanded ? 'hover:bg-gray-700' : 'hover:bg-gray-700/50'}
                  ${!isExpanded ? 'size-1' : 'w-full'}
                  transition-all duration-200
                `}
              >
                {item.icon && <Icon icon={item.icon} className="size-5" />}
                {isExpanded && (
                  <>
                    <span className="ml-3 flex-1">{item.label}</span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`size-5 transition-transform${
                        isItemExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </>
                )}
              </button>
            )}
            {item.subItems && isItemExpanded && isExpanded && (
              <MenuItems
                items={item.subItems}
                isExpanded={isExpanded}
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                level={level + 1}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
