import BookingForm from "@/components/BookingForm";
import getBooking from "@/libs/getBooking";
import { getServerSession } from "next-auth"
import { authOptions } from '@/utils/authOption'
import { redirect } from "next/navigation";
import BookingCard from "@/components/BookingCard";
import EditBooking from "@/components/EditBooking";
import { revalidateTag } from "next/cache";

export default async function BookingDetailPage({ params }: { params: { bid: string } }) {
    revalidateTag('bookings')
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/signin");
    }
    const booking = await getBooking(session, params.bid);

    if (!booking) {
        return <div>Booking not found</div>;
    }

    return (
        <EditBooking book={booking.data} />
    );
}
