"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowUpDown, Layers, Plus, MapPin, Calendar, Users as UsersIcon, ChevronRight } from 'lucide-react';
import { useAuth } from "@/context/AuthContext"; // Integrated Auth

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const { user } = useAuth(); // Get authenticated user
    const [searchQuery, setSearchQuery] = useState('');

    // Regional destinations data
    const regions = [
        {
            id: 1,
            name: "Mediterranean",
            location: "Greece & Italy",
            image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
            trips: 234
        },
        {
            id: 2,
            name: "East Asia",
            location: "Japan & Korea",
            image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
            trips: 189
        },
        {
            id: 3,
            name: "Safari Adventure",
            location: "Kenya & Tanzania",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
            trips: 156
        },
        {
            id: 4,
            name: "Amazon Explorer",
            location: "Brazil & Peru",
            image: "https://images.unsplash.com/photo-1516690553505-71a6d81a4a8c?w=800&q=80",
            trips: 142
        },
        {
            id: 5,
            name: "Northern Lights",
            location: "Iceland & Norway",
            image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&q=80",
            trips: 198
        }
    ];

    // Previous trips data
    const previousTrips = [
        {
            id: 1,
            title: "Tokyo Night Life",
            location: "Tokyo, Japan",
            date: "Dec 2025",
            members: 4,
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
            status: "Completed"
        },
        {
            id: 2,
            title: "Maldives Paradise",
            location: "Maldives",
            date: "Nov 2025",
            members: 2,
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
            status: "Completed"
        },
        {
            id: 3,
            title: "Alps Hiking",
            location: "Switzerland",
            date: "Oct 2025",
            members: 6,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
            status: "Completed"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F4F6EF]">
            {/* Navigation Bar */}
            <nav className="bg-[#13294B] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="font-serif text-3xl font-bold tracking-tight hover:text-[#327D81] transition-colors">
                        GlobeTrotter
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-[#327D81] border-b-2 border-[#327D81] pb-1 font-medium">
                            Dashboard
                        </Link>
                        <Link href="/plan-trip" className="hover:text-[#327D81] transition-colors font-medium">
                            Plan Trip
                        </Link>
                        <Link href="/community" className="hover:text-[#327D81] transition-colors font-medium">
                            Community
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

            {/* Hero Banner with Search */}
            <section className="relative h-[400px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
                    alt="Travel Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#13294B]/50"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                    <h1 className="font-serif text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight text-center">
                        Where to next, {user?.displayName?.split(' ')[0] || "Explorer"}?
                    </h1>

                    {/* Search Bar */}
                    <div className="w-full max-w-4xl bg-white rounded-sm shadow-2xl p-2 flex items-center gap-4">
                        <div className="flex-1 flex items-center gap-3 px-4">
                            <Search className="text-[#13294B]/50" size={24} />
                            <input
                                type="text"
                                placeholder="Search destinations, trips, or experiences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 outline-none text-lg text-[#13294B] placeholder:text-[#13294B]/40"
                            />
                        </div>

                        <div className="flex items-center gap-2 border-l border-[#13294B]/10 pl-4">
                            <Button variant="outline" className="text-sm">
                                <Layers size={18} />
                                Group by
                            </Button>
                            <Button variant="outline" className="text-sm">
                                <SlidersHorizontal size={18} />
                                Filter
                            </Button>
                            <Button variant="outline" className="text-sm">
                                <ArrowUpDown size={18} />
                                Sort by
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Regional Selections */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="font-serif text-5xl font-bold tracking-tight text-[#13294B] mb-2">
                                Top Regional Selections
                            </h2>
                            <p className="text-lg text-[#13294B]/70 leading-relaxed">
                                Discover curated destinations from around the world
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {regions.map((region) => (
                            <div
                                key={region.id}
                                className="group relative bg-white rounded-sm shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={region.image}
                                        alt={region.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/90 via-[#13294B]/40 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="font-serif text-2xl font-bold mb-1 tracking-tight">
                                            {region.name}
                                        </h3>
                                        <p className="text-sm text-white/90 flex items-center gap-1 mb-2">
                                            <MapPin size={14} />
                                            {region.location}
                                        </p>
                                        <p className="text-xs text-white/70">
                                            {region.trips} trips planned
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 bg-[#327D81] text-white px-3 py-1 rounded-sm text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Previous Trips */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="font-serif text-5xl font-bold tracking-tight text-[#13294B] mb-2">
                                Previous Trips
                            </h2>
                            <p className="text-lg text-[#13294B]/70 leading-relaxed">
                                Relive your adventures and memories
                            </p>
                        </div>

                        <Link href="/trips">
                            <button className="text-[#327D81] hover:text-[#266063] font-semibold flex items-center gap-2 group">
                                View All
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {previousTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="group bg-[#F4F6EF] rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={trip.image}
                                        alt={trip.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-sm text-xs font-bold text-[#13294B]">
                                        {trip.status}
                                    </div>
                                </div>

                                <div className="p-6 bg-white">
                                    <h3 className="font-serif text-2xl font-bold text-[#13294B] mb-2 tracking-tight">
                                        {trip.title}
                                    </h3>

                                    <div className="space-y-2 text-sm text-[#13294B]/70">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} className="text-[#327D81]" />
                                            {trip.location}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar size={16} className="text-[#327D81]" />
                                            {trip.date}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <UsersIcon size={16} className="text-[#327D81]" />
                                            {trip.members} travelers
                                        </p>
                                    </div>

                                    <button className="mt-6 w-full bg-[#F4F6EF] hover:bg-[#327D81] hover:text-white text-[#13294B] py-2 rounded-sm font-medium transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floating Action Button - Plan a Trip */}
            <Link href="/plan-trip">
                <button className="fixed bottom-8 right-8 bg-[#327D81] hover:bg-[#266063] text-white px-8 py-4 rounded-sm shadow-2xl font-bold text-lg flex items-center gap-3 group transition-all duration-300 hover:scale-105 z-40">
                    <Plus size={24} />
                    Plan a Trip
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>

            {/* Footer */}
            <footer className="bg-[#13294B] text-white py-16 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <h3 className="font-serif text-4xl font-bold tracking-tight mb-4">Globe Trotter</h3>
                        <p className="text-white/70 leading-relaxed mb-6">
                            Making travel planning effortless and unforgettable since 2024.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Explore</h4>
                        <ul className="space-y-3 text-white/70">
                            <li className="hover:text-white transition-colors cursor-pointer">Destinations</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Travel Guides</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Community</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Company</h4>
                        <ul className="space-y-3 text-white/70">
                            <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Terms</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-white/50">
                    <p>© 2026 Globe Trotter. All rights reserved. Made for adventurers, by adventurers.</p>
                </div>
            </footer>
        </div>
    );
}
