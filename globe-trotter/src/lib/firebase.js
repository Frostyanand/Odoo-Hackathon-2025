// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is configured (development safety)
const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
);

let app;
let auth;

if (typeof window !== "undefined" && !isFirebaseConfigured) {
    console.warn(
        "[Globe Trotter] Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables to enable authentication."
    );
}

if (isFirebaseConfigured) {
    // Singleton Pattern: Check if an app instance already exists
    // This prevents "Firebase App named '[DEFAULT]' already exists" errors during HMR
    if (getApps().length > 0) {
        app = getApp();
    } else {
        app = initializeApp(firebaseConfig);
    }

    // Initialize Auth
    auth = getAuth(app);
} else {
    // Graceful fallback for unconfigured environments
    app = null;
    auth = null;
}

export { auth, isFirebaseConfigured };
export default app;
