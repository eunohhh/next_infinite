import { getPlaces } from "@/api/getPlaces";
import { Place } from "@/types/supabase";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PlacesList from "./_components/PlacesList";

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
