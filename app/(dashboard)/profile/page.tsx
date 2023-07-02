import React from 'react'
import { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Testing profile page with clerk',
}

export default function ProfilePage() {
  return (
    <main className='flex space-y-4 p-4'>
      <UserProfile />
    </main>
  )
}
