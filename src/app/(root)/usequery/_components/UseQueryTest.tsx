"use client";

import { getPlaces } from "@/api/getPlaces";
import { useQuery } from "@tanstack/react-query";

function UseQueryTest() {
    const {
        data: places = [],
        isPending,
        error,
    } = useQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    });

    if (error) return <div>error occurred!</div>;

    if (isPending) return <div>loading...</div>;

    // console.log(places);

    return (
        <ul>
            {places.map((place) => (
                <li key={place.id}>{place.gather_name}</li>
            ))}
        </ul>
    );
}

export default UseQueryTest;
