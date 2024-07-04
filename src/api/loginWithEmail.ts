import { LoginPayLoad } from "@/types/typs";

export async function loginWithEmail(payload: LoginPayLoad) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Login");
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}