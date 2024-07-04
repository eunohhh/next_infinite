import { AuthProvider } from "../context/auth.context";
import Header from "./_components/Header";

function BasicLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col justify-start p-2">
            <AuthProvider>
                <Header />
                <section className="container mx-auto max-w-[1024px] flex-1 flex flex-col justify-center">
                    {children}
                </section>
            </AuthProvider>
        </main>
    );
}

export default BasicLayout;
