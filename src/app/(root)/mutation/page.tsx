import { getDeals } from "@/api/getDeals";
import MutationTest from "@/app/(root)/mutation/_components/MutationTest";
import { Deal } from "@/types/typs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

async function MutationPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<Deal[]>({
        queryKey: ["deals"],
        queryFn: getDeals,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <MutationTest />
        </HydrationBoundary>
    );
}

export default MutationPage;
