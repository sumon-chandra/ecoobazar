
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "USER" | "SELLER" | "ADMIN";
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: "USER" | "SELLER" | "ADMIN";
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: "USER" | "SELLER" | "ADMIN";
    }
}