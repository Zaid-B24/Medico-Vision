import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import prisma from "./lib/prisma"
import { signInSchema } from "./lib/zod"
import bcryptjs from "bcryptjs"; // Fixed import statement for bcryptjs

const publicRoutes = ["/auth/signup", "/auth/signin "]
const authRoutes = ["/auth/signup", "/auth/signin "]
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {label:"Email", type:"email", placeholder:"Email"},
        password: {label:"Password", type:"pssword", placeholder:"Password"},
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error("Invalid credentials", parsedCredentials.error.errors);
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: parsedCredentials.data.email,
          },
        });

        if (!user || !user.password) {
          console.log("Invalid credentials.");
          return null;
        }

        const isPasswordVerified = await bcryptjs.compare(
          parsedCredentials.data.password,
          user.password
        );

        if (!isPasswordVerified) {
          console.log("Invalid password.");
          return null;
        }

        const { ...userWithoutPassword } = user;
        return userWithoutPassword;

      },
    }),
  ],

  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
        const isLoggedIn = !!auth?.user;
        const { pathname } = nextUrl;
        
       if(publicRoutes.includes(pathname)) {
        return true
       }
       
       if(authRoutes.includes(pathname)){
        if(isLoggedIn) {
            return Response.redirect(new URL ('/', nextUrl))
        }return true;
       }
        return isLoggedIn
    },
    jwt({ token, user, trigger, session }) {
        if (user) {
            token.id = user.id as string;
            token.role = user.role as string;
        }
        if (trigger === "update" && session) {
            token = { ...token, ...session };
        }
        return token;
    },
    session({ session, token }) {
        session.user.id = token.id;
        session.user.role = token.role;
        return session;
    }
},
  pages:{
    signIn: "/auth/signin"
  }
})