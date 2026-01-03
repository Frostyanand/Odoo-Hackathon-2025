"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, User, Loader2 } from "lucide-react"
import { generateChatResponse } from "./actions"
import Navbar from "@/components/ui/navbar"

export default function ConciergePage() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef(null)

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Initial Greeting
    useEffect(() => {
        if (messages.length === 0) {
            setTimeout(() => {
                setMessages([{ role: "model", text: "Welcome to Globe Trotter. I'm your personal travel editor. To get started, tell me: What kind of vibe are you looking for in your next trip? (Adventure, Relaxing, Foodie...)" }])
            }, 500)
        }
    }, [])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMsg = input.trim()
        setInput("")
        setMessages(prev => [...prev, { role: "user", text: userMsg }])
        setIsLoading(true)

        // Prepare history for server action (simplified format)
        const history = messages.map(m => ({ role: m.role, parts: m.text }))

        try {
            const response = await generateChatResponse(history, userMsg)

            if (response.success && response.text) {
                setMessages(prev => [...prev, { role: "model", text: response.text }])
            } else {
                setMessages(prev => [...prev, { role: "model", text: "I apologize, but I couldn't process that request. Could you try again?" }])
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", text: "Something went wrong. Please check your connection." }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-[#F4F6EF] font-sans text-[#13294B] overflow-hidden">
            <Navbar />

            {/* Header */}
            <header className="flex-none p-6 border-b border-[#13294B]/10 bg-[#F4F6EF] z-10 flex items-center justify-center relative">
                <Sparkles className="w-5 h-5 text-[#327D81] absolute left-6" />
                <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">AI Travel Concierge</h1>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 pb-24" ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                                {/* Icons */}
                                <div className={`flex-none w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-[#13294B] text-white" : "bg-white border border-[#13294B]/10 text-[#327D81]"}`}>
                                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`p-4 rounded-sm shadow-sm text-base leading-relaxed ${msg.role === "user"
                                        ? "bg-[#327D81] text-white rounded-tr-none"
                                        : "bg-white text-[#13294B] border border-[#13294B]/5 rounded-tl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex w-full justify-start"
                    >
                        <div className="flex gap-3 items-center ml-11">
                            <div className="bg-white px-4 py-3 rounded-sm shadow-sm border border-[#13294B]/5 rounded-tl-none flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-[#327D81]" />
                                <span className="text-sm text-[#13294B]/60 italic">Concierge is thinking...</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="flex-none p-4 md:p-6 bg-[#F4F6EF] border-t border-[#13294B]/10">
                <div className="max-w-4xl mx-auto relative flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your answer..."
                        className="flex-1 bg-white border border-[#13294B]/20 rounded-sm px-4 py-3 focus:outline-none focus:border-[#327D81] focus:ring-1 focus:ring-[#327D81] placeholder:text-[#13294B]/40 text-[#13294B]"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-[#327D81] hover:bg-[#286669] text-white px-6 rounded-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span>Send</span>
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    )
}
