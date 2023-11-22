import { Session } from "next-auth"

export default async function deleteBooking(session: Session, bookingId: string) {
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.token}`
        },
    });

    if (!response.ok) {
        throw new Error('Error deleting booking.');
    }

    return response.json(); // You may not need this line if the server doesn't return a response for DELETE requests.
}
