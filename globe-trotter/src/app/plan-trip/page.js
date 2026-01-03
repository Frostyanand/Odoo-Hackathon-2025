"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    MapPin, Calendar, Users, DollarSign, Plane, Hotel, Camera,
    ChevronRight, ChevronLeft, Save, Share2, Plus, X, Clock,
    Star, CheckCircle, Loader
} from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function PlanTripPage() {
    const { user } = useAuth();
    const [step, setStep] = useState(1); // 1: Form, 2: Suggestions, 3: Itinerary
    const [loading, setLoading] = useState(false);

    // Form data
    const [tripData, setTripData] = useState({
        tripName: '',
        destination: '',
        startDate: '',
        endDate: '',
        tripType: 'Friends',
        adults: 2,
        children: 0,
        budget: '50000'
    });

    // Generated suggestions
    const [suggestions, setSuggestions] = useState({
        hotels: [],
        activities: [],
        touristSpots: []
    });

    // Selected items
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedSpots, setSelectedSpots] = useState([]);

    // Final itinerary
    const [itinerary, setItinerary] = useState([]);

    // Sample data for demonstration (will be replaced with Gemini API)
    const generateSuggestions = async () => {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock data - This will be replaced with actual Gemini API call
        const mockHotels = [
            {
                id: 1,
                name: "Grand Palace Hotel",
                price: "₹3,500/night",
                rating: 4.5,
                reviews: 234,
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
                amenities: ["Pool", "Spa", "Restaurant"]
            },
            {
                id: 2,
                name: "Sunset Beach Resort",
                price: "₹5,200/night",
                rating: 4.8,
                reviews: 456,
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
                amenities: ["Beach Access", "Pool", "Gym"]
            },
            {
                id: 3,
                name: "City Center Inn",
                price: "₹2,800/night",
                rating: 4.2,
                reviews: 189,
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
                amenities: ["WiFi", "Breakfast", "Parking"]
            }
        ];

        const mockActivities = [
            {
                id: 1,
                name: "Scuba Diving Adventure",
                price: "₹4,500",
                duration: "3 hours",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"
            },
            {
                id: 2,
                name: "City Walking Tour",
                price: "₹1,200",
                duration: "2 hours",
                image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80"
            },
            {
                id: 3,
                name: "Sunset Cruise",
                price: "₹3,000",
                duration: "2.5 hours",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"
            }
        ];

        const mockSpots = [
            {
                id: 1,
                name: "Ancient Temple Complex",
                description: "Historic temple with stunning architecture",
                image: "https://images.unsplash.com/photo-1580466432736-4b4b8e99b19f?w=400&q=80"
            },
            {
                id: 2,
                name: "National Museum",
                description: "Rich cultural heritage and artifacts",
                image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&q=80"
            },
            {
                id: 3,
                name: "Botanical Gardens",
                description: "Beautiful gardens with exotic plants",
                image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80"
            }
        ];

        setSuggestions({
            hotels: mockHotels,
            activities: mockActivities,
            touristSpots: mockSpots
        });

        setLoading(false);
        setStep(2);
    };

    const generateItinerary = () => {
        const days = Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24));

        const mockItinerary = Array.from({ length: days + 1 }, (_, i) => ({
            day: i + 1,
            date: new Date(new Date(tripData.startDate).getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            activities: [
                { time: "9:00 AM", activity: "Breakfast at hotel", type: "meal" },
                { time: "10:30 AM", activity: selectedSpots[0]?.name || "City exploration", type: "sightseeing" },
                { time: "1:00 PM", activity: "Lunch at local restaurant", type: "meal" },
                { time: "3:00 PM", activity: selectedActivities[0]?.name || "Leisure time", type: "activity" },
                { time: "7:00 PM", activity: "Dinner and evening walk", type: "meal" }
            ]
        }));

        setItinerary(mockItinerary);
        setStep(3);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tripData.tripName || !tripData.destination || !tripData.startDate || !tripData.endDate) {
            alert('Please fill in all required fields!');
            return;
        }
        generateSuggestions();
    };

    return (
        <div className="min-h-screen bg-[#F4F6EF]">
            {/* Navigation Bar */}
            <Navbar />

            {/* Progress Steps */}
            <div className="bg-white border-b-2 border-[#327D81]/20 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {['Trip Details', 'Select Options', 'View Itinerary'].map((label, index) => (
                            <div key={index} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step > index + 1 ? 'bg-[#327D81] text-white' :
                                        step === index + 1 ? 'bg-[#327D81] text-white ring-4 ring-[#327D81]/20' :
                                            'bg-[#F4F6EF] text-[#13294B]/40'
                                        }`}>
                                        {step > index + 1 ? <CheckCircle size={24} /> : index + 1}
                                    </div>
                                    <span className={`mt-2 text-sm font-medium ${step >= index + 1 ? 'text-[#13294B]' : 'text-[#13294B]/40'}`}>
                                        {label}
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div className={`h-1 flex-1 mx-4 ${step > index + 1 ? 'bg-[#327D81]' : 'bg-[#13294B]/20'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step 1: Trip Details Form */}
            {step === 1 && (
                <section className="py-12 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-sm shadow-lg p-8">
                            <h1 className="font-serif text-4xl font-bold text-[#13294B] tracking-tight mb-2">
                                Create a New Trip
                            </h1>
                            <p className="text-[#13294B]/70 mb-8">Let's start planning your perfect adventure</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Trip Name */}
                                <div>
                                    <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                        <span className="text-[#327D81]">*</span> Trip Name
                                    </label>
                                    <input
                                        type="text"
                                        value={tripData.tripName}
                                        onChange={(e) => setTripData({ ...tripData, tripName: e.target.value })}
                                        placeholder="e.g., Summer Beach Vacation"
                                        className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                        required
                                    />
                                </div>

                                {/* Destination */}
                                <div>
                                    <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                        <MapPin size={18} className="text-[#327D81]" />
                                        <span className="text-[#327D81]">*</span> Destination
                                    </label>
                                    <input
                                        type="text"
                                        value={tripData.destination}
                                        onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
                                        placeholder="e.g., Goa, India"
                                        className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                        required
                                    />
                                </div>

                                {/* Dates */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                            <Calendar size={18} className="text-[#327D81]" />
                                            <span className="text-[#327D81]">*</span> Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={tripData.startDate}
                                            onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                            <Calendar size={18} className="text-[#327D81]" />
                                            <span className="text-[#327D81]">*</span> End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={tripData.endDate}
                                            onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Trip Type */}
                                <div>
                                    <label className="block text-[#13294B] font-bold mb-2">
                                        Type of Trip
                                    </label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {['Family', 'Friends', 'Couple', 'Solo'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setTripData({ ...tripData, tripType: type })}
                                                className={`py-3 px-4 rounded-sm border-2 font-medium transition-all duration-300 ${tripData.tripType === type
                                                    ? 'bg-[#327D81] text-white border-[#327D81]'
                                                    : 'bg-white text-[#13294B] border-[#13294B]/20 hover:border-[#327D81]'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Number of Travelers */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                            <Users size={18} className="text-[#327D81]" />
                                            Number of Adults
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={tripData.adults}
                                            onChange={(e) => setTripData({ ...tripData, adults: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                            <Users size={18} className="text-[#327D81]" />
                                            Number of Children
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={tripData.children}
                                            onChange={(e) => setTripData({ ...tripData, children: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                        />
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-[#13294B] font-bold mb-2 flex items-center gap-2">
                                        <DollarSign size={18} className="text-[#327D81]" />
                                        Total Budget (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={tripData.budget}
                                        onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
                                        placeholder="50000"
                                        className="w-full px-4 py-3 border-2 border-[#13294B]/20 rounded-sm focus:border-[#327D81] outline-none text-[#13294B]"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-6">
                                    <Link href="/dashboard" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            <ChevronLeft size={20} />
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader className="animate-spin" size={20} />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                Get Suggestions
                                                <ChevronRight size={20} />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 2: Suggestions */}
            {step === 2 && (
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h1 className="font-serif text-4xl font-bold text-[#13294B] tracking-tight mb-2">
                                Choose Your Preferences
                            </h1>
                            <p className="text-[#13294B]/70">Select hotels, activities, and tourist spots for your trip</p>
                        </div>

                        {/* Hotels */}
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl font-bold text-[#13294B] mb-6 flex items-center gap-3">
                                <Hotel className="text-[#327D81]" />
                                Hotel Options
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {suggestions.hotels.map((hotel) => (
                                    <div
                                        key={hotel.id}
                                        onClick={() => setSelectedHotel(hotel)}
                                        className={`bg-white rounded-sm shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedHotel?.id === hotel.id ? 'ring-4 ring-[#327D81] transform scale-105' : 'hover:shadow-xl'
                                            }`}
                                    >
                                        <div className="relative h-48">
                                            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                                            {selectedHotel?.id === hotel.id && (
                                                <div className="absolute top-4 right-4 bg-[#327D81] text-white rounded-full p-2">
                                                    <CheckCircle size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-serif text-xl font-bold text-[#13294B] mb-2">{hotel.name}</h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            className={i < Math.floor(hotel.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-[#13294B]/70">({hotel.reviews} reviews)</span>
                                            </div>
                                            <p className="text-2xl font-bold text-[#327D81] mb-3">{hotel.price}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {hotel.amenities.map((amenity, i) => (
                                                    <span key={i} className="px-2 py-1 bg-[#F4F6EF] text-xs text-[#13294B]/70 rounded-sm">
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activities */}
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl font-bold text-[#13294B] mb-6 flex items-center gap-3">
                                <Camera className="text-[#327D81]" />
                                Activities
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {suggestions.activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        onClick={() => {
                                            if (selectedActivities.find(a => a.id === activity.id)) {
                                                setSelectedActivities(selectedActivities.filter(a => a.id !== activity.id));
                                            } else {
                                                setSelectedActivities([...selectedActivities, activity]);
                                            }
                                        }}
                                        className={`bg-white rounded-sm shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedActivities.find(a => a.id === activity.id) ? 'ring-4 ring-[#327D81]' : 'hover:shadow-xl'
                                            }`}
                                    >
                                        <div className="relative h-40">
                                            <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                                            {selectedActivities.find(a => a.id === activity.id) && (
                                                <div className="absolute top-4 right-4 bg-[#327D81] text-white rounded-full p-2">
                                                    <CheckCircle size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-[#13294B] mb-2">{activity.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#327D81] font-bold">{activity.price}</span>
                                                <span className="text-sm text-[#13294B]/70 flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {activity.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tourist Spots */}
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl font-bold text-[#13294B] mb-6 flex items-center gap-3">
                                <MapPin className="text-[#327D81]" />
                                Tourist Spots
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {suggestions.touristSpots.map((spot) => (
                                    <div
                                        key={spot.id}
                                        onClick={() => {
                                            if (selectedSpots.find(s => s.id === spot.id)) {
                                                setSelectedSpots(selectedSpots.filter(s => s.id !== spot.id));
                                            } else {
                                                setSelectedSpots([...selectedSpots, spot]);
                                            }
                                        }}
                                        className={`bg-white rounded-sm shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedSpots.find(s => s.id === spot.id) ? 'ring-4 ring-[#327D81]' : 'hover:shadow-xl'
                                            }`}
                                    >
                                        <div className="relative h-40">
                                            <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                                            {selectedSpots.find(s => s.id === spot.id) && (
                                                <div className="absolute top-4 right-4 bg-[#327D81] text-white rounded-full p-2">
                                                    <CheckCircle size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-[#13294B] mb-1">{spot.name}</h3>
                                            <p className="text-sm text-[#13294B]/70">{spot.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                <ChevronLeft size={20} />
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                onClick={generateItinerary}
                                className="flex-1"
                                disabled={!selectedHotel}
                            >
                                Generate Itinerary
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 3: Itinerary */}
            {step === 3 && (
                <section className="py-12 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-sm shadow-lg p-8 mb-8">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h1 className="font-serif text-4xl font-bold text-[#13294B] tracking-tight mb-2">
                                        {tripData.tripName}
                                    </h1>
                                    <div className="flex items-center gap-6 text-[#13294B]/70">
                                        <span className="flex items-center gap-2">
                                            <MapPin size={18} className="text-[#327D81]" />
                                            {tripData.destination}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar size={18} className="text-[#327D81]" />
                                            {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Users size={18} className="text-[#327D81]" />
                                            {tripData.adults + tripData.children} travelers
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline">
                                        <Save size={20} />
                                        Save
                                    </Button>
                                    <Button variant="secondary">
                                        <Share2 size={20} />
                                        Share
                                    </Button>
                                </div>
                            </div>

                            {/* Selected Hotel Summary */}
                            {selectedHotel && (
                                <div className="bg-[#F4F6EF] rounded-sm p-6 mb-8">
                                    <h3 className="font-bold text-[#13294B] mb-3 flex items-center gap-2">
                                        <Hotel size={20} className="text-[#327D81]" />
                                        Your Accommodation
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <img src={selectedHotel.image} alt={selectedHotel.name} className="w-24 h-24 rounded-sm object-cover" />
                                        <div>
                                            <h4 className="font-bold text-[#13294B]">{selectedHotel.name}</h4>
                                            <p className="text-[#327D81] font-bold">{selectedHotel.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Day-wise Itinerary */}
                        <div className="space-y-6">
                            {itinerary.map((day) => (
                                <div key={day.day} className="bg-white rounded-sm shadow-lg overflow-hidden">
                                    <div className="bg-[#13294B] text-white px-8 py-4">
                                        <h2 className="font-serif text-2xl font-bold">Day {day.day}</h2>
                                        <p className="text-white/80">{day.date}</p>
                                    </div>
                                    <div className="p-8">
                                        <div className="space-y-4">
                                            {day.activities.map((item, index) => (
                                                <div key={index} className="flex items-start gap-4 pb-4 border-b border-[#13294B]/10 last:border-0">
                                                    <div className="w-20 text-[#327D81] font-bold flex-shrink-0">
                                                        {item.time}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[#13294B] font-medium">{item.activity}</p>
                                                        <span className="text-xs text-[#13294B]/60 capitalize">{item.type}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8">
                            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                                <ChevronLeft size={20} />
                                Modify Selections
                            </Button>
                            <Link href="/dashboard" className="flex-1">
                                <Button variant="primary" className="w-full">
                                    <CheckCircle size={20} />
                                    Confirm & Save Trip
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-[#13294B] text-white py-16 px-6 mt-12">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-white/50">© 2026 Globe Trotter. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
