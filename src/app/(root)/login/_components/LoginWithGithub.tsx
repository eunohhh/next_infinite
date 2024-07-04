"use client";

import supabaseClient from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";

function LoginWithGithub() {
    const router = useRouter();

    const handleGithubLogin = async () => {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: "github",
        });

        if (error) return alert(error.message);

        if (data) return router.push("/");
    };

    return (
        <button onClick={handleGithubLogin} className="w-full bg-gray-700 text-white p-2 rounded-md" type="button">
            깃헙로그인
        </button>
    );
}

export default LoginWithGithub;
