import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { handleSignout } from "@/app/actions/authActions";

export default async function Navbar() {
    const session = await auth();
    console.log(session);

    return (
        <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
            <Link href="/" className="text-xl font-bold">
                <Image src="/logo.png" alt="logo" height={10} width={40} />
            </Link>

            <div className="flex items-center space-x-4">
                <ThemeToggler />
                {!session ? (
                    <Link href="/auth/signin">
                        <Button variant="default">Sign In</Button>
                    </Link>
                ) : (
                    <form action={handleSignout}>
                        <Button variant="default" type="submit">
                            Sign Out
                        </Button>
                    </form>
                )}
            </div>
        </nav>
    );
}
