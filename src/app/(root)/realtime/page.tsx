import { getRealTimeOne } from "@/api/getRealTimeOne";
import { RealTime } from "@/types/typs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getUserServer from "../_lib/getUserServer";
import RealTimePosts from "./_components/RealTimePost";

async function RealTimePage() {
    const { user } = await getUserServer();

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<RealTime[]>({
        queryKey: ["realtimeone"],
        queryFn: getRealTimeOne,
    });
    const dehydratedState = dehydrate(queryClient);

    const serverPosts = await queryClient.getQueryData<RealTime[]>(["realtimeone"]);

    return (
        <HydrationBoundary state={dehydratedState}>
            <RealTimePosts serverPosts={serverPosts ?? []} user={user} />
        </HydrationBoundary>
    );
}

export default RealTimePage;
