import { Playfair_Display, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

// 1. Setup the "Editorial" Serif Font for Headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// 2. Setup the Clean Sans Font for Body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata = {
  title: "Globe Trotter | Design Your Journey",
  description: "Experience the world with personalized travel planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 3. Inject both variables into the body */}
      <body className={`${playfair.variable} ${dmSans.variable} font-sans antialiased bg-[#F4F6EF]`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}