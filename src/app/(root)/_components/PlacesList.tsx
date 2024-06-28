"use client";

import { getPlaces } from "@/api/getPlaces";
import { Place } from "@/types/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "./InfiniteScroll";
import PlaceCard from "./PlaceCard";

function PlacesList() {
    const {
        data: placesData = [],
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["placesInfinite"],
        initialPageParam: 5,
        getNextPageParam: (lastPage: Place[], allPages: Place[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length;
        },
        queryFn: getPlaces,
        select: (data) => data.pages.flat(),
    });

    return (
        <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
            <ul>
                {placesData.map((place) => place && <PlaceCard key={place.id} place={place} />)}
                {isFetching && <li className="text-center">Loading...</li>}
            </ul>
        </InfiniteScroll>
    );
}

export default PlacesList;

// function PlacesList({ places }: { places: Place[] }) {

// const placesData = [...places, ...infiniteData];

// 초기 서버에서 가져온 places 와 추가로 가져온 infiniteData 를 합치고 undefined 값을 제거
// const placesData = [...places, ...infiniteData].filter(
//     (place): place is Place => place !== undefined
// );

// // 1. placesData 배열의 각 항목에서 id 값을 추출하여 Set 객체에 저장
// const uniqueIds = new Set(placesData.map((place) => place.id));

// // 2. Set 객체에 저장된 고유한 id 값을 사용하여, 각 id 값에 대응하는 Place 객체를 placesData 배열에서 찾아 새로운 배열을 만듬
// const uniquePlacesData = Array.from(uniqueIds).map((id) =>
//     placesData.find((place) => place.id === id)
// );

// const {
//     data: infiniteData = [],
//     isFetching,
//     fetchNextPage,
//     hasNextPage,
// } = useInfiniteQuery({
//     queryKey: ["placesInfinite"],
//     initialPageParam: 0,
//     getNextPageParam: (lastPage: Place[], allPages: Place[][]) => {
//         if (lastPage.length === 0) return null;
//         return allPages.length * LIMIT;
//     },
//     queryFn: ({ pageParam }) => {
//         // 서버 데이터와 통합하기 위해 첫번째 요청은 의미없는 배열을 반환
//         // 이렇게 하는 이유는 getNextPageParam 에서 첫 lastPage.length 가 0이 아니게 하기 위해서
//         if (pageParam === 0) return Promise.resolve([""]);
//         return getPlaces(pageParam);
//     },
//     select: (data) => data.pages.flat(),
// });
