// src/app/api/auth/sync/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Curated travel-themed avatars from Landing Page
const DEFAULT_AVATARS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=faces",
];

function getRandomAvatar() {
    return DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, name, image, provider, phone, city, country } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        // Assign random avatar if no image provided (Email/Password users)
        const finalImage = image || getRandomAvatar();
        const finalProvider = provider || "email";

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        let user;

        if (existingUser) {
            // Existing user - update with new info (but don't overwrite profile fields if already set)
            user = await prisma.user.update({
                where: { email },
                data: {
                    name: name || existingUser.name,
                    image: finalImage,
                    provider: finalProvider,
                    // Only update these if they were empty before and are now provided
                    phone: existingUser.phone || phone || null,
                    city: existingUser.city || city || null,
                    country: existingUser.country || country || null,
                },
            });
        } else {
            // New user - create with all provided data
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || null,
                    image: finalImage,
                    provider: finalProvider,
                    phone: phone || null,
                    city: city || null,
                    country: country || null,
                },
            });
        }

        return NextResponse.json({
            success: true,
            user,
            isNewUser: !existingUser,
        });
    } catch (error) {
        console.error("Auth sync error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to sync user" },
            { status: 500 }
        );
    }
}
