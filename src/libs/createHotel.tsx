import { BookingItem, ErrorResponse, Hotel } from "@/interface"
import { Session } from "next-auth";

export default async function createHotel(session: Session, item: Hotel) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/hotels`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                name: item.name,
                address: item.address,
                district: item.district,
                province: item.province,
                postalcode: item.postalcode,
                tel: item.tel,
                picture: item.picture,
            }),
        });

        if (!response.ok) {
            let errorResponse: ErrorResponse;

            try {
                // Try to parse the error response as JSON
                errorResponse = await response.json();
            } catch (error) {
                // If parsing fails, create a generic error response
                errorResponse = { message: 'Error creating hotel.' };
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

