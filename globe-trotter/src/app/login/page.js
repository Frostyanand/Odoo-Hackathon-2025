"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

// Icons (inline SVGs to avoid extra dependencies)
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const EyeIcon = ({ open }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        {open ? (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </>
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        )}
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial mode from URL params (?mode=signup or ?mode=signin)
    const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

    // Modes: 'signin', 'signup', 'forgot_password'
    const [mode, setMode] = useState(initialMode);

    // Auth fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Profile fields (signup only)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [needsVerification, setNeedsVerification] = useState(false);

    const isSignIn = mode === "signin";
    const isForgot = mode === "forgot_password";
    const isSignUp = mode === "signup";

    // Check if email exists in database
    const checkEmailExists = async (email) => {
        try {
            const response = await fetch("/api/auth/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Email check error:", err);
            return { exists: false };
        }
    };

    // Sync user to SQLite database
    const syncUserToDatabase = async (user, provider = "google", profileData = {}) => {
        const response = await fetch("/api/auth/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                name: profileData.name || user.displayName,
                image: user.photoURL,
                provider,
                phone: profileData.phone || null,
                city: profileData.city || null,
                country: profileData.country || null,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to sync user data");
        }

        return response.json();
    };

    // Handle successful login
    const handlePostLogin = async (user, provider = "google", profileData = {}) => {
        try {
            await syncUserToDatabase(user, provider, profileData);
            router.push("/dashboard");
        } catch (err) {
            console.error("Sync Error:", err);
            throw new Error("Failed to sync account data.");
        }
    };

    // Google OAuth
    const handleGoogleAuth = async () => {
        if (!isFirebaseConfigured || !auth) {
            setError("Firebase is not configured. Please add your Firebase environment variables.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Check if user exists in our DB
            const emailCheck = await checkEmailExists(result.user.email);

            if (isSignIn && !emailCheck.exists) {
                // User trying to login but doesn't exist - guide to signup
                await signOut(auth);
                setError("No account found with this email. Please sign up first.");
                setMode("signup");
                setLoading(false);
                return;
            }

            await handlePostLogin(result.user, "google");
        } catch (err) {
            console.error(err);
            if (err.code !== "auth/popup-closed-by-user") {
                setError(err.message || "Google authentication failed");
            }
            setLoading(false);
        }
    };

    // Email/Password Auth
    const handleEmailAuth = async (e) => {
        e?.preventDefault();
        if (!isFirebaseConfigured || !auth) {
            setError("Firebase is not configured. Please add your Firebase environment variables.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            // Check if email exists in our database first
            const emailCheck = await checkEmailExists(email);

            if (isSignIn) {
                // LOGIN FLOW
                if (!emailCheck.exists) {
                    setError("No account found with this email. Please sign up first.");
                    setLoading(false);
                    return;
                }

                const result = await signInWithEmailAndPassword(auth, email, password);

                // Bypass email verification check for hackathon/demo
                // if (!result.user.emailVerified) { ... }

                await handlePostLogin(result.user, "email");
            } else {
                // SIGNUP FLOW
                if (emailCheck.exists) {
                    setError("This email is already registered. Please sign in instead.");
                    setLoading(false);
                    return;
                }

                // Validate required signup fields
                if (!name.trim()) {
                    setError("Please enter your full name.");
                    setLoading(false);
                    return;
                }

                const result = await createUserWithEmailAndPassword(auth, email, password);

                // Send verification email but allow immediate access
                await sendEmailVerification(result.user);

                await handlePostLogin(result.user, "email", {
                    name: name.trim(),
                    phone: phone.trim() || null,
                    city: city.trim() || null,
                    country: country.trim() || null,
                });
            }
        } catch (err) {
            console.error(err);

            // Friendly error messages
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please sign in.");
                setMode("signin");
            } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
                setError("Invalid email or password.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else if (err.code === "auth/user-not-found") {
                setError("No account found with this email. Please sign up first.");
            } else {
                setError(err.message || "Authentication failed.");
            }
            setLoading(false);
        }
    };

    // Forgot Password
    const handleForgotPassword = async (e) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");
        try {
            if (!isFirebaseConfigured || !auth) {
                setError("Firebase is not configured. Please add your Firebase environment variables.");
                setLoading(false);
                return;
            }
            await sendPasswordResetEmail(auth, email);
            setSuccessMsg("Reset link sent! Check your inbox.");
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to send reset email. Check if the address is correct.");
            setLoading(false);
        }
    };

    // Clear form when switching modes
    const switchMode = (newMode) => {
        setMode(newMode);
        setError("");
        setSuccessMsg("");
        if (newMode === "signin") {
            setName("");
            setPhone("");
            setCity("");
            setCountry("");
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#F4F6EF]">
            {/* Floating Background Images - Editorial Collage */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.07]">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" alt="" className="absolute top-0 right-0 w-96 h-96 object-cover rotate-12" />
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" alt="" className="absolute bottom-20 left-10 w-80 h-80 object-cover -rotate-6" />
                <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80" alt="" className="absolute top-1/3 left-1/4 w-64 h-64 object-cover rotate-3" />
            </div>

            <div className="relative z-10 min-h-screen flex">
                {/* Left Side - Immersive Hero */}
                <div className="hidden lg:flex lg:w-2/5 relative items-center justify-center p-16">
                    <div className="relative w-full h-[85vh] rounded-sm overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                            alt="Airplane window view"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/90 via-[#13294B]/40 to-transparent" />

                        {/* Quote */}
                        <div className="absolute bottom-0 left-0 right-0 p-12">
                            <div className="w-16 h-1 bg-[#327D81] mb-8"></div>
                            <blockquote className="space-y-6">
                                <p className="font-serif text-4xl italic leading-relaxed text-white tracking-tight">
                                    "Travel is the only thing you buy that makes you richer."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-white/30"></div>
                                    <cite className="text-white/80 text-sm font-sans not-italic uppercase tracking-widest">
                                        The Wanderer's Manifesto
                                    </cite>
                                </div>
                            </blockquote>
                        </div>

                        {/* Stats */}
                        <div className="absolute top-12 left-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-sm p-6 shadow-xl">
                            <div className="text-white">
                                <div className="text-4xl font-bold tracking-tight mb-1">12.8K+</div>
                                <div className="text-sm text-white/80 uppercase tracking-wider">Active Travelers</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Container */}
                <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-12 lg:px-20">
                    <div className="w-full max-w-xl">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
                            <div className="w-12 h-12 bg-[#327D81] rounded-sm flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                                <GlobeIcon />
                            </div>
                            <div>
                                <div className="text-2xl font-bold tracking-tight text-[#13294B] group-hover:text-[#327D81] transition-colors">
                                    Globe Trotter
                                </div>
                                <div className="text-xs uppercase tracking-widest text-[#13294B]/50">
                                    Travel Reimagined
                                </div>
                            </div>
                        </Link>

                        {/* Verification Screen */}
                        {needsVerification ? (
                            <div className="bg-white rounded-sm p-12 shadow-lg">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-[#327D81]/10 text-[#327D81] rounded-sm flex items-center justify-center mx-auto mb-8 shadow-inner">
                                        <MailIcon />
                                    </div>
                                    <h1 className="font-serif text-5xl font-bold text-[#13294B] mb-6 tracking-tight">
                                        Check Your Inbox
                                    </h1>
                                    <div className="w-20 h-1 bg-[#327D81] mx-auto mb-8"></div>
                                    <p className="text-[#13294B]/70 mb-4 text-lg leading-relaxed">
                                        We've sent a verification link to
                                    </p>
                                    <p className="text-[#327D81] font-bold text-xl mb-10">{email}</p>
                                    <p className="text-[#13294B]/60 text-sm leading-relaxed mb-12">
                                        Please click the link in your email to verify your account and start your journey.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setNeedsVerification(false);
                                            switchMode("signin");
                                        }}
                                        className="w-full bg-[#327D81] hover:bg-[#266063] text-white font-semibold py-5 rounded-sm transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Back to Sign In
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-sm shadow-2xl p-10 lg:p-14">
                                {/* Header */}
                                <div className="mb-10">
                                    {isForgot && (
                                        <button
                                            onClick={() => switchMode("signin")}
                                            className="flex items-center gap-2 text-sm text-[#13294B]/60 hover:text-[#327D81] mb-8 transition-colors group font-medium"
                                        >
                                            <span className="group-hover:-translate-x-1 transition-transform">
                                                <ArrowLeftIcon />
                                            </span>
                                            Back to Sign In
                                        </button>
                                    )}

                                    <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#13294B] mb-4 tracking-tight leading-tight">
                                        {isForgot ? "Reset Password" : isSignIn ? "Welcome Back" : "Join the Journey"}
                                    </h1>
                                    <div className="w-16 h-1 bg-[#327D81] mb-6"></div>
                                    <p className="text-[#13294B]/60 text-lg leading-relaxed">
                                        {isForgot
                                            ? "Enter your email and we'll send you instructions to reset your password"
                                            : isSignIn
                                                ? "Sign in to continue planning your next adventure"
                                                : "Create an account and start exploring the world"}
                                    </p>
                                </div>

                                {/* Error/Success Alerts */}
                                {error && (
                                    <div className="mb-8 p-5 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm leading-relaxed">
                                        {error}
                                    </div>
                                )}
                                {successMsg && (
                                    <div className="mb-8 p-5 bg-green-50 border-l-4 border-green-500 text-green-800 text-sm leading-relaxed">
                                        {successMsg}
                                    </div>
                                )}

                                {isForgot ? (
                                    /* Forgot Password Form */
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#13294B] mb-3 uppercase tracking-wider">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword(e)}
                                                className="w-full px-5 py-4 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                placeholder="explorer@globetrotter.com"
                                                required
                                            />
                                        </div>
                                        <button
                                            onClick={handleForgotPassword}
                                            disabled={loading}
                                            className="w-full bg-[#327D81] hover:bg-[#266063] text-white font-bold py-4 rounded-sm transition-all disabled:opacity-60 flex items-center justify-center shadow-lg hover:shadow-xl"
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                "Send Reset Link"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    /* Login/Signup Forms */
                                    <>
                                        {/* Google Button */}
                                        <button
                                            onClick={handleGoogleAuth}
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white border-2 border-[#13294B]/10 rounded-sm text-[#13294B] font-semibold hover:border-[#327D81] hover:bg-[#F4F6EF] transition-all disabled:opacity-60 shadow-md hover:shadow-lg group"
                                        >
                                            <GoogleIcon />
                                            <span className="group-hover:text-[#327D81] transition-colors">
                                                Continue with Google
                                            </span>
                                        </button>

                                        {/* Divider */}
                                        <div className="relative my-8">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t-2 border-[#13294B]/10" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-6 text-[#13294B]/50 uppercase tracking-widest text-xs font-bold">
                                                    or continue with email
                                                </span>
                                            </div>
                                        </div>

                                        {/* Email/Password Form */}
                                        <div className="space-y-5">
                                            {/* Name field - Signup only */}
                                            {isSignUp && (
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#13294B] mb-2 uppercase tracking-wider">
                                                        Full Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full px-5 py-4 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                        placeholder="Your full name"
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-semibold text-[#13294B] mb-2 uppercase tracking-wider">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-5 py-4 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                    placeholder="explorer@globetrotter.com"
                                                    required
                                                />
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="block text-sm font-semibold text-[#13294B] uppercase tracking-wider">
                                                        Password
                                                    </label>
                                                    {isSignIn && (
                                                        <button
                                                            type="button"
                                                            onClick={() => switchMode("forgot_password")}
                                                            className="text-sm text-[#327D81] hover:text-[#266063] font-semibold transition-colors uppercase tracking-wider"
                                                        >
                                                            Forgot?
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleEmailAuth(e)}
                                                        className="w-full px-5 py-4 pr-14 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                        placeholder="••••••••"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#13294B]/40 hover:text-[#327D81] transition-colors"
                                                    >
                                                        <EyeIcon open={showPassword} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Profile fields - Signup only */}
                                            {isSignUp && (
                                                <>
                                                    <div className="pt-4 border-t border-[#13294B]/10">
                                                        <p className="text-sm text-[#13294B]/50 mb-4 uppercase tracking-wider font-semibold">
                                                            Optional Profile Info
                                                        </p>
                                                    </div>

                                                    {/* Phone */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-[#13294B] mb-2 uppercase tracking-wider">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            className="w-full px-5 py-4 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                            placeholder="+1 (555) 123-4567"
                                                        />
                                                    </div>

                                                    {/* City & Country */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-semibold text-[#13294B] mb-2 uppercase tracking-wider">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={city}
                                                                onChange={(e) => setCity(e.target.value)}
                                                                className="w-full px-5 py-4 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                                placeholder="New York"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-semibold text-[#13294B] mb-2 uppercase tracking-wider">
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={country}
                                                                onChange={(e) => setCountry(e.target.value)}
                                                                className="w-full px-5 py-4 bg-[#F4F6EF] border-2 border-[#13294B]/10 rounded-sm focus:outline-none focus:border-[#327D81] focus:bg-white text-[#13294B] placeholder-[#13294B]/40 transition-all"
                                                                placeholder="United States"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                onClick={handleEmailAuth}
                                                disabled={loading}
                                                className="w-full bg-[#327D81] hover:bg-[#266063] text-white font-bold py-4 rounded-sm transition-all disabled:opacity-60 flex items-center justify-center shadow-lg hover:shadow-xl mt-6"
                                            >
                                                {loading ? (
                                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : isSignIn ? (
                                                    "Sign In"
                                                ) : (
                                                    "Create Account"
                                                )}
                                            </button>
                                        </div>

                                        {/* Toggle Sign In/Up */}
                                        <div className="mt-10 pt-8 border-t-2 border-[#13294B]/5 text-center">
                                            <p className="text-[#13294B]/60 text-base">
                                                {isSignIn ? "Don't have an account? " : "Already have an account? "}
                                                <button
                                                    onClick={() => switchMode(isSignIn ? "signup" : "signin")}
                                                    className="text-[#327D81] font-bold hover:text-[#266063] transition-colors uppercase tracking-wider text-sm"
                                                >
                                                    {isSignIn ? "Sign up now" : "Log in"}
                                                </button>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Trust Indicators */}
                        <div className="mt-12 flex items-center justify-center gap-8 text-[#13294B]/40 text-xs uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Secure
                            </span>
                            <span>•</span>
                            <span>Encrypted</span>
                            <span>•</span>
                            <span>Private</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}