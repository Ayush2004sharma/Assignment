"use client";
import { useMemo } from "react"; // Performance ke liye
import SummaryCard from "../components/SummaryCard";
import BalanceLineChart from "../components/Charts/LineChart";
import SpendingPieChart from "../components/Charts/PieChart";
import { LayoutDashboard, Calendar, ArrowUpRight } from "lucide-react";

export default function Dashboard({ transactions = [] }) {
  
  // 1. Memoized Calculations: Taaki har click pe poora loop na chale
  const { income, expenses, balance, lineData, pieData } = useMemo(() => {
    let runningBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryMap = {};

    // Ek hi loop mein saara data process karo (O(n) complexity) - Super Fast!
    const lData = transactions.map((t) => {
      const amt = Number(t.amount) || 0;
      
      if (t.type === "income") {
        totalIncome += amt;
        runningBalance += amt;
      } else {
        totalExpenses += amt;
        runningBalance -= amt;
        // Pie chart ke liye categories map karo
        categoryMap[t.category] = (categoryMap[t.category] || 0) + amt;
      }

      return {
        date: t.date,
        balance: runningBalance,
      };
    });

    const pData = Object.entries(categoryMap).map(([category, value]) => ({
      category,
      value,
    }));

    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: runningBalance,
      lineData: lData,
      pieData: pData,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 md:p-8 lg:p-10 space-y-10">
      
      {/* Header: Title and Quick Action */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Analytics Mode</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Financely.</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-bold text-gray-600">March 2026</span>
          </div>
          
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard title="Current Balance" value={balance} type="balance" />
        <SummaryCard title="Total Earnings" value={income} type="income" />
        <SummaryCard title="Monthly Spends" value={expenses} type="expense" />
      </section>

      {/* Main Insights Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Balance Curve */}
        <div className="lg:col-span-8 bg-white p-2 rounded-[32px] shadow-sm border border-gray-50">
          <BalanceLineChart data={lineData} />
        </div>
        
        {/* Category Share */}
        <div className="lg:col-span-4 bg-white p-2 rounded-[32px] shadow-sm border border-gray-50">
          <SpendingPieChart data={pieData} />
        </div>
      </section>

      
    
    </div>
  );
}