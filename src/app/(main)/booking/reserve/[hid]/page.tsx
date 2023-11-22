import BookingForm from "@/components/BookingForm";
import getHotel from "@/libs/getHotel";
import { revalidateTag } from "next/cache";

export default async function HotelDetailPage({ params }: { params: { hid: string } }) {
    revalidateTag('hotels')
    const hotel = await getHotel(params.hid);

    if (!hotel) {
        return <div>Hospital not found</div>;
    }

    return (
        <BookingForm hotel={hotel.data}/>
    );
}
