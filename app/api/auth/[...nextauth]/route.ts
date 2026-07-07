import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@resort.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const isValidEmail = credentials?.email === process.env.ADMIN_EMAIL;
                const isValidPassword = credentials?.password === process.env.ADMIN_PASSWORD;
                if (isValidEmail && isValidPassword) {
                    return { id: "1", name: "Resort Admin", email: process.env.ADMIN_EMAIL };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 0,
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };