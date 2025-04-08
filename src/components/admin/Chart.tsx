import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const data = [
    { month: "Янв", projects: 4 },
    { month: "Фев", projects: 7 },
    { month: "Мар", projects: 5 },
    { month: "Апр", projects: 8 },
    { month: "Май", projects: 12 },
    { month: "Июн", projects: 9 },
]

export function Chart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projects" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}