"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Compass, Map, Users, Facebook, Twitter, Instagram } from 'lucide-react';

// Custom Button Component
const Button = ({ children, className = '', ...props }) => (
  <button
    className={`px-8 py-4 rounded-sm font-medium transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function GlobeTrotterLanding() {
  const travelersMarquee = [
    "Sarah in Patagonia", "James in Kyoto", "Maria in Santorini",
    "Alex in Iceland", "Chen in Marrakech", "Emma in Bali",
    "Lucas in Peru", "Zoe in New Zealand", "Omar in Norway"
  ];

  // Specific avatar images for the "Travel Tribe" section
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces"
  ];

  return (
    <div className="bg-[#F4F6EF] text-[#13294B] overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-1">
          <div className="col-span-5 row-span-3 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
              alt="Mountain adventure"
              className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
            />
          </div>
          <div className="col-span-4 row-span-4 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
              alt="Beach sunset"
              className="w-full h-full object-cover opacity-50 hover:opacity-75 transition-opacity duration-500"
            />
          </div>
          <div className="col-span-3 row-span-3 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80"
              alt="Tokyo streets"
              className="w-full h-full object-cover opacity-65 hover:opacity-85 transition-opacity duration-500"
            />
          </div>
          <div className="col-span-4 row-span-3 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80"
              alt="Camping friends"
              className="w-full h-full object-cover opacity-55 hover:opacity-80 transition-opacity duration-500"
            />
          </div>
          <div className="col-span-5 row-span-3 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80"
              alt="Van life"
              className="w-full h-full object-cover opacity-60 hover:opacity-85 transition-opacity duration-500"
            />
          </div>
          <div className="col-span-3 row-span-3 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"
              alt="Swiss Alps"
              className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
            />
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#13294B] bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight leading-none">
            Don't Just<br />Plan.<br />Experience.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Your journey begins where planning ends. Connect, explore, and create memories that last forever.
          </p>

          <Link href="/dashboard">
            <Button className="bg-[#327D81] hover:bg-[#266063] text-white text-lg group">
              Start Your Journey
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </div>

        {/* REMOVED: Scroll Indicator (Mouse Logo) */}
      </section>

      {/* The Vibe - Masonry Grid */}
      <section className="py-32 px-6 md:px-12">
        <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight mb-4 text-center">The Vibe</h2>
        <p className="text-center text-lg text-[#13294B]/70 mb-20 leading-relaxed">Every journey has its own energy</p>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[280px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
              alt="Mountain peak"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/80 to-transparent flex items-end p-8">
              <h3 className="font-serif text-white text-4xl font-bold tracking-tight">Adventure</h3>
            </div>
          </div>

          <div className="row-span-1 relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80"
              alt="Beach relaxation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/70 to-transparent flex items-end p-6">
              <h3 className="font-serif text-white text-2xl font-bold tracking-tight">Chill</h3>
            </div>
          </div>

          <div className="row-span-1 relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
              alt="Street food"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#327D81]/70 to-transparent flex items-end p-6">
              <h3 className="font-serif text-white text-2xl font-bold tracking-tight">Food</h3>
            </div>
          </div>

          <div className="row-span-2 relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80"
              alt="Night city"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/80 to-transparent flex items-end p-6">
              <h3 className="font-serif text-white text-3xl font-bold tracking-tight">Urban</h3>
            </div>
          </div>

          <div className="row-span-1 relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=600&q=80"
              alt="Bonfire"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#327D81]/70 to-transparent flex items-end p-6">
              <h3 className="font-serif text-white text-2xl font-bold tracking-tight">Camp</h3>
            </div>
          </div>

          <div className="col-span-2 row-span-1 relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80"
              alt="Friends laughing"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/70 to-transparent flex items-end p-8">
              <h3 className="font-serif text-white text-3xl font-bold tracking-tight">Connection</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Editorial Style */}
      <section className="py-32">
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-0 items-center mb-32">
          <div className="relative h-[600px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
              alt="Group planning trip"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-12 md:px-20 py-12 bg-white">
            <Globe className="text-[#327D81] mb-6" size={48} />
            <h3 className="font-serif text-5xl font-bold tracking-tight mb-6 leading-tight">
              Plan Together,<br />Travel Smarter
            </h3>
            <p className="text-lg leading-relaxed text-[#13294B]/70 mb-8">
              Collaborative itineraries that evolve with your crew. Vote on destinations, share ideas, and build the perfect trip without the endless group chat chaos.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#327D81] rounded-full mt-2"></div>
                <p className="leading-relaxed">Real-time collaboration with your travel squad</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#327D81] rounded-full mt-2"></div>
                <p className="leading-relaxed">Budget tracking that actually works</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#327D81] rounded-full mt-2"></div>
                <p className="leading-relaxed">Packing lists you won't forget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 - Reversed */}
        <div className="grid md:grid-cols-2 gap-0 items-center mb-32">
          <div className="px-12 md:px-20 py-12 bg-[#13294B] text-white order-2 md:order-1">
            <Compass className="text-[#327D81] mb-6" size={48} />
            <h3 className="font-serif text-5xl font-bold tracking-tight mb-6 leading-tight">
              Discover Hidden<br />Gems
            </h3>
            <p className="text-lg leading-relaxed text-white/80 mb-8">
              Stop following the crowds. Our community shares secret spots, local favorites, and off-the-beaten-path experiences that you won't find in guidebooks.
            </p>
            <Link href="/dashboard">
              <Button className="bg-[#327D81] hover:bg-[#266063] text-white">
                Explore Destinations
              </Button>
            </Link>
          </div>
          <div className="relative h-[600px] overflow-hidden order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80"
              alt="Hidden beach"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid md:grid-cols-2 gap-0 items-center">
          <div className="relative h-[600px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1200&q=80"
              alt="Friends around bonfire"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-12 md:px-20 py-12 bg-[#327D81] text-white">
            <Users className="text-white mb-6" size={48} />
            <h3 className="font-serif text-5xl font-bold tracking-tight mb-6 leading-tight">
              Find Your<br />Travel Tribe
            </h3>
            <p className="text-lg leading-relaxed text-white/90 mb-8">
              Connect with fellow adventurers who share your wanderlust. Join group trips, find travel buddies, or organize your own expeditions with like-minded explorers.
            </p>

            {/* REAL AVATARS HERE */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex -space-x-3">
                {avatars.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Traveler"
                    className="w-12 h-12 rounded-full border-2 border-[#327D81] object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-white/80">12,847 travelers worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Marquee */}
      <section className="py-20 bg-white overflow-hidden">
        <p className="text-center text-sm uppercase tracking-widest text-[#13294B]/50 mb-8">Travelers Currently Exploring</p>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...travelersMarquee, ...travelersMarquee, ...travelersMarquee].map((traveler, i) => (
            <span key={i} className="inline-flex items-center mx-8 text-2xl font-medium text-[#13294B]">
              <Map className="text-[#327D81] mr-3" size={24} />
              {traveler}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center bg-[#F4F6EF]">
        <h2 className="font-serif text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Your Next Adventure<br />Starts Here
        </h2>
        <p className="text-xl leading-relaxed text-[#13294B]/70 mb-12 max-w-2xl mx-auto">
          Join thousands of travelers who've turned their dreams into stamps on a passport.
        </p>
        <Link href="/dashboard">
          <Button className="bg-[#327D81] hover:bg-[#266063] text-white text-lg">
            Create Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#13294B] text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h3 className="font-serif text-4xl font-bold tracking-tight mb-4">Globe Trotter</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Making travel planning effortless and unforgettable since 2024.
            </p>

            {/* FIXED: Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#327D81] transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#327D81] transition-colors">
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#327D81] transition-colors">
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div>
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
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/50">
          <p>© 2026 Globe Trotter. All rights reserved. Made for adventurers, by adventurers.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}