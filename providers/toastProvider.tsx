'use client'

import { Toaster as RadToaster } from 'sonner'

export default function ToastProvider() {
  return (
    <RadToaster
      position='bottom-right'
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
      }}
    />
  )
}
