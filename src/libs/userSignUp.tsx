import { ErrorResponse } from "@/interface";

export default async function userSignUp(name: string, userEmail: string, tel: string, userPassword: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: userEmail,
                tel: tel,
                password: userPassword,
            })
        })

        if (!response.ok) {
            console.log(response)
            let errorResponse: ErrorResponse;

            try {
                // Try to parse the error response as JSON
                errorResponse = await response.json();
            } catch (error) {
                // If parsing fails, create a generic error response
                errorResponse = { message: 'Error Sign up' };
            }

            // Return an error object
            return { success: false, error: errorResponse };
        }
        const data = await response.json();

        return { success: true, data };
    } catch (error) {
        // Handle other errors (e.g., network issues)
        return { success: false, error: { message: 'An unexpected error occurred.' } };
    }
}
