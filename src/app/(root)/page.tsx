import { getInfinitePlaces } from "@/api/getInfinitePlaces";
import { Place } from "@/types/typs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PlacesList from "./_components/PlacesList";

export default async function HomePage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["placesInfinite"],
        initialPageParam: 0,
        getNextPageParam: (lastPage: Place[], allPages: Place[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length;
        },
        queryFn: getInfinitePlaces,
        pages: 1,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <PlacesList />
        </HydrationBoundary>
    );
}

// export default async function HomePage() {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery({ queryKey: ["places"], queryFn: () => getPlaces(0) });
//     const dehydratedState = dehydrate(queryClient);

//     const queryData = await queryClient.getQueryData<QueryResult>(["placesInfinite"]);
//     const places = queryData ? queryData.pages.flat() : [];
//     return (
//          <HydrationBoundary state={dehydratedState}>
//              {places && <PlacesList places={places} />}
//          </HydrationBoundary>
//     );
