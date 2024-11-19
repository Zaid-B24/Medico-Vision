import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {label:"Email", type:"email", placeholder:"Email"},
        password: {label:"Password", type:"pssword", placeholder:"Password"},
      },
      authorize: async (credentials) => {
        let user = null

        const parsedCredentials = (credentials);
        if(!parsedCredentials) {
            console.error("Invalid credentials")
        }

        user = {
            id: '1',
            name: 'Aditya Singh',
            email: 'jojo@jojo.com',
            role: "admin"
        }
 
       
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],

  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
        const isLoggedIn = !!auth?.user;
        const { pathname } = nextUrl;
        
        if (pathname.startsWith('/auth/signin') && isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
        }
        // if (pathname.startsWith("/page2") && role !== "admin") {
        //     return Response.redirect(new URL('/', nextUrl));
        // }
        return !!auth;
    },
    // jwt({ token, user, trigger, session }) {
    //     if (user) {
    //         token.id = user.id as string;
    //         token.role = user.role as string;
    //     }
    //     if (trigger === "update" && session) {
    //         token = { ...token, ...session };
    //     }
    //     return token;
    // },
    // session({ session, token }) {
    //     session.user.id = token.id;
    //     session.user.role = token.role;
    //     return session;
    // }
},
  pages:{
    signIn: "/auth/signin"
  }
})