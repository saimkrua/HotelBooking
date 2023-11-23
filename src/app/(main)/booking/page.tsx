import getBookings from '@/libs/getBookings';
import { getServerSession } from "next-auth"
import { authOptions } from '@/utils/authOption'
import { redirect } from 'next/navigation';
import BookingCatalog from '@/components/BookingCatalog';
import { revalidateTag } from 'next/cache';

export default async function Bookings() {
    revalidateTag('bookings')
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/signin");
    }
    const books = await getBookings(session)

    return (
        <div >
            <BookingCatalog books={books.data} />
        </div>
    );
}



