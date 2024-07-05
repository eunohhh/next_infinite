import { emailRegex } from "@/app/utils/emailRegex";
import validateInputs from "@/app/utils/validateInput";
import createClientOnServer from "@/supabase/supabaseServer";
import { redirect } from "next/navigation";

async function signUp(formData: FormData) {
    "use server"
    const supabase = createClientOnServer();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordCheck = formData.get("password-check") as string;
    const nickname = formData.get("nickname") as string;

    if (!email || !password || !passwordCheck || !nickname) return alert("빈 값이 없도록 해주세요");

    if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다");

    const hasWhiteSpace = validateInputs([email, password, passwordCheck, nickname]);

    if (hasWhiteSpace) return alert("공백을 포함할 수 없습니다!");

    if (!emailRegex.test(email)) alert("유효한 이메일 주소를 입력하세요!");
    if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");
    if (nickname.length < 1 || nickname.length > 10) return alert("닉네임은 1~10 글자로 해야합니다!");
    if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다.");

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                user_name: nickname,
            },
        },
    });

    if (error) {
        return redirect("/signup");
    }

    return redirect("/");
}

export default signUp;