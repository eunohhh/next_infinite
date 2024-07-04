import { Deal } from "@/types/typs";

export async function getDeals() : Promise<Deal[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deals`, {
        method: "GET",
        next: {
            tags: ["deals"],
        },
        // credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch deals");
    }
    const data = await response.json();

    return data;
}