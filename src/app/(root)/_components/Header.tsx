import { cookies } from "next/headers";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import LoginLogoutSection from "./LoginLogoutSection";

async function Header() {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    const authTokenCookies = allCookies.filter((cookie) => cookie.name.startsWith("sb-ageijospngqmyzptvsoo-auth-token"));
    return (
        <header className="border-b border-gray-600 py-4">
            <div className="container mx-auto max-w-[1024px] px-5 h-16 flex items-center">
                <Link href="/" className="text-lg font-bold">
                    무한 스크롤, 리얼타임 예제
                </Link>

                <nav className="ml-20">
                    <ul className="flex items-center gap-x-8">
                        <li>
                            <Link href="/usequery">useQuery</Link>
                        </li>
                        <li>
                            <Link href="/mutation">mutation</Link>
                        </li>
                        <li>
                            <Link href="/realtime">realtime</Link>
                        </li>
                    </ul>
                </nav>

                {authTokenCookies.length > 0 ? (
                    <div className="ml-auto flex gap-x-2">
                        로그인 잘 되어있습니다
                        <LogOutButton />
                    </div>
                ) : (
                    <LoginLogoutSection />
                )}
            </div>
        </header>
    );
}

export default Header;
