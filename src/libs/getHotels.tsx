import { getHospitalsResponse } from "@/interface"

export default async function getHotels(): Promise<getHospitalsResponse> {

    const response = await fetch("http://localhost:5000/api/v1/hotels", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { tags: ['hotels'] } 
    });
    if (!response.ok) {
        throw new Error("Failed to fetch hotels")
    }
    return response.json()
}