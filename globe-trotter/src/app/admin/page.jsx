import { getAdminStats } from "./actions";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AdminBarChart from "./AdminBarChart";
import AdminPieChart from "./AdminPieChart";
import { Users, CreditCard, Plane, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const data = await getAdminStats();

    if (!data) {
        redirect("/");
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#F4F6EF] p-6 md:p-10 font-sans text-[#13294B]">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-[#13294B]/10 pb-6 gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13294B]/5 border border-[#13294B]/10 mb-3">
                        <Calendar className="h-3 w-3 text-[#327D81]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#13294B]/70">{currentDate}</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#13294B]">
                        Admin Panel Screen
                    </h1>
                    <p className="text-[#13294B]/60 mt-2 font-medium">
                        Welcome back, Admin. Here is what's happening today.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-[#13294B]">Live Updates</span>
                </div>
            </div>

            {/* --- KPI CARDS (Masonry Style) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <KpiCard
                    title="Total Users"
                    value={data.totalUsers.toLocaleString()}
                    icon={Users}
                    description="Active explorers on the platform"
                />
                <KpiCard
                    title="Total Trips"
                    value={data.totalTrips.toLocaleString()}
                    icon={Plane}
                    description="Itineraries created to date"
                    delay="delay-75"
                />
                <KpiCard
                    title="Total Revenue"
                    value={`₹${data.totalRevenue.toLocaleString()}`}
                    icon={CreditCard}
                    description="Gross volume from all trips"
                    delay="delay-150"
                    highlight
                />
            </div>

            {/* --- CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                {/* LEFT: Trips per Month */}
                <Card className="rounded-sm border-none shadow-xl bg-white overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-50 pb-4">
                        <CardTitle className="font-serif text-xl text-[#13294B]">Trips Created</CardTitle>
                        <CardDescription>Monthly volume based on trip start dates</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 h-[350px]">
                        <AdminBarChart data={data.monthlyData} />
                    </CardContent>
                </Card>

                {/* RIGHT: Top Cities */}
                <Card className="rounded-sm border-none shadow-xl bg-white overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-50 pb-4">
                        <CardTitle className="font-serif text-xl text-[#13294B]">Popular Destinations</CardTitle>
                        <CardDescription>Top 5 cities by stop count</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 h-[350px]">
                        <AdminPieChart data={data.topCities} />
                    </CardContent>
                </Card>
            </div>

            {/* --- RECENT ACTIVITY TABLE --- */}
            <Card className="rounded-sm border-none shadow-xl bg-white overflow-hidden">
                <CardHeader className="border-b border-gray-50 bg-[#F4F6EF]/30">
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-serif text-2xl text-[#13294B]">Recent Activity</CardTitle>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#13294B]/40">Last 5 Trips</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F4F6EF]">
                                <tr className="text-xs tracking-wider uppercase text-[#13294B]/60 font-bold">
                                    <th className="py-4 pl-6">Trip Name</th>
                                    <th className="py-4">User</th>
                                    <th className="py-4">Destination</th>
                                    <th className="py-4 pr-6 text-right">Budget</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.recentTrips.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center opacity-50 italic">No activity recorded yet.</td>
                                    </tr>
                                ) : (
                                    data.recentTrips.map((trip) => (
                                        <tr key={trip.id} className="hover:bg-[#F4F6EF]/50 transition-colors group">
                                            <td className="py-4 pl-6 font-medium font-serif text-[#13294B] group-hover:text-[#327D81] transition-colors">
                                                {trip.name}
                                            </td>
                                            <td className="py-4 text-sm text-gray-600">
                                                {trip.user?.email || "Anonymous"}
                                            </td>
                                            <td className="py-4 text-sm font-medium">
                                                {trip.destination}
                                            </td>
                                            <td className="py-4 pr-6 text-right font-mono text-[#327D81] font-bold text-sm">
                                                ₹{trip.budget.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

function KpiCard({ title, value, icon: Icon, description, delay = "", highlight = false }) {
    return (
        <div className={`p-6 rounded-sm shadow-lg border-l-4 transition-all duration-500 hover:-translate-y-1 ${highlight ? 'bg-[#13294B] text-white border-[#327D81]' : 'bg-white text-[#13294B] border-[#13294B]'
            } ${delay}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${highlight ? 'opacity-70' : 'opacity-60'}`}>
                        {title}
                    </p>
                    <h3 className="font-serif text-4xl font-bold">{value}</h3>
                </div>
                <div className={`p-3 rounded-full ${highlight ? 'bg-white/10' : 'bg-[#F4F6EF]'}`}>
                    <Icon className={`h-6 w-6 ${highlight ? 'text-[#327D81]' : 'text-[#13294B]'}`} />
                </div>
            </div>
            <p className={`text-sm ${highlight ? 'opacity-60' : 'opacity-50'}`}>
                {description}
            </p>
        </div>
    );
}
