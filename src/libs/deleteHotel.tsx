import { Session } from "next-auth"

export default async function deleteHotel(session: Session, hotelId: string) {
    const response = await fetch(`http://localhost:5000/api/v1/hotels/${hotelId}`, {
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
