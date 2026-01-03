'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Custom Palette: Teal, Navy, Orange, Gold, Lighter Teal
const COLORS = ['#327D81', '#13294B', '#F97316', '#EAB308', '#5BB5B9'];

export default function AdminPieChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#13294B]/50 font-medium italic">
                No destination data available yet.
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#13294B',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-sans)',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ color: '#fff' }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}
