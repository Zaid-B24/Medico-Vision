// import { auth } from "@/auth"
import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar =  () => {
    // const sesssion = await auth();
    
    return (
        <header className="px-5 py-5 bg-black shadow-sm">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" height={7} width={40} />
                </Link>
                <ThemeToggler/>
            </nav>
        </header>
    )
}

export default Navbar;