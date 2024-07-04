import QueryProvider from "@/Provider/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/auth.context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Infinite Scroll Example",
    description: "Infinite Scroll Example",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <QueryProvider>
                    <AuthProvider>{children}</AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
