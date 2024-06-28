import Config from "@/config/config.export";
import { Place } from "@/types/supabase";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getPlaces({
    pageParam = 0,
}: QueryFunctionContext<string[], number>): Promise<Place[]> {
    const response = await fetch(`${Config().baseUrl}/api/places`, {
        method: "POST",
        body: JSON.stringify({ page: pageParam }),
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
