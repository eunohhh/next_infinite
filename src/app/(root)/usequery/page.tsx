import { getPlaces } from "@/api/getPlaces";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import UseQueryTest from "./_components/UseQueryTest";

async function UseQueryPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    });
    const dehydratedState = dehydrate(queryClient);

    // 이거는 안해도됨
    // const queryData = await queryClient.getQueryData(["places"]);
    // console.log(queryData);

    return (
        <HydrationBoundary state={dehydratedState}>
            <UseQueryTest />
        </HydrationBoundary>
    );
}

export default UseQueryPage;
