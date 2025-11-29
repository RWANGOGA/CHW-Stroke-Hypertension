"use client"

import React from "react"
import {
  BarChart as ReBarChart,
  LineChart as ReLineChart,
  AreaChart as ReAreaChart,
  PieChart as RePieChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  Area,
  Pie,
  Cell,
  ResponsiveContainer,
  TooltipProps,
} from "recharts"

// ---------------- Tooltip ----------------
type ChartData = {
  date: string
  value: number
}

export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white p-2 border rounded shadow">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-sm">{payload[0].value}</p>
    </div>
  )
}

// ---------------- Bar Chart ----------------
export function BarChart({
  data,
  color = "#3b82f6",
}: {
  data: ChartData[]
  color?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="value" fill={color} />
      </ReBarChart>
    </ResponsiveContainer>
  )
}

// ---------------- Line Chart ----------------
export function LineChart({
  data,
  color = "#ef4444",
}: {
  data: ChartData[]
  color?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
      </ReLineChart>
    </ResponsiveContainer>
  )
}

// ---------------- Area Chart ----------------
export function AreaChart({
  data,
  color = "#8b5cf6",
}: {
  data: ChartData[]
  color?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <ReAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="value" stroke={color} fill={color + "33"} />
      </ReAreaChart>
    </ResponsiveContainer>
  )
}

// ---------------- Pie Chart ----------------
export function PieChart({
  data,
  colors = ["#3b82f6", "#ef4444", "#8b5cf6"],
}: {
  data: { name: string; value: number }[]
  colors?: string[]
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <RePieChart>
        <Tooltip content={<ChartTooltip />} />
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={60}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  )
}

// ---------------- Additional exports for compatibility ----------------
export function ChartContainer(props: any) {
  return <div {...props} />;
}

export function ChartTooltipContent(props: any) {
  return <ChartTooltip {...props} />;
}