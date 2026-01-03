'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Move this back to process.env.GEMINI_API_KEY once .env.local is working correctly
const API_KEY = "AIzaSyCrhA6PDiiTK67T8QQvREeXdwaXCAuUZ_g";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateChatResponse(history, message) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Convert simplified history to Gemini format
        const chatHistory = history.map(item => ({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.parts }]
        }));

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "System Instruction: You are Globe Trotter's AI Concierge, an expert travel planner. Your goal is to create a fully personalized, day-by-day travel itinerary. \n\nBefore creating the plan, you must gather the following details from the user (ask 1-2 questions at a time so it feels like a conversation):\n1. Destination Preference (Specific city or general region)\n2. Travel Dates & Duration\n3. Budget Level (Budget, Moderate, Luxury)\n4. Who is traveling (Solo, Couple, Family, Friends)\n5. Travel Vibe/Pace (Relaxed, Packed, Adventure, Foodie, Cultural)\n\nOnce you have these details, generate a detailed itinerary with Morning, Afternoon, and Evening activities for each day." }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will act as an expert travel planner, gathering all necessary details conversationally before creating a comprehensive day-by-day itinerary." }]
                },
                ...chatHistory
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return { success: true, text };

    } catch (error) {
        console.error("Gemini API Error:", error);
        return { success: false, text: "I'm having trouble connecting to the concierge service right now. Please try again." };
    }
}
