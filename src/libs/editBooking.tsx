import { BookingItem, ErrorResponse } from "@/interface";
import dayjs from "dayjs";
import { Session } from "next-auth";

export default async function editBooking(session: Session, bookingId: string, item: BookingItem){
    try {
        const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                bookingDate: dayjs(item.bookingDate).format("YYYY/MM/DD"),
                checkoutDate: dayjs(item.checkoutDate).format("YYYY/MM/DD"),
            }),
        });

        if (!response.ok) {
            let errorResponse: ErrorResponse;

            try {
                // Try to parse the error response as JSON
                errorResponse = await response.json();
            } catch (error) {
                // If parsing fails, create a generic error response
                errorResponse = { message: 'Error updating booking.' };
            }

            // Return an error object
            return { success: false, error: errorResponse };
        }

        const data = await response.json();
        // Return the successful result
        return { success: true, data };
    } catch (error) {
        // Handle other errors (e.g., network issues)
        return { success: false, error: { message: 'An unexpected error occurred.' } };
    }
}
