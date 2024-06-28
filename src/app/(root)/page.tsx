import { getPlaces } from "@/api/getPlaces";
import { Place } from "@/types/supabase";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PlacesList from "./_components/PlacesList";

const LIMIT = 5;

export default async function HomePage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["placesInfinite"],
        initialPageParam: 0,
        getNextPageParam: (lastPage: Place[], allPages: Place[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length * LIMIT;
        },
        queryFn: ({ pageParam }) => getPlaces(pageParam),
    });
    const dehydratedState = dehydrate(queryClient);

    const places = await queryClient.getQueryData<Place[]>(["places"]);

    // console.log(places);
    return (
        <HydrationBoundary state={dehydratedState}>
            {places && <PlacesList places={places} />}
        </HydrationBoundary>
    );
}

// export default async function HomePage() {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery({ queryKey: ["places"], queryFn: () => getPlaces(0) });
//     const dehydratedState = dehydrate(queryClient);

//     const places = await queryClient.getQueryData<Place[]>(["places"]);

//     // console.log(places);
//     return (
//         <HydrationBoundary state={dehydratedState}>
//             {places && <PlacesList places={places} />}
//         </HydrationBoundary>
//     );
// }
