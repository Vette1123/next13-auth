'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function NavOptions({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const options = [
    {
      label: 'Home',
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Profile',
      href: '/profile',
      active: pathname === '/profile',
    },
  ]

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {options.map((option) => (
        <Link
          href={option.href}
          key={option.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            option.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavOptions
