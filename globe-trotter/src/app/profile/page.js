"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    User, Mail, Phone, MapPin, Calendar, Camera, Edit2, Save, X,
    Globe, Briefcase, Instagram, Twitter, Facebook, Settings, LogOut
} from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: "Explorer",
        username: "explorer",
        email: "explorer@globetrotter.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
        bio: "Adventure seeker and travel enthusiast. Always looking for the next destination to explore.",
        memberSince: "January 2026",
        totalTrips: 0,
        countries: 0
    });

    // Sync auth user data when available
    useEffect(() => {
        if (user) {
            setUserInfo(prev => ({
                ...prev,
                name: user.displayName || "Explorer",
                email: user.email || prev.email,
                username: user.email?.split('@')[0] || "explorer",
                // Preserve other mock fields for now as they aren't in Firebase user object
            }));
        }
    }, [user]);

    const [editedInfo, setEditedInfo] = useState(userInfo);

    // Update editedInfo when userInfo changes
    useEffect(() => {
        setEditedInfo(userInfo);
    }, [userInfo]);

    const handleSave = () => {
        setUserInfo(editedInfo);
        setIsEditing(false);
        // Here you would typically save to the backend/Prisma
    };

    const handleCancel = () => {
        setEditedInfo(userInfo);
        setIsEditing(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login?mode=signin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Preplanned trips data
    const preplannedTrips = [
        {
            id: 1,
            title: "Tokyo Adventure",
            destination: "Tokyo, Japan",
            dates: "Mar 15-25, 2026",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
            members: 3,
            status: "Planning"
        },
        {
            id: 2,
            title: "European Explorer",
            destination: "Paris, France",
            dates: "Jun 10-20, 2026",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
            members: 5,
            status: "Planning"
        },
        {
            id: 3,
            title: "Bali Retreat",
            destination: "Bali, Indonesia",
            dates: "Aug 5-15, 2026",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
            members: 2,
            status: "Planning"
        }
    ];

    // Previous trips data
    const previousTrips = [
        {
            id: 1,
            title: "Swiss Alps Hiking",
            destination: "Switzerland",
            dates: "Dec 2025",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
            members: 6,
            status: "Completed"
        },
        {
            id: 2,
            title: "Maldives Beach",
            destination: "Maldives",
            dates: "Nov 2025",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
            members: 2,
            status: "Completed"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F4F6EF]">
            {/* Navigation Bar */}
            <Navbar />

            {/* Profile Header Section */}
            <section className="bg-white border-b-4 border-[#327D81] shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#327D81] shadow-xl bg-[#F4F6EF] flex items-center justify-center">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={80} className="text-[#13294B]/30" />
                                    )}
                                </div>
                                <button className="absolute bottom-2 right-2 bg-[#327D81] hover:bg-[#266063] text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110">
                                    <Camera size={20} />
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <h1 className="font-serif text-3xl font-bold text-[#13294B] tracking-tight">
                                    {userInfo.name}
                                </h1>
                                <p className="text-[#13294B]/60 font-medium mt-1">@{userInfo.username}</p>
                                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#13294B]/70">
                                    <Calendar size={16} className="text-[#327D81]" />
                                    <span>Member since {userInfo.memberSince}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                                <div className="bg-[#F4F6EF] rounded-sm p-4 text-center">
                                    <div className="font-serif text-3xl font-bold text-[#327D81]">{userInfo.totalTrips}</div>
                                    <div className="text-sm text-[#13294B]/70 mt-1">Total Trips</div>
                                </div>
                                <div className="bg-[#F4F6EF] rounded-sm p-4 text-center">
                                    <div className="font-serif text-3xl font-bold text-[#327D81]">{userInfo.countries}</div>
                                    <div className="text-sm text-[#13294B]/70 mt-1">Countries</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6 w-full">
                                <Button variant="outline" className="flex-1 text-sm">
                                    <Settings size={18} />
                                    Settings
                                </Button>
                                <Button variant="ghost" onClick={handleLogout} className="flex-1 text-sm text-red-600 hover:bg-red-50">
                                    <LogOut size={18} />
                                    Logout
                                </Button>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-serif text-3xl font-bold text-[#13294B] tracking-tight">
                                    User Details
                                </h2>
                                {!isEditing ? (
                                    <Button variant="secondary" onClick={() => setIsEditing(true)} className="text-sm">
                                        <Edit2 size={18} />
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button variant="primary" onClick={handleSave} className="text-sm">
                                            <Save size={18} />
                                            Save
                                        </Button>
                                        <Button variant="ghost" onClick={handleCancel} className="text-sm">
                                            <X size={18} />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-[#F4F6EF] rounded-sm p-8 space-y-6">
                                {/* Email */}
                                <div className="grid md:grid-cols-3 gap-4 items-center">
                                    <div className="flex items-center gap-2 text-[#13294B]/70 font-medium">
                                        <Mail size={20} className="text-[#327D81]" />
                                        <span>Email</span>
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedInfo.email}
                                            onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                                            className="md:col-span-2 px-4 py-3 rounded-sm border-2 border-[#13294B]/20 focus:border-[#327D81] outline-none bg-white text-[#13294B]"
                                            readOnly // Prevent editing email for now
                                        />
                                    ) : (
                                        <div className="md:col-span-2 text-[#13294B] font-medium">{userInfo.email}</div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="grid md:grid-cols-3 gap-4 items-center">
                                    <div className="flex items-center gap-2 text-[#13294B]/70 font-medium">
                                        <Phone size={20} className="text-[#327D81]" />
                                        <span>Phone</span>
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedInfo.phone}
                                            onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                                            className="md:col-span-2 px-4 py-3 rounded-sm border-2 border-[#13294B]/20 focus:border-[#327D81] outline-none bg-white text-[#13294B]"
                                        />
                                    ) : (
                                        <div className="md:col-span-2 text-[#13294B] font-medium">{userInfo.phone}</div>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="grid md:grid-cols-3 gap-4 items-center">
                                    <div className="flex items-center gap-2 text-[#13294B]/70 font-medium">
                                        <MapPin size={20} className="text-[#327D81]" />
                                        <span>Location</span>
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.location}
                                            onChange={(e) => setEditedInfo({ ...editedInfo, location: e.target.value })}
                                            className="md:col-span-2 px-4 py-3 rounded-sm border-2 border-[#13294B]/20 focus:border-[#327D81] outline-none bg-white text-[#13294B]"
                                        />
                                    ) : (
                                        <div className="md:col-span-2 text-[#13294B] font-medium">{userInfo.location}</div>
                                    )}
                                </div>

                                {/* Bio */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2 text-[#13294B]/70 font-medium">
                                        <User size={20} className="text-[#327D81]" />
                                        <span>Bio</span>
                                    </div>
                                    {isEditing ? (
                                        <textarea
                                            value={editedInfo.bio}
                                            onChange={(e) => setEditedInfo({ ...editedInfo, bio: e.target.value })}
                                            rows={3}
                                            className="md:col-span-2 px-4 py-3 rounded-sm border-2 border-[#13294B]/20 focus:border-[#327D81] outline-none bg-white text-[#13294B] resize-none"
                                        />
                                    ) : (
                                        <div className="md:col-span-2 text-[#13294B] leading-relaxed">{userInfo.bio}</div>
                                    )}
                                </div>

                                {/* Social Links */}
                                <div className="pt-6 border-t-2 border-[#13294B]/10">
                                    <h3 className="font-serif text-xl font-bold text-[#13294B] mb-4 tracking-tight">
                                        Social Connections
                                    </h3>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#327D81] hover:text-white transition-all duration-300 text-[#13294B] shadow-md">
                                            <Instagram size={20} />
                                        </a>
                                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#327D81] hover:text-white transition-all duration-300 text-[#13294B] shadow-md">
                                            <Twitter size={20} />
                                        </a>
                                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#327D81] hover:text-white transition-all duration-300 text-[#13294B] shadow-md">
                                            <Facebook size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preplanned Trips Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="font-serif text-5xl font-bold tracking-tight text-[#13294B] mb-2">
                                Preplanned Trips
                            </h2>
                            <p className="text-lg text-[#13294B]/70 leading-relaxed">
                                Your upcoming adventures waiting to happen
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {preplannedTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={trip.image}
                                        alt={trip.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#327D81] text-white px-3 py-1 rounded-sm text-xs font-bold">
                                        {trip.status}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-serif text-2xl font-bold text-[#13294B] mb-2 tracking-tight">
                                        {trip.title}
                                    </h3>
                                    <div className="space-y-2 text-sm text-[#13294B]/70 mb-6">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} className="text-[#327D81]" />
                                            {trip.destination}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar size={16} className="text-[#327D81]" />
                                            {trip.dates}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <User size={16} className="text-[#327D81]" />
                                            {trip.members} travelers
                                        </p>
                                    </div>

                                    <Button variant="outline" className="w-full text-sm">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Previous Trips Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="font-serif text-5xl font-bold tracking-tight text-[#13294B] mb-2">
                                Previous Trips
                            </h2>
                            <p className="text-lg text-[#13294B]/70 leading-relaxed">
                                Memories from your past adventures
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {previousTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="group bg-[#F4F6EF] rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={trip.image}
                                        alt={trip.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white text-[#13294B] px-3 py-1 rounded-sm text-xs font-bold">
                                        {trip.status}
                                    </div>
                                </div>

                                <div className="p-6 bg-white">
                                    <h3 className="font-serif text-2xl font-bold text-[#13294B] mb-2 tracking-tight">
                                        {trip.title}
                                    </h3>
                                    <div className="space-y-2 text-sm text-[#13294B]/70 mb-6">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} className="text-[#327D81]" />
                                            {trip.destination}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar size={16} className="text-[#327D81]" />
                                            {trip.dates}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <User size={16} className="text-[#327D81]" />
                                            {trip.members} travelers
                                        </p>
                                    </div>

                                    <Button variant="outline" className="w-full text-sm">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
