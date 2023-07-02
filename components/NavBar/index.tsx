import { redirect } from 'next/navigation'
import { auth, UserButton } from '@clerk/nextjs'
import { ThemeToggle } from '../ThemeToggle'
import NavOptions from './NavOptions'

const Navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/login')
  }

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <NavOptions className='px-4' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
