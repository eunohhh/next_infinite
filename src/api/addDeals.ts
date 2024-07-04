export async function addDeals(content: string) {

    console.log(content);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deals`, {
        method: "POST",
        body: JSON.stringify({content}),
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