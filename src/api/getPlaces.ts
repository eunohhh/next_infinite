import Config from "@/config/config.export";
import { Place } from "@/types/supabase";

export async function getPlaces(): Promise<Place[]> {
    const response = await fetch(`${Config().baseUrl}/api/places`, {
        method: "GET",
        next: {
            tags: ["places"],
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }
    const data = await response.json();
    return data;
}
