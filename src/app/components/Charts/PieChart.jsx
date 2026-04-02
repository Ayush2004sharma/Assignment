import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Modern vibrant color palette
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"];

export default function SpendingPieChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col h-full">
      <div>
        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Spending Breakdown</h3>
        <p className="text-xs text-gray-400 mb-4">Top expense categories this month</p>
      </div>

      <div className="relative flex-grow min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70} // Makes it a donut
              outerRadius={90}
              paddingAngle={8} // Space between segments
              cornerRadius={10} // Rounded edges for each slice
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label: Gives it that premium look */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-gray-800">$4,250</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Total Spent</span>
        </div>
      </div>

      {/* Custom Legend for better UX */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.slice(0, 4).map((entry, index) => (
          <div key={entry.category} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }} 
            />
            <span className="text-xs text-gray-500 truncate">{entry.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}