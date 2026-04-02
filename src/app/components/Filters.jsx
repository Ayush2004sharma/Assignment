"use client";
import { Search, Calendar, ArrowUpCircle, ArrowDownCircle, LayoutGrid, Filter } from "lucide-react";

export default function Filters({ search, setSearch, type, setType, dateFilter, setDateFilter }) {
  const types = [
    { id: "", label: "All", icon: LayoutGrid, color: "text-gray-500" },
    { id: "income", label: "Income", icon: ArrowUpCircle, color: "text-emerald-500" },
    { id: "expense", label: "Expense", icon: ArrowDownCircle, color: "text-rose-500" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
      {/* 1. Universal Search */}
      <div className="relative w-full lg:w-1/3 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500" />
        <input
          type="text"
          placeholder="Search any detail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm"
        />
      </div>

      {/* 2. Date Picker */}
      <div className="relative w-full lg:w-1/4">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm text-gray-600"
        />
        {dateFilter && (
          <button 
            onClick={() => setDateFilter("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-indigo-600 font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* 3. Type Toggle */}
      <div className="flex bg-gray-100/50 p-1 rounded-2xl w-full lg:w-auto overflow-x-auto">
        {types.map((t) => {
          const Icon = t.icon;
          const isActive = type === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? t.color : "text-gray-400"}`} />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}