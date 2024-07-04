import Input from "../../_components/Input";
import signIn from "../_lib/signIn";
import LoginWithGithub from "./LoginWithGithub";
import { SubmitButton } from "./SubmitButton";

function LoginForm() {
    return (
        <form className="w-full max-w-sm mx-auto my-0 flex flex-col gap-y-8">
            <div>
                <Input label="아이디" required id="email" />
                <Input label="비밀번호" required id="password" type="password" />
            </div>

            <SubmitButton
                formAction={signIn}
                className="bg-blue-700 text-white rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing In..."
            >
                로그인
            </SubmitButton>

            <LoginWithGithub />
        </form>
    );
}

export default LoginForm;