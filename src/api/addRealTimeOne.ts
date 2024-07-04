export async function addRealTimeOne(title: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/realtime`, {
        method: "POST",
        body: JSON.stringify({title}),
        next: {
            tags: ["deals"],
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch deals");
    }
    const data = await response.json();

    return data;
}