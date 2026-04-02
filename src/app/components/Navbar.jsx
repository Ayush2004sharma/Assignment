"use client";
import { motion } from "framer-motion";
import { Wallet, Sun, Moon } from "lucide-react"; // Sun/Moon icons add kiye
import RoleSwitcher from "./RoleSwitcher";

export default function Navbar({ navItems, page, setPage, role, setRole, isDark, setIsDark }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => setPage("dashboard")}
            >
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none group-hover:rotate-12 transition-transform duration-300">
                <Wallet className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
                FIN<span className="text-indigo-600">FLOW</span>
              </span>
            </motion.div>

            {/* Desktop Navigation (Sliding Pill) */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/50 p-1.5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 relative">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = page === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    className={`relative flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-colors duration-300 ${
                      active 
                        ? "text-indigo-600" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white dark:bg-gray-700 shadow-sm rounded-xl z-0"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${active ? "text-indigo-600" : "text-gray-400"}`} />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section: Theme Toggle & Role Switcher */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="scale-90 md:scale-100"
            >
              <RoleSwitcher role={role} setRole={setRole} />
            </motion.div>
          </div>

        </div>
      </div>
    </nav>
  );
}