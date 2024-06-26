import Header from "./_components/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Header />
            {children}
        </main>
    );
}

export default RootLayout;
