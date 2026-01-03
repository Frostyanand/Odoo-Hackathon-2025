// src/app/api/auth/check-email/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Check if an email already exists in the database
 * Used to guide user to login vs signup flow
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { exists: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, provider: true },
        });

        return NextResponse.json({
            exists: !!user,
            user: user ? { name: user.name, provider: user.provider } : null,
        });
    } catch (error) {
        console.error("Check email error:", error);
        return NextResponse.json(
            { exists: false, error: "Failed to check email" },
            { status: 500 }
        );
    }
}
