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

    // 초기 서버에서 가져온 places 와 추가로 가져온 infiniteData 를 합치고 undefined 값을 제거
    // fetching 중이면 초기 서버에서 가져온 places 만 사용
    // fetching 중이 아니면 초기 서버에서 가져온 places 와 추가로 가져온 infiniteData 를 합침
    // const placesData = !isFetching
    //     ? [...places, ...infiniteData].filter((place): place is Place => place !== undefined)
    //     : [...places].filter((place): place is Place => place !== undefined);
    const placesData = [...places, ...infiniteData].filter(
        (place): place is Place => place !== undefined
    );

    const uniquePlacesData = Array.from(new Set(placesData.map((place) => place.id))).map((id) =>
        placesData.find((place) => place.id === id)
    );

    return (
        <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
            <ul>
                {uniquePlacesData.map(
                    (place) => place && <PlaceCard key={place.id} place={place} />
                )}
                {isFetching && <li className="text-center">Loading...</li>}
            </ul>
        </InfiniteScroll>
    );
}

export default PlacesList;

// const placesData = [...places, ...infiniteData];
