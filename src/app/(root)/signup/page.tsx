import Input from "../_components/Input";
import { SubmitButton } from "../_components/SubmitButton";
import signUp from "./_lib/signUp";

function SignUpPage() {
    return (
        <div className="w-full h-[600px] flex justify-center items-center">
            <form className="w-full max-w-sm mx-auto flex flex-col gap-y-8">
                <div>
                    <Input label="아이디" required id="email" />
                    <Input label="비밀번호" required id="password" type="password" />
                    <Input label="비밀번호 확인" required id="password-check" type="password" />
                    <Input label="닉네임" required id="nickname" />
                </div>

                <SubmitButton
                    formAction={signUp}
                    className="bg-blue-700 text-white rounded-md px-4 py-2 text-foreground mb-2"
                    pendingText="Sign Up..."
                >
                    회원가입
                </SubmitButton>
            </form>
        </div>
    );
}

export default SignUpPage;

// const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const passwordCheck = formData.get("password-check") as string;
//     const nickname = formData.get("nickname") as string;

//     if (!email || !password || !passwordCheck || !nickname) return alert("빈 값이 없도록 해주세요");

//     if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다");

//     const hasWhiteSpace = validateInputs([email, password, passwordCheck, nickname]);

//     if (hasWhiteSpace) return alert("공백을 포함할 수 없습니다!");

//     if (!emailRegex.test(email)) alert("유효한 이메일 주소를 입력하세요!");
//     if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");
//     if (nickname.length < 1 || nickname.length > 10) return alert("닉네임은 1~10 글자로 해야합니다!");
//     if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다.");

//     const { data, error } = await supabaseClient.auth.signUp({
//         email,
//         password,
//         options: {
//             data: {
//                 display_name: nickname,
//             },
//         },
//     });

//     if (error) return alert(error.message);

//     console.dir(data);
// };
