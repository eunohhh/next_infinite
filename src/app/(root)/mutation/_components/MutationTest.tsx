"use client";

import { addDeals } from "@/api/addDeals";
import { getDeals } from "@/api/getDeals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../../_components/Input";

function MutationTest() {
    const queryClient = useQueryClient();
    const {
        data: deals = [],
        isPending,
        error,
    } = useQuery({
        queryKey: ["deals"],
        queryFn: getDeals,
    });

    const {
        mutate,
        isPending: isMutationPending,
        error: mutationError,
    } = useMutation({
        mutationFn: (newDeals: string) => addDeals(newDeals),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["deals"] });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const content = formData.get("content")?.toString();

        if (!content) return alert("content is required");

        mutate(content);
    };

    if (error) {
        console.error(error);
        return <div>error occurred!</div>;
    }

    if (isPending) return <div>loading...</div>;

    // console.log(deals);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mutation Test</h1>

            <form onSubmit={handleSubmit}>
                <Input label="content" id="content" />
                <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
                    Submit
                </button>
            </form>
            <hr className="my-4" />
            <ul className="flex flex-col gap-4">
                {deals.map((deal) => (
                    <li className="p-4 border-2 border-gray-300 rounded-md" key={deal.id}>
                        <p>{deal.sellerId}</p>
                        <p>{deal.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MutationTest;
