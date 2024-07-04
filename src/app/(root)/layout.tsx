import Header from "./_components/Header";

export const revalidate = 0;

async function BasicLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col justify-start p-2">
            <Header />
            <section className="container mx-auto max-w-[1024px] flex-1 flex flex-col">{children}</section>
        </main>
    );
}

export default BasicLayout;

// async function getUser() {
//     const supabase = createClientOnServer();

//     const { data, error } = await supabase.auth.getUser();

//     if (error) {
//         console.log(error);
//         throw new Error(error.message);
//     }
//     return data.user;
// }
