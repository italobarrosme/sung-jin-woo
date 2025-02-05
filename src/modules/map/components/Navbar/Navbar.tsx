'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'
import { Button } from '@/components/Button'
import Image from 'next/image'
import { SearchTeamForm } from '@/modules/football/team/SearchTeam'

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
    <nav className="fixed inset-x-0 top-10 z-50 mx-auto max-w-7xl rounded-md border-b-2 border-l-8 border-complementary-highlight bg-neutral-dark p-2">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-10 w-full items-center justify-between gap-8">
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="full-ghost"
              onClick={() => handleLeagueChange('')}
              className="flex items-center gap-2 font-bold text-complementary-highlight"
            >
              <span className="text-xs font-bold text-complementary-highlight">
                GeoMatches
              </span>
              <Image src="/logo.svg" alt="GeoMatches" width={32} height={32} />
            </Button>
          </div>

          <div>
            <SearchTeamForm />
          </div>

          <div className="flex">
            {items.map((item, index) => {
              return (
                <Button
                  key={index + item.value}
                  variant="fit-ghost"
                  onClick={() => handleLeagueChange(item.value)}
                  disabled={item.blocked}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-colors hover:text-complementary-highlight disabled:opacity-50',
                    currentLeague === item.value
                      ? 'border-l-8 border-complementary-highlight text-complementary-highlight rounded-md'
                      : 'text-neutral-white',
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
