"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MessageSquare } from "lucide-react";

export default function Navbar() {
    const { user } = useAuth();
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? "text-[#327D81] border-b-2 border-[#327D81] pb-1 font-medium" : "hover:text-[#327D81] transition-colors font-medium";

    return (
        <nav className="bg-[#13294B] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="font-serif text-3xl font-bold tracking-tight hover:text-[#327D81] transition-colors">
                    GlobeTrotter
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className={isActive("/dashboard")}>
                        Dashboard
                    </Link>
                    <Link href="/plan-trip" className={isActive("/plan-trip")}>
                        Plan Trip
                    </Link>
                    <Link href="/community" className={isActive("/community")}>
                        Community
                    </Link>
                    {/* New Chatbot Link */}
                    <Link href="/chat" className={`${isActive("/chat")} flex items-center gap-2 group`}>
                        <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        AI Concierge
                    </Link>
                    <Link href="/profile">
                        <div className="w-10 h-10 bg-[#327D81] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#266063] transition-colors overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-bold">
                                    {user?.email?.[0]?.toUpperCase() || "U"}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
