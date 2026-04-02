"use client";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SummaryCard({ title, value, type }) {
  // Config mein dark mode specific classes add kar di hain
  const config = {
    income: {
      bg: "bg-emerald-50/50 dark:bg-emerald-500/10",
      iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      icon: ArrowUpRight,
      trend: "+8.2% vs last month",
      glow: "group-hover:shadow-emerald-200/40 dark:group-hover:shadow-emerald-900/20"
    },
    expense: {
      bg: "bg-rose-50/50 dark:bg-rose-500/10",
      iconBg: "bg-rose-100 dark:bg-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      icon: ArrowDownRight,
      trend: "+12.4% vs last month",
      glow: "group-hover:shadow-rose-200/40 dark:group-hover:shadow-rose-900/20"
    },
    balance: {
      bg: "bg-indigo-50/50 dark:bg-indigo-500/10",
      iconBg: "bg-indigo-100 dark:bg-indigo-500/20",
      text: "text-indigo-600 dark:text-indigo-400",
      icon: Wallet,
      trend: "Total available funds",
      glow: "group-hover:shadow-indigo-200/40 dark:group-hover:shadow-indigo-900/20"
    }
  };

  const style = config[type] || config.balance;
  const Icon = style.icon;

  return (
    // Added: dark:bg-gray-900 aur dark:border-gray-800
    <div className={`group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ${style.glow}`}>
      
      {/* Top Row: Icon & Trend */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${style.iconBg} ${style.text} transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text} opacity-80`}>
            {type === 'balance' ? 'Live Status' : 'Monthly'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-1">
        {/* Added: dark:text-gray-500 */}
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
          {title}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-black tracking-tight ${style.text}`}>
            ₹{value.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Bottom Row: Trend Description */}
      {/* Added: dark:border-gray-800 */}
      <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center gap-2">
        <div className={`flex items-center text-[11px] font-semibold ${style.text}`}>
          {style.trend}
        </div>
      </div>

      {/* Subtle Background Shape */}
      {/* Isme config se dynamic bg aur opacity-20 (for dark) use ho rahi hai */}
      <div className={`absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-[0.03] dark:opacity-[0.1] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity ${style.bg}`} />
    </div>
  );
}