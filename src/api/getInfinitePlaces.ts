// import Config from "@/config/config.export";
import { Place } from "@/types/supabase";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getInfinitePlaces({
    pageParam = 0,
}: QueryFunctionContext<string[], number>): Promise<Place[]> {
    // const response = await fetch(`${Config().baseUrl}/api/places`, {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/places`, {

        method: "POST",
        body: JSON.stringify({ page: pageParam }),
        next: {
            tags: ["placesInfinite"],
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }
    const data = await response.json();
    return data;
}
