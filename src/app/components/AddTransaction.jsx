"use client";
import { useState } from "react";
import { IndianRupee, Calendar, Tag, PlusCircle } from "lucide-react";

export default function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  return (
    // Added: dark:bg-gray-900, dark:border-gray-800
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 mb-8 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
          <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">Quick Add</h3>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Date Input */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 block ml-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              // Updated: dark:bg-gray-800, dark:text-white, color-scheme support
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-sm text-gray-700 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
              required
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 block ml-1">
            Amount (INR)
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-sm text-gray-700 dark:text-white font-semibold placeholder:text-gray-400 dark:placeholder:text-gray-600"
              required
            />
          </div>
        </div>

        {/* Category Input */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 block ml-1">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
            <input
              type="text"
              placeholder="e.g. Groceries"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-sm text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
              required
            />
          </div>
        </div>

        {/* Type Toggle (Segmented Control) */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 block ml-1">Type</label>
          {/* Updated: dark:bg-gray-800 */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl h-[46px] border border-transparent dark:border-gray-700">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "expense" })}
              className={`flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                form.type === "expense" 
                  ? "bg-white dark:bg-gray-700 text-rose-600 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "income" })}
              className={`flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                form.type === "income" 
                  ? "bg-white dark:bg-gray-700 text-emerald-600 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="md:col-span-4 group relative w-full bg-gray-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-black dark:hover:bg-indigo-700 transition-all active:scale-[0.98] overflow-hidden shadow-lg dark:shadow-none">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Confirm Transaction
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </span>
          {/* Gradient Overlay for Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </form>
    </div>
  );
}