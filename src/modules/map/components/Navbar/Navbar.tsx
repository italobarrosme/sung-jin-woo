'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'
import { Button } from '@/components/Button'

interface NavItem {
  label: string
  value: string
  icon: ReactNode
  blocked: boolean
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
    <nav className="fixed inset-x-0 top-10 z-50 mx-auto max-w-7xl rounded-full border-b-2 border-l-8 border-complementary-highlight bg-neutral-dark p-2">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-12 items-center justify-between">
          <div className="shrink-0">
            <Button
              variant="full-ghost"
              onClick={() => handleLeagueChange('')}
              className="font-bold text-complementary-highlight"
            >
              GeoMatches
            </Button>
          </div>

          <div className="flex space-x-4">
            {items.map((item, index) => {
              return (
                <Button
                  key={index + item.value}
                  variant="fit-ghost"
                  onClick={() => handleLeagueChange(item.value)}
                  disabled={item.blocked}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-complementary-highlight disabled:opacity-50',
                    currentLeague === item.value
                      ? 'border-l-4 border-b-2 border-complementary-highlight text-neutral-white rounded-2xl'
                      : 'text-neutral-white',
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              )
            })}
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"></button>
          </div>
        </div>
      </div>
    </nav>
  )
}
