import EditHotelForm from '@/components/editHotelForm';
import getHotel from '@/libs/getHotel';
import { revalidateTag } from 'next/cache';

export default async function EditHotelPage({ params }: { params: { hid: string } }) {
    revalidateTag('hotels')
    const hotel = await getHotel(params.hid);
    console.log(hotel)
    return (
        <EditHotelForm hotel={hotel.data} />
    )
}
