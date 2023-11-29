import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import prisma from "../../../../lib/prismadb";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma!),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "string" },
                password: { label: "password", type: "string" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma?.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) {
                    throw new Error("Incorrect password")
                }

                const testUser = {}

                return user
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        session({ session, token }) {
            session.user.role = token.role
            return session
        }
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}