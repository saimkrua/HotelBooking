import { getHospitalResponse } from "@/interface"

export default async function getHotel(id: string): Promise<getHospitalResponse> {

    const response = await fetch(`http://localhost:5000/api/v1/hotels/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { tags: ['hotels'] } 
    })
    if (!response.ok) {
        throw new Error("Failed to fetch hospital")
    }
    return response.json()
}