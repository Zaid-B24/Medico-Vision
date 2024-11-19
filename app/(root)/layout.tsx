import Navbar from "@/components/NavBar";
import React from "react";
import { Providers } from "../providers";

export default function Layout ({children}: {children:React.ReactNode}) {
    return(
        <main>
            <Providers>
            <Navbar />
            {children}
            </Providers>
        </main>
    )
}