'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

interface NavItem {
  label: string
  value: string
  icon: ReactNode
}

interface NavbarProps {
  items: NavItem[]
}

export function Navbar({ items }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLeague = searchParams.get('league')

  const handleLeagueChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('league', value)
    } else {
      params.delete('league')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <nav className="fixed inset-x-0 top-10 z-50 mx-auto max-w-7xl rounded-full bg-neutral-dark">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-12 items-center justify-between">
          <div className="shrink-0">
            <button
              onClick={() => handleLeagueChange('')}
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              GeoMatches
            </button>
          </div>

          <div className="flex space-x-4">
            {items.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleLeagueChange(item.value)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    currentLeague === item.value
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Área para ações adicionais (opcional) */}
          <div className="flex items-center">
            <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              {/* Ícone ou ação adicional */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
