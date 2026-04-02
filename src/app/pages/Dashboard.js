"use client";
import { useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import BalanceLineChart from "../components/Charts/LineChart";
import SpendingPieChart from "../components/Charts/PieChart";
import { LayoutDashboard, Calendar, ArrowUpRight } from "lucide-react";
import { exportToCSV, exportToJSON } from "../lib/export";

// ✅ added isDark prop here
export default function Dashboard({ transactions = [], isDark }) {
  
  const { income, expenses, balance, lineData, pieData } = useMemo(() => {
    let runningBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryMap = {};

    const lData = transactions.map((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") {
        totalIncome += amt;
        runningBalance += amt;
      } else {
        totalExpenses += amt;
        runningBalance -= amt;
        categoryMap[t.category] = (categoryMap[t.category] || 0) + amt;
      }
      return { date: t.date, balance: runningBalance };
    });

    const pData = Object.entries(categoryMap).map(([category, value]) => ({
      category,
      value,
    }));

    return { income: totalIncome, expenses: totalExpenses, balance: runningBalance, lineData: lData, pieData: pData };
  }, [transactions]);

  const handleExport = (type) => {
    const today = new Date().toISOString().split("T")[0];
    if (type === "csv") {
      exportToCSV(transactions, `financely-${today}.csv`);
    } else {
      exportToJSON(transactions, `financely-${today}.json`);
    }
  };

  return (
    // Updated: dark:bg-gray-950
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-950 p-4 md:p-8 lg:p-10 space-y-10 transition-colors duration-300">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Analytics Mode</span>
          </div>
          {/* Updated: dark:text-white */}
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Financely.</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Updated: dark:bg-gray-900 dark:border-gray-800 */}
          <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">March 2026</span>
          </div>

          <div className="relative group">
            {/* Updated: dark:bg-indigo-600 dark:hover:bg-indigo-500 */}
            <button className="bg-gray-900 dark:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-gray-200 dark:shadow-none">
              Export <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Dropdown: dark:bg-gray-900 dark:border-gray-800 */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible z-50 overflow-hidden">
              <button
                onClick={() => handleExport("csv")}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors border-b border-gray-50 dark:border-gray-800"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport("json")}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors"
              >
                Export as JSON
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard title="Current Balance" value={balance} type="balance" />
        <SummaryCard title="Total Earnings" value={income} type="income" />
        <SummaryCard title="Monthly Spends" value={expenses} type="expense" />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Updated wrappers with dark:bg-gray-900 and dark:border-gray-800 */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-900 p-4 rounded-[32px] shadow-sm border border-gray-50 dark:border-gray-800 min-h-[400px]">
          {/* ✅ Passing isDark to chart */}
          <BalanceLineChart data={lineData} isDark={isDark} />
        </div>
        <div className="lg:col-span-4 bg-white dark:bg-gray-900 p-4 rounded-[32px] shadow-sm border border-gray-50 dark:border-gray-800 min-h-[400px]">
          {/* ✅ Passing isDark to chart */}
          <SpendingPieChart data={pieData} isDark={isDark} />
        </div>
      </section>
    </div>
  );
}