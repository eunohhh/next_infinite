"use client";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // SSR을 사용하면 일반적으로 기본 staleTime을
                // 0 이상으로 설정하여 클라이언트에서 즉시 리프레시되지 않도록 합니다.
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 60 * 1000,
            },
        },
    });
}

// undefined 로 초기값 설정
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // 서버: 항상 새 쿼리 클라이언트 만들기
        return makeQueryClient();
    } else {
        // 브라우저: 아직 클라이언트가 없는 경우 새 쿼리 클라이언트를 만듭니다.
        // 이것은 중요한 사항입니다. 초기 렌더링 중에 일시 중단되면 새 클라이언트를 다시 만들지 않습니다.
        // 다음과 같은 경우에는 필요하지 않을 수 있습니다.
        // 쿼리 클라이언트 생성 아래에 서스펜스 경계가 있는 경우입니다.
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

function QueryProvider({ children }: { children: React.ReactNode }) {
    // 이 코드와 일시 중단될 수 있는 코드 사이에 suspends boundary가 없는 경우
    // 쿼리 클라이언트를 초기화할 때 useState 사용을 피하세요.
    // 왜냐하면 React는 초기 렌더링에서 suspends 발생시
    // suspends boundary가 없으면 클라이언트를 버릴 것이기 때문입니다.??
    // 아무튼 app router 에서는 useState 안에서 생성하지 말라는 소리같음
    const queryClient = getQueryClient();

    // 데브툴즈 initialIsOpen 꼭 아래처럼 설정해야 서버 오류 안남
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_RUN_MODE === "local"} />
        </QueryClientProvider>
    );
}

export default QueryProvider;

// function QueryProvider({ children }: { children: React.ReactNode }) {
//     const [client] = useState(
//         new QueryClient({
//             defaultOptions: {
//                 queries: {
//                     refetchOnWindowFocus: false,
//                     retry: false,
//                 },
//             },
//         })
//     );

//     return (
//         <QueryClientProvider client={client}>
//             {children}
//             <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"} />
//         </QueryClientProvider>
//     );
// }

// export default QueryProvider;
