"use client";

import { getPlaces } from "@/api/getPlaces";
import { Place } from "@/types/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "./InfiniteScroll";
import PlaceCard from "./PlaceCard";

function PlacesList({ places }: { places: Place[] }) {
    const {
        data: infiniteData = [],
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["placesInfinite"],
        initialPageParam: 0,
        getNextPageParam: (lastPage: Place[], allPages: Place[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length * 5;
        },
        queryFn: ({ pageParam }) => {
            // console.log(pageParam);
            return getPlaces(pageParam);
        },
        select: (data) => data.pages.flat(),
    });

    if (isFetching)
        return (
            <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
                <ul>
                    {places.map((place) => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </ul>
            </InfiniteScroll>
        );

    // const placesData = [...places, ...infiniteData];

    return (
        <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
            <ul>
                {infiniteData.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ul>
        </InfiniteScroll>
    );
}

export default PlacesList;
