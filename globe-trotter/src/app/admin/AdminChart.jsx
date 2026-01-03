'use client'

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminChart_Client({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    tick={{ fill: '#13294B', fontSize: 12, fontFamily: 'var(--font-dm)' }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                />
                <Tooltip
                    cursor={{ fill: '#F4F6EF' }}
                    contentStyle={{ backgroundColor: '#13294B', color: '#fff', border: 'none', borderRadius: '2px' }}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#327D81' : '#13294B'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
