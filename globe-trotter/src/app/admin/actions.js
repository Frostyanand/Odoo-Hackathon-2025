'use server'

import prisma from "@/lib/prisma";

const db = prisma;

export async function getAdminStats() {
    // MOCK AUTHENTICATION for Demo/Hackathon
    const user = {
        emailAddresses: [{ emailAddress: "admin@globetrotter.com" }]
    };

    const ADMIN_EMAILS = ["admin@globetrotter.com"];

    if (!user || !user.emailAddresses[0].emailAddress || !ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress)) {
        return null;
    }

    // 1. Fetch Basic KPIs
    const totalUsers = await db.user.count();
    const totalTrips = await db.trip.count();

    // 1b. Calculate Revenue (Sum of Budgets)
    const revenueAgg = await db.trip.aggregate({
        _sum: {
            budget: true
        }
    });
    const totalRevenue = revenueAgg._sum.budget || 0;

    // 2. Fetch Recent Itineraries
    const recentTrips = await db.trip.findMany({
        take: 5,
        include: {
            user: true
        }
        // Note: No 'orderBy' because schema lacks createdAt. 
        // Ideally we would sort by `startDate` or similar if appropriate.
    });

    // 3. Trending Destinations (for Pie Chart)
    const stops = await db.stop.findMany({ select: { city: true } });
    const cityCounts = {};
    stops.forEach(s => {
        cityCounts[s.city] = (cityCounts[s.city] || 0) + 1;
    });

    const topCities = Object.entries(cityCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

    // 4. Trips per Month (for Bar Chart)
    // Since we don't have createdAt, we use startDate.
    // We fetch all trips (or last 12 months) and aggregate manually in JS 
    // because SQLite/Prisma date grouping can be tricky without raw queries.
    const allTrips = await db.trip.findMany({
        select: { startDate: true }
    });

    const months = {};
    allTrips.forEach(trip => {
        const date = new Date(trip.startDate);
        const key = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb"
        months[key] = (months[key] || 0) + 1;
    });

    // Convert to array for Recharts
    // Note: This simple method doesn't sort months chronologically if data spans years
    // But for a Hackathon demo it's usually sufficient.
    const monthlyData = Object.entries(months).map(([name, trips]) => ({ name, trips }));

    return {
        totalUsers,
        totalTrips,
        totalRevenue,
        recentTrips,
        topCities,
        monthlyData
    };
}
