import Config from "@/config/config.export";

export async function getPlaces(page: number) {
    const response = await fetch(`${Config().baseUrl}/api/places`, {
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
