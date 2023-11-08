import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!email || !password || !name) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma?.user.create({
            data: { hashedPassword, name, email }
        })

        return NextResponse.json(user)
    } catch (error: any) {
        console.log(error, "ERROR_REGISTRATION");
        return new NextResponse("Internal Server Error!", { status: 500 })
    }
}