"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function SimpleBarChart({ data, xKey, yKey }: { data: any[], xKey: string, yKey: string; }) {
    return (
        <ResponsiveContainer width="100%" height={ 300 }>
            <BarChart data={ data }>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={ xKey } />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={ yKey } fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function SimpleRadarChart({ data }: { data: any[]; }) {
    return (
        <ResponsiveContainer width="100%" height={ 300 }>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ data }>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={ 0.6 } />
            </RadarChart>
        </ResponsiveContainer>
    );
}
