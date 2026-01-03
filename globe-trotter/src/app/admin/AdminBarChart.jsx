'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function AdminBarChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#13294B]/50 font-medium italic">
                No trip data available yet.
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis
                    dataKey="name"
                    tick={{ fill: '#13294B', fontSize: 12, fontFamily: 'var(--font-dm)' }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                />
                <YAxis
                    tick={{ fill: '#13294B', fontSize: 12, fontFamily: 'var(--font-dm)' }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: '#F4F6EF', opacity: 0.5 }}
                    contentStyle={{
                        backgroundColor: '#13294B',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-sans)',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                />
                <Bar dataKey="trips" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#327D81" />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
