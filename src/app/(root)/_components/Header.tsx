"use client";
import { useAuth } from "@/app/context/auth.context";
import supabaseClient from "@/supabase/supabaseClient";
import Link from "next/link";
import LoginLogoutSection from "./LoginLogoutSection";

function Header() {
    const { isInitialized, isLoggedIn } = useAuth();

    const handleClickLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) console.error(error);
    };

    return (
        <header className="border-b border-gray-600 py-4">
            <div className="container mx-auto max-w-[1024px] px-5 h-16 flex items-center">
                <Link href="/" className="text-lg font-bold">
                    무한 스크롤, 리얼타임 예제
                </Link>

                <nav className="ml-20">
                    <ul className="flex items-center gap-x-8">
                        <li>
                            <Link href="/usequery">useQuery Example</Link>
                        </li>
                    </ul>
                </nav>

                {isInitialized ? (
                    isLoggedIn ? (
                        <div className="ml-auto flex gap-x-2">
                            로그인 잘 되어있습니다
                            <button onClick={handleClickLogout}>로그아웃</button>
                        </div>
                    ) : (
                        <LoginLogoutSection />
                    )
                ) : (
                    <div className="ml-auto">로딩 중...</div>
                )}
            </div>
        </header>
    );
}

export default Header;
