async function getPlaces() {
    const response = await fetch("/api/places", {
        method: "GET",
        body: JSON.stringify({ start: 0, end: 5 }),
    });

    const data = await response.json();
    return data;
}

export default function HomePage() {
    const places = getPlaces();

    console.log(places);
    return <></>;
}
