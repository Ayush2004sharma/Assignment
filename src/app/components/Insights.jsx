"use client";
import { Lightbulb, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";

export default function Insights({ transactions }) {
  if (!transactions.length) {
    return (
      <div className="bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[28px] p-8 text-center">
        <p className="text-gray-400 font-medium italic">No insights to display yet. Add some data!</p>
      </div>
    );
  }

  const expenses = transactions.filter((t) => t.type === "expense");
  const categoryTotals = {};
  let totalSpent = 0;

  expenses.forEach((t) => {
    const amt = Number(t.amount);
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
    totalSpent += amt;
  });

  const categories = Object.keys(categoryTotals);
  if (!categories.length) return null;

  const highestCategory = categories.reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  const highestAmount = categoryTotals[highestCategory];
  const percentage = Math.round((highestAmount / totalSpent) * 100);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[32px] shadow-xl text-white relative overflow-hidden group">
      {/* Decorative Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-colors" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl">
          <Lightbulb className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-lg font-bold tracking-tight">Smart Insights</h3>
      </div>

      <div className="space-y-6">
        {/* Main Insight Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-1">
                Highest Spending
              </p>
              <h4 className="text-2xl font-bold text-white capitalize">{highestCategory}</h4>
            </div>
            <div className={`p-2 rounded-lg ${percentage > 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {percentage > 50 ? <AlertCircle className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Share of total budget</span>
              <span className="font-mono font-bold text-indigo-300">{percentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${percentage > 50 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actionable Tip */}
        <button className="w-full flex items-center justify-between group/btn text-sm font-medium text-gray-300 hover:text-white transition-colors">
          <span>View optimization tips</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}