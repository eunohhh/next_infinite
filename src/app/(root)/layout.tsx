import Header from "./_components/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col justify-between p-2">
            <Header />
            <section className="container mx-auto max-w-[1024px]">{children}</section>
        </main>
    );
}

export default RootLayout;
