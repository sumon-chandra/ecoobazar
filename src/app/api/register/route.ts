import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/src/lib/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return new NextResponse("Invalid credentials!!", { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user = await prisma?.user.create({
            data: {
                name, email, hashedPassword, role
            }
        })

        return NextResponse.json(user)
    } catch (error: any) {
        console.log("ERROR_REGISTRATION", error);
        return new NextResponse("Internal Server Error while registering!!", { status: 500 })
    }
}