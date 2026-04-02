"use client";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Modern vibrant color palette
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"];

export default function SpendingPieChart({ data }) {
  const totalSpent = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    // Added: dark:bg-gray-900 and dark:border-gray-800
    <div className="bg-white dark:bg-gray-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 dark:border-gray-800 flex flex-col h-full transition-colors duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Spending Breakdown</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Top expense categories this month</p>
      </div>

      <div className="relative flex-grow min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
              // Updated: Tooltip background and text for dark mode
              contentStyle={{
                backgroundColor: "var(--tw-content-bg, #ffffff)", // Hum CSS variable use kar sakte hain ya logic
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
              // Dark mode support for tooltip container via className (Tailwind v4)
              wrapperClassName="dark:!bg-gray-800 dark:!border-gray-700"
              itemStyle={{ color: "var(--tw-text-color)" }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              cornerRadius={10}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label: Added dark:text-white */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-gray-800 dark:text-white transition-colors">
            ₹{totalSpent.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold">
            Total Spent
          </span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {data.slice(0, 4).map((entry, index) => (
          <div key={entry.category} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-20">{entry.category}</span>
            </div>
            <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
              ₹{entry.value.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}