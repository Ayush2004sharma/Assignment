"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Pass isDark as a prop from Dashboard or App
export default function BalanceLineChart({ data, isDark }) {
  return (
    // Added: dark:bg-gray-900 and dark:border-gray-800
    <div className="bg-white dark:bg-gray-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 dark:border-gray-800 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          {/* Added: dark:text-white */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Balance Trend</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">Net growth over the selected period</p>
        </div>
        {/* Adjusted green badge for dark mode visibility */}
        <div className="bg-green-50 dark:bg-emerald-500/10 text-green-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
          +12.5%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          {/* Dynamic CartesianGrid Color */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={isDark ? "#374151" : "#f0f0f0"} // Dark mode mein gray-700
          />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            // Dynamic Tick Color
            tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            // Dynamic Tick Color
            tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }}
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : '#ffffff', // Dark mode background
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
              padding: '10px',
              color: isDark ? '#ffffff' : '#000000'
            }}
            itemStyle={{ color: isDark ? '#818cf8' : '#6366f1' }} // Indigo-400 in dark
          />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#6366f1" // Line color remains consistent or you can use indigo-400
            strokeWidth={4}
            // Dot border adjusts for dark mode
            dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: isDark ? "#111827" : "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}