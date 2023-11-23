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
      <div className='mt-28 mx-auto bg-white lg:w-[700px] xl:w-[800px] 2xl:w-[1000px]'>
        {children}
      </div>
    </div>
  )
}
