"use client";
import { Search, Filter, ArrowUpCircle, ArrowDownCircle, LayoutGrid } from "lucide-react";

export default function Filters({ search, setSearch, type, setType }) {
  const types = [
    { id: "", label: "All", icon: LayoutGrid, color: "text-gray-500" },
    { id: "income", label: "Income", icon: ArrowUpCircle, color: "text-emerald-500" },
    { id: "expense", label: "Expense", icon: ArrowDownCircle, color: "text-rose-500" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
      {/* Enhanced Search Bar */}
      <div className="relative w-full md:w-1/3 group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm placeholder:text-gray-400"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-gray-200 bg-gray-50 px-1.5 font-mono text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Pill-Style Type Selector */}
      <div className="flex bg-gray-100/50 p-1 rounded-2xl w-full md:w-auto">
        {types.map((t) => {
          const Icon = t.icon;
          const isActive = type === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? t.color : "text-gray-400"}`} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Button (Visual Polish) */}
      <button className="hidden md:flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
        <Filter className="w-4 h-4" />
        Advanced
      </button>
    </div>
  );
}