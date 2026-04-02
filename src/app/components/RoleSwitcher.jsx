"use client";
import { ShieldCheck, Eye } from "lucide-react";

export default function RoleSwitcher({ role, setRole }) {
  const isAdmin = role === "admin";

  return (
    <div className="mb-6 flex justify-end items-center gap-3">
      {/* Label Update: dark:text-gray-600 */}
      <span className="text-[11px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.1em]">
        Access Level
      </span>
      
      {/* Track Update: dark:bg-gray-800 dark:border-gray-700 */}
      <div className="relative inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-inner border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        
        {/* Sliding Background Highlight Update: dark:bg-gray-700 */}
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-xl shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isAdmin ? "left-[50%]" : "left-1"
          }`}        
        />

        {/* Viewer Button */}
        <button
          onClick={() => setRole("viewer")}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors duration-200 ${
            !isAdmin 
              ? "text-indigo-600 dark:text-indigo-400" 
              : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <Eye className={`w-4 h-4 ${!isAdmin ? "animate-pulse" : ""}`} />
          Viewer
        </button>

        {/* Admin Button */}
        <button
          onClick={() => setRole("admin")}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors duration-200 ${
            isAdmin 
              ? "text-rose-600 dark:text-rose-400" 
              : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${isAdmin ? "animate-bounce" : ""}`} />
          Admin
        </button>
      </div>
    </div>
  );
}