
import NextAuth from "next-auth/next";
import { authOptions } from "./actions/authOptions";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }