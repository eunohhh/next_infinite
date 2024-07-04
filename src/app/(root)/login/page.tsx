"use client";

import { emailRegex } from "@/app/utils/emailRegex";
import supabaseClient from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import Input from "../_components/Input";

function LogInPage() {
    const router = useRouter();

    const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) return alert("빈 값이 없도록 해주세요");

        if (/\s/.test(email) || /\s/.test(password)) return alert("공백을 포함할 수 없습니다!");

        if (!emailRegex.test(email)) return alert("유효한 이메일 주소를 입력하세요!");
        if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return alert(error.message);

        if (data) return router.push("/");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto my-0 flex flex-col gap-y-8">
            <div>
                <Input label="아이디" required id="email" />
                <Input label="비밀번호" required id="password" type="password" />
            </div>

            <button className="w-full bg-blue-500 text-white p-2 rounded-md" type="submit">
                로그인하기
            </button>
        </form>
    );
}

export default LogInPage;
