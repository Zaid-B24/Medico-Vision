"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// import bcryptjs from "bcryptjs";

export async function handleCredentialsSignin (
    {email,password}:{email:string, password:string}
) {
    try {
        await signIn ("credentials", {email, password, redirectTo:"/"})
        
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type){
                case 'CredentialsSignin':
                return {
                    messaeg: 'Invalid credentials',
                }
                default:
                    return {
                        messae: 'Something went wrong'
                    }
            }
        }
    }
}

export async function  handleGithubSignin() {
    await signIn("github", {redirectTo: "/"});
}

export async function  handleSignout() {
    await signOut ();
}