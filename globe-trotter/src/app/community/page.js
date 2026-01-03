"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search, SlidersHorizontal, ArrowUpDown, Layers, Heart, MessageCircle,
    Share2, MapPin, Calendar, User, Bookmark, TrendingUp, Clock, Filter, X,
    Plus, Upload, Image as ImageIcon
} from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function CommunityPage() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, popular, recent, following
    const [selectedGroupBy, setSelectedGroupBy] = useState('none'); // none, destination, activity, date
    const [selectedFilter, setSelectedFilter] = useState('all'); // all, adventure, food, culture, beach, mountain
    const [selectedSort, setSelectedSort] = useState('recent'); // recent, popular, trending

    const [showGroupByMenu, setShowGroupByMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);

    // Post creation states
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        location: '',
        category: 'Adventure',
        image: '',
        tags: ''
    });
    const [userPosts, setUserPosts] = useState([]);

    // Community posts data
    const communityPosts = [
        {
            id: 1,
            author: {
                name: "Witty Conure",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                username: "witty_traveler"
            },
            title: "Magical Sunrise at Angkor Wat",
            description: "Waking up at 4 AM was totally worth it! The sunrise over Angkor Wat was absolutely breathtaking. Pro tip: arrive early to get a good spot by the reflecting pool.",
            location: "Siem Reap, Cambodia",
            date: "2 days ago",
            category: "Culture",
            image: "https://images.unsplash.com/photo-1580466432736-4b4b8e99b19f?w=800&q=80",
            likes: 234,
            comments: 45,
            saves: 67,
            tags: ["temple", "sunrise", "photography"]
        },
        {
            id: 2,
            author: {
                name: "Brave Nightingale",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                username: "brave_explorer"
            },
            title: "Skydiving Over Dubai Palm Islands",
            description: "Jumped out of a plane at 13,000 feet! The view of the Palm Jumeirah was insane. If you're an adrenaline junkie, this is a must-do experience.",
            location: "Dubai, UAE",
            date: "5 days ago",
            category: "Adventure",
            image: "https://images.unsplash.com/photo-1583221773137-e1a223c8f111?w=800&q=80",
            likes: 456,
            comments: 89,
            saves: 123,
            tags: ["skydiving", "adventure", "extreme"]
        },
        {
            id: 3,
            author: {
                name: "Blissful Octopus",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
                username: "blissful_ocean"
            },
            title: "Snorkeling in the Great Barrier Reef",
            description: "Swimming with sea turtles and tropical fish in crystal clear waters. The marine life here is absolutely incredible. Highly recommend taking a guided tour!",
            location: "Queensland, Australia",
            date: "1 week ago",
            category: "Beach",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
            likes: 567,
            comments: 92,
            saves: 201,
            tags: ["snorkeling", "ocean", "wildlife"]
        },
        {
            id: 4,
            author: {
                name: "Bold Boar",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
                username: "bold_adventurer"
            },
            title: "Street Food Tour in Bangkok",
            description: "Spent an entire day eating my way through Bangkok's street food scene. From pad thai to mango sticky rice, every bite was amazing. Don't miss the night markets!",
            location: "Bangkok, Thailand",
            date: "3 days ago",
            category: "Food",
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
            likes: 389,
            comments: 76,
            saves: 145,
            tags: ["food", "street food", "culture"]
        },
        {
            id: 5,
            author: {
                name: "Lazy Wallaby",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
                username: "lazy_explorer"
            },
            title: "Hiking the Inca Trail to Machu Picchu",
            description: "4 days, 26 miles, and countless breathtaking views. Reaching Machu Picchu at sunrise was the most rewarding experience of my life. Start training early!",
            location: "Cusco, Peru",
            date: "2 weeks ago",
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
            likes: 723,
            comments: 134,
            saves: 289,
            tags: ["hiking", "mountains", "ancient ruins"]
        },
        {
            id: 6,
            author: {
                name: "Clever Penguin",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
                username: "clever_traveler"
            },
            title: "Northern Lights in Iceland",
            description: "Finally saw the Aurora Borealis dancing across the sky! Stood in freezing temperatures for 3 hours but it was absolutely worth it. Best time to visit is September-March.",
            location: "Reykjavik, Iceland",
            date: "4 days ago",
            category: "Adventure",
            image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&q=80",
            likes: 891,
            comments: 167,
            saves: 412,
            tags: ["northern lights", "iceland", "photography"]
        }
    ];

    const filterOptions = [
        { value: 'all', label: 'All Categories', icon: Layers },
        { value: 'adventure', label: 'Adventure', icon: TrendingUp },
        { value: 'food', label: 'Food & Cuisine', icon: User },
        { value: 'culture', label: 'Culture', icon: MapPin },
        { value: 'beach', label: 'Beach & Ocean', icon: User },
        { value: 'mountain', label: 'Mountain', icon: TrendingUp }
    ];

    const groupByOptions = [
        { value: 'none', label: 'No Grouping' },
        { value: 'destination', label: 'By Destination' },
        { value: 'activity', label: 'By Activity Type' },
        { value: 'date', label: 'By Date Posted' }
    ];

    const sortOptions = [
        { value: 'recent', label: 'Most Recent', icon: Clock },
        { value: 'popular', label: 'Most Popular', icon: TrendingUp },
        { value: 'trending', label: 'Trending Now', icon: TrendingUp }
    ];

    // Handle post creation
    const handleCreatePost = () => {
        if (!newPost.title || !newPost.description || !newPost.location) {
            alert('Please fill in all required fields!');
            return;
        }

        const post = {
            id: Date.now(),
            author: {
                name: user?.displayName || "Traveler",
                avatar: user?.photoURL || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                username: user?.email?.split('@')[0] || "traveler"
            },
            title: newPost.title,
            description: newPost.description,
            location: newPost.location,
            date: "Just now",
            category: newPost.category,
            image: newPost.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
            likes: 0,
            comments: 0,
            saves: 0,
            tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        setUserPosts([post, ...userPosts]);
        setShowCreatePostModal(false);
        setNewPost({
            title: '',
            description: '',
            location: '',
            category: 'Adventure',
            image: '',
            tags: ''
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPost({ ...newPost, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Combine user posts with community posts
    const allPosts = [...userPosts, ...communityPosts];

    return (
        <div className="min-h-screen bg-[#F4F6EF]">
            {/* Navigation Bar */}
            <Navbar />

            {/* Hero Section with Search */}
            <section className="bg-white border-b-2 border-[#327D81]/20 py-8 px-6 sticky top-[72px] z-40 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="font-serif text-5xl font-bold text-[#13294B] tracking-tight mb-2">
                            Community Stories
                        </h1>
                        <p className="text-lg text-[#13294B]/70 leading-relaxed">
                            Share and discover amazing travel experiences from around the world
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search Input */}
                        <div className="flex-1 w-full bg-[#F4F6EF] rounded-sm p-3 flex items-center gap-3 shadow-sm border border-[#13294B]/10">
                            <Search className="text-[#13294B]/50" size={20} />
                            <input
                                type="text"
                                placeholder="Search for destinations, activities, or experiences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 outline-none bg-transparent text-[#13294B] placeholder:text-[#13294B]/40"
                            />
                        </div>

                        {/* Filter Controls */}
                        <div className="flex gap-2 w-full md:w-auto">
                            {/* Group By */}
                            <div className="relative flex-1 md:flex-initial">
                                <Button
                                    variant={selectedGroupBy !== 'none' ? "default" : "outline"}
                                    onClick={() => {
                                        setShowGroupByMenu(!showGroupByMenu);
                                        setShowFilterMenu(false);
                                        setShowSortMenu(false);
                                    }}
                                >
                                    <Layers size={18} />
                                    Group by
                                </Button>

                                {showGroupByMenu && (
                                    <div className="absolute top-full mt-2 right-0 bg-white rounded-sm shadow-xl border border-[#13294B]/10 py-2 min-w-[200px] z-50">
                                        {groupByOptions.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSelectedGroupBy(option.value);
                                                    setShowGroupByMenu(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left hover:bg-[#F4F6EF] transition-colors ${selectedGroupBy === option.value ? 'bg-[#327D81]/10 text-[#327D81] font-semibold' : 'text-[#13294B]'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Filter */}
                            <div className="relative flex-1 md:flex-initial">
                                <Button
                                    variant={selectedFilter !== 'all' ? "default" : "outline"}
                                    onClick={() => {
                                        setShowFilterMenu(!showFilterMenu);
                                        setShowGroupByMenu(false);
                                        setShowSortMenu(false);
                                    }}
                                >
                                    <SlidersHorizontal size={18} />
                                    Filter
                                </Button>

                                {showFilterMenu && (
                                    <div className="absolute top-full mt-2 right-0 bg-white rounded-sm shadow-xl border border-[#13294B]/10 py-2 min-w-[220px] z-50">
                                        {filterOptions.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSelectedFilter(option.value);
                                                    setShowFilterMenu(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left hover:bg-[#F4F6EF] transition-colors flex items-center gap-2 ${selectedFilter === option.value ? 'bg-[#327D81]/10 text-[#327D81] font-semibold' : 'text-[#13294B]'
                                                    }`}
                                            >
                                                <option.icon size={16} />
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort By */}
                            <div className="relative flex-1 md:flex-initial">
                                <Button
                                    variant={selectedSort !== 'recent' ? "default" : "outline"}
                                    onClick={() => {
                                        setShowSortMenu(!showSortMenu);
                                        setShowGroupByMenu(false);
                                        setShowFilterMenu(false);
                                    }}
                                >
                                    <ArrowUpDown size={18} />
                                    Sort by
                                </Button>

                                {showSortMenu && (
                                    <div className="absolute top-full mt-2 right-0 bg-white rounded-sm shadow-xl border border-[#13294B]/10 py-2 min-w-[200px] z-50">
                                        {sortOptions.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSelectedSort(option.value);
                                                    setShowSortMenu(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left hover:bg-[#F4F6EF] transition-colors flex items-center gap-2 ${selectedSort === option.value ? 'bg-[#327D81]/10 text-[#327D81] font-semibold' : 'text-[#13294B]'
                                                    }`}
                                            >
                                                <option.icon size={16} />
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(selectedGroupBy !== 'none' || selectedFilter !== 'all' || selectedSort !== 'recent') && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {selectedGroupBy !== 'none' && (
                                <span className="px-3 py-1 bg-[#327D81] text-white rounded-sm text-xs font-medium flex items-center gap-2">
                                    Grouped by: {groupByOptions.find(o => o.value === selectedGroupBy)?.label}
                                    <X size={14} className="cursor-pointer hover:text-[#13294B]" onClick={() => setSelectedGroupBy('none')} />
                                </span>
                            )}
                            {selectedFilter !== 'all' && (
                                <span className="px-3 py-1 bg-[#327D81] text-white rounded-sm text-xs font-medium flex items-center gap-2">
                                    Filter: {filterOptions.find(o => o.value === selectedFilter)?.label}
                                    <X size={14} className="cursor-pointer hover:text-[#13294B]" onClick={() => setSelectedFilter('all')} />
                                </span>
                            )}
                            {selectedSort !== 'recent' && (
                                <span className="px-3 py-1 bg-[#327D81] text-white rounded-sm text-xs font-medium flex items-center gap-2">
                                    Sort: {sortOptions.find(o => o.value === selectedSort)?.label}
                                    <X size={14} className="cursor-pointer hover:text-[#13294B]" onClick={() => setSelectedSort('recent')} />
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Floating Create Post Button */}
            <button
                onClick={() => setShowCreatePostModal(true)}
                className="fixed bottom-8 right-8 bg-[#327D81] hover:bg-[#266063] text-white px-8 py-4 rounded-sm shadow-2xl font-bold text-lg flex items-center gap-3 group transition-all duration-300 hover:scale-105 z-40"
            >
                <Plus size={24} />
                Share Your Story
            </button>

            {/* Create Post Modal */}
            {showCreatePostModal && (
                <div className="fixed inset-0 bg-[#13294B]/80 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-[#13294B] text-white px-8 py-6 flex items-center justify-between z-10">
                            <h2 className="font-serif text-3xl font-bold tracking-tight">Share Your Adventure</h2>
                            <button
                                onClick={() => setShowCreatePostModal(false)}
                                className="text-white hover:text-[#327D81] transition-colors"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                    <span className="text-[#327D81]">*</span> Title
                                </label>
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    placeholder="e.g., Magical Sunrise at Angkor Wat"
                                    className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B] font-medium"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                    <span className="text-[#327D81]">*</span> Description
                                </label>
                                <textarea
                                    value={newPost.description}
                                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                                    placeholder="Share your experience, tips, and what made this moment special..."
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B] resize-none"
                                />
                            </div>

                            {/* Location and Category Row */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Location */}
                                <div>
                                    <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                        <MapPin size={18} className="text-[#327D81]" />
                                        <span className="text-[#327D81]">*</span> Location
                                    </label>
                                    <input
                                        type="text"
                                        value={newPost.location}
                                        onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                                        placeholder="e.g., Siem Reap, Cambodia"
                                        className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                        <Layers size={18} className="text-[#327D81]" />
                                        Category
                                    </label>
                                    <select
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B] font-medium cursor-pointer"
                                    >
                                        <option value="Adventure">Adventure</option>
                                        <option value="Food">Food</option>
                                        <option value="Culture">Culture</option>
                                        <option value="Beach">Beach</option>
                                        <option value="Mountain">Mountain</option>
                                    </select>
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-[#13294B] font-bold mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={newPost.tags}
                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                    placeholder="e.g., temple, sunrise, photography"
                                    className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                />
                                <p className="text-sm text-[#13294B]/60 mt-1">Separate tags with commas</p>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                    <ImageIcon size={18} className="text-[#327D81]" />
                                    Photo
                                </label>
                                <div className="border-2 border-dashed border-[#13294B]/20 rounded-sm p-8 text-center hover:border-[#327D81] transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        {newPost.image ? (
                                            <div className="space-y-3">
                                                <img
                                                    src={newPost.image}
                                                    alt="Preview"
                                                    className="max-h-64 mx-auto rounded-sm object-cover"
                                                />
                                                <p className="text-[#327D81] font-medium">Click to change image</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <Upload size={48} className="mx-auto text-[#327D81]" />
                                                <div>
                                                    <p className="text-[#13294B] font-medium mb-1">Click to upload a photo</p>
                                                    <p className="text-sm text-[#13294B]/60">JPG, PNG or WEBP (max 5MB)</p>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-[#F4F6EF] px-8 py-6 flex items-center justify-end gap-4 border-t-2 border-[#13294B]/10">
                            <Button
                                variant="ghost"
                                onClick={() => setShowCreatePostModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleCreatePost}
                                className="px-8"
                            >
                                <Plus size={20} />
                                Publish Story
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Community Feed */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {allPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#13294B]/5"
                        >
                            {/* Post Header */}
                            <div className="p-6 pb-4 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#327D81]"
                                    />
                                    <div>
                                        <h3 className="font-bold text-[#13294B] text-lg">
                                            {post.author.name}
                                        </h3>
                                        <p className="text-sm text-[#13294B]/60">@{post.author.username}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="inline-block px-3 py-1 bg-[#327D81]/10 text-[#327D81] rounded-sm text-xs font-semibold mb-1">
                                        {post.category}
                                    </span>
                                    <p className="text-xs text-[#13294B]/50 flex items-center gap-1 justify-end">
                                        <Clock size={12} />
                                        {post.date}
                                    </p>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="px-6 pb-4">
                                <h2 className="font-serif text-2xl font-bold text-[#13294B] mb-2 tracking-tight">
                                    {post.title}
                                </h2>
                                <p className="text-[#13294B]/80 leading-relaxed mb-3">
                                    {post.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-[#13294B]/60">
                                    <MapPin size={16} className="text-[#327D81]" />
                                    <span className="font-medium">{post.location}</span>
                                </div>
                            </div>

                            {/* Post Image */}
                            <div className="relative h-96 overflow-hidden bg-[#F4F6EF]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Post Footer - Engagement */}
                            <div className="p-6 pt-4 flex items-center justify-between border-t border-[#13294B]/5">
                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-2 text-[#13294B]/70 hover:text-[#327D81] transition-colors group">
                                        <Heart size={20} className="group-hover:fill-[#327D81]" />
                                        <span className="font-semibold">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#13294B]/70 hover:text-[#327D81] transition-colors">
                                        <MessageCircle size={20} />
                                        <span className="font-semibold">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#13294B]/70 hover:text-[#327D81] transition-colors group">
                                        <Bookmark size={20} className="group-hover:fill-[#327D81]" />
                                        <span className="font-semibold">{post.saves}</span>
                                    </button>
                                </div>

                                <button className="flex items-center gap-2 text-[#13294B]/70 hover:text-[#327D81] transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>

                            {/* Tags */}
                            <div className="px-6 pb-6 flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#F4F6EF] text-[#13294B]/70 rounded-sm text-xs font-medium hover:bg-[#327D81]/10 hover:text-[#327D81] cursor-pointer transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Load More Button */}
            <div className="py-12 px-6 text-center">
                <Button variant="secondary" className="px-12 py-4 text-base">
                    Load More Stories
                </Button>
            </div>

            {/* Footer */}
            <footer className="bg-[#13294B] text-white py-16 px-6 mt-12">
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
