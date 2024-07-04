
import { RealTime } from "@/types/typs";

export async function getRealTimeOne() : Promise<RealTime[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/realtime`, {
        method: "GET",
        next: {
            tags: ["realtimeone"],
        },
        cache: "no-store",
        // credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch deals");
    }
    const data = await response.json();

    return data;
}