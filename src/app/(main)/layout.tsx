import "../globals.css"
import TopMenu from '@/components/TopMenu'


export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <TopMenu />
      <div className='mt-28 px-60 bg-white'>
        {children}
      </div>
    </div>
  )
}
