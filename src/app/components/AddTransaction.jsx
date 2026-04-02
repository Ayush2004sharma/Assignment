"use client";
import { useState } from "react";
import { PlusCircle, Calendar, Tag, DollarSign } from "lucide-react"; // Install lucide-react if you haven't

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
    <div className="bg-white p-8 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">Quick Add</h3>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Date Input */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm text-gray-700"
              required
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm text-gray-700 font-semibold"
              required
            />
          </div>
        </div>

        {/* Category Input */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Groceries"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm text-gray-700"
              required
            />
          </div>
        </div>

        {/* Custom Segmented Toggle instead of Select */}
        <div className="relative">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Type</label>
          <div className="flex p-1 bg-gray-100 rounded-xl h-[46px]">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "expense" })}
              className={`flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                form.type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "income" })}
              className={`flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                form.type === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        <button className="md:col-span-4 group relative w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98] overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Confirm Transaction
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </form>
    </div>
  );
}