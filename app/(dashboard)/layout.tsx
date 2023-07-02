import Navbar from '@/components/NavBar'

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='p-4'>{children}</main>
    </>
  )
}
