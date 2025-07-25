import { Icon } from '@iconify/react'

export const navItems = [
  {
    label: 'Premier League',
    value: 'premier-league',
    icon: <Icon icon="game-icons:lion" />,
    blocked: false,
  },
  {
    label: 'Bundesliga',
    value: 'bundesliga',
    icon: <Icon icon="tabler:play-football" />,
    blocked: true,
  },

  {
    label: 'La Liga',
    value: 'la-liga',
    icon: <Icon icon="lucide:trophy" />,
    blocked: true,
  },
]
