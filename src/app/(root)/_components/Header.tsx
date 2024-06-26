import Link from "next/link";

function Header() {
    return (
        <header className="border-b border-gray-600 py-4">
            <div className="container mx-auto max-w-[1024px] px-5 h-16 flex items-center">
                <Link href="/" className="text-lg font-bold">
                    무한 스크롤 예제
                </Link>

                <nav className="ml-20">
                    <ul className="flex items-center gap-x-8">
                        <li>
                            <Link href="/">홈으로</Link>
                        </li>
                    </ul>
                </nav>

                <div className="ml-auto">
                    <ul className="flex items-center gap-x-8">
                        <li>
                            <Link href="/log-in">로그인</Link>
                        </li>
                        <li>
                            <Link href="/sign-up">회원가입</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
