"use client";

import { useAuth } from "@/app/context/auth.context";
import LogOutButton from "./LogOutButton";
import LoginLogoutSection from "./LoginLogoutSection";

function LoginOrLogout() {
    const { isInitialized, isLoggedIn } = useAuth();

    return (
        <>
            {isInitialized ? (
                isLoggedIn ? (
                    <div className="ml-auto flex gap-x-2">
                        로그인 잘 되어있습니다
                        <LogOutButton />
                    </div>
                ) : (
                    <LoginLogoutSection />
                )
            ) : (
                <div className="ml-auto">로딩 중...</div>
            )}
        </>
    );
}

export default LoginOrLogout;
