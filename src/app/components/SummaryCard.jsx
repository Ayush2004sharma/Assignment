"use client";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SummaryCard({ title, value, type }) {
  // Setup dynamic styling based on type
  const config = {
    income: {
      bg: "bg-emerald-50/50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-600",
      icon: ArrowUpRight,
      trend: "+8.2% vs last month",
      glow: "group-hover:shadow-emerald-200/40"
    },
    expense: {
      bg: "bg-rose-50/50",
      iconBg: "bg-rose-100",
      text: "text-rose-600",
      icon: ArrowDownRight,
      trend: "+12.4% vs last month",
      glow: "group-hover:shadow-rose-200/40"
    },
    balance: {
      bg: "bg-indigo-50/50",
      iconBg: "bg-indigo-100",
      text: "text-indigo-600",
      icon: Wallet,
      trend: "Total available funds",
      glow: "group-hover:shadow-indigo-200/40"
    }
  };

  const style = config[type] || config.balance;
  const Icon = style.icon;

  return (
    <div className={`group relative bg-white border border-gray-100 rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ${style.glow}`}>
      
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
        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-500 transition-colors">
          {title}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-black tracking-tight ${style.text}`}>
            ₹{value.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Bottom Row: Trend Description */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
        <div className={`flex items-center text-[11px] font-semibold ${style.text}`}>
          {style.trend}
        </div>
      </div>

      {/* Subtle Background Shape for Depth */}
      <div className={`absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${style.bg}`} />
    </div>
  );
}