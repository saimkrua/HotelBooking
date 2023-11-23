import HotelCatalog from '@/components/HotelCatalog'
import getHotels from '@/libs/getHotels'
import { Button } from '@mui/material'
import { getServerSession } from "next-auth"
import { authOptions } from '@/utils/authOption'
import getUserProfile from '@/libs/getUserProfile';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export default async function Home() {
  revalidateTag('hotels')
  const hotels = await getHotels()
  console.log(hotels)
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin");
  }
  const profile = await getUserProfile(session.user.token)
  return (
    <div style={{ position: 'relative' }}>
      {
        (profile?.data.role == "admin") ?
          <div className='flex flex-row-reverse mb-5'>
            <Button
              size="small"
              variant="contained"
              href={`/hotel/new`}
            >
              Create
            </Button>
          </div> : null
      }

      <HotelCatalog hotels={hotels.data} />
    </div>
  )
}
