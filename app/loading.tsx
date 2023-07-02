import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Skeleton />
    </div>
  )
}
