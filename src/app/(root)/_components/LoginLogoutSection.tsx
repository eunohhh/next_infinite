import Link from "next/link";

function LoginLogoutSection() {
    return (
        <div className="ml-auto">
            <ul className="flex gap-x-2.5">
                <li>
                    <Link href="/login">로그인</Link>
                </li>
                <li>
                    <Link href="/signup">회원가입</Link>
                </li>
            </ul>
        </div>
    );
}

export default LoginLogoutSection;
