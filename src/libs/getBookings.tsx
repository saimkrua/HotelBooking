import { getBookingsResponse } from "@/interface";
import { Session } from "next-auth";

export default async function getBookings(session: Session): Promise<getBookingsResponse> {
    // Check for valid session and user token
    if (!session || !session.user || !session.user.token) {
        console.error('Invalid session or missing user token.');
        // Handle the error or return early
        throw new Error('Invalid session or missing user token.');
    }
    
    const response = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.token}`,
        },
        next: { tags: ['bookings'] } 
    });

    if (!response.ok) {
        console.error('Failed to fetch bookings. HTTP status:', response.status);
        const responseBody = await response.text(); // or response.json() if applicable
        console.error('Response body:', responseBody);
        throw new Error('Failed to fetch bookings. See console for details.');
    }

    return response.json();
}
