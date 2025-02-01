import { ElementType } from 'react'

export interface NavItem {
  label: string
  href: string
  icon: ElementType
}

export interface NavbarProps {
  items: NavItem[]
}
