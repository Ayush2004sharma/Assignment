"use client";
import { ShieldCheck, Eye, ChevronDown } from "lucide-react";

export default function RoleSwitcher({ role, setRole }) {
  const isAdmin = role === "admin";

  return (
    <div className="mb-6 flex justify-end items-center gap-3">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
        Access Level
      </span>
      
      <div className="relative inline-flex p-1 bg-gray-100 rounded-2xl shadow-inner border border-gray-200/50">
        {/* Sliding Background Highlight */}
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isAdmin ? "left-[50%]" : "left-1"
          }`}
        />

        <button
          onClick={() => setRole("viewer")}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors duration-200 ${
            !isAdmin ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Eye className={`w-4 h-4 ${!isAdmin ? "animate-pulse" : ""}`} />
          Viewer
        </button>

        <button
          onClick={() => setRole("admin")}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors duration-200 ${
            isAdmin ? "text-rose-600" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${isAdmin ? "animate-bounce" : ""}`} />
          Admin
        </button>
      </div>
    </div>
  );
}