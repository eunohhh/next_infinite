import { Place } from "@/types/supabase";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PlacesList from "./_components/PlacesList";

export async function getPlaces(page: number) {
    const response = await fetch("http://localhost:3000/api/places", {
        method: "POST",
        body: JSON.stringify({ start: page }),
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

export default async function HomePage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ["places"], queryFn: () => getPlaces(0) });
    const dehydratedState = dehydrate(queryClient);

    const places = await queryClient.getQueryData<Place[]>(["places"]);

    // console.log(places);
    return (
        <HydrationBoundary state={dehydratedState}>
            {places && <PlacesList places={places} />}
        </HydrationBoundary>
    );
}
