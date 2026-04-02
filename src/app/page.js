"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, ReceiptText, Zap } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import InsightsPage from "./pages/Insights";

// Data
import { mockTransactions } from "./data/mockData";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(mockTransactions);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Activity", icon: ReceiptText },
    { id: "insights", label: "Insights", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- Desktop Navbar --- */}
      <Navbar 
        navItems={navItems} 
        page={page} 
        setPage={setPage} 
        role={role} 
        setRole={setRole} 
      />

      {/* --- Content Area --- */}
      {/* pb-32 is important to avoid overlap with floating mobile nav */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-32 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            {page === "dashboard" && <Dashboard transactions={transactions} />}
            {page === "transactions" && (
              <Transactions
                transactions={transactions}
                setTransactions={setTransactions}
                role={role}
              />
            )}
            {page === "insights" && <InsightsPage transactions={transactions} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- Elevated Mobile Floating Navigation --- */}
      <div className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 w-[85%] z-[60]">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-900/90 backdrop-blur-2xl rounded-[32px] p-2.5 flex justify-around shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="relative p-4 rounded-2xl outline-none"
              >
                {active && (
                  <motion.div
                    layoutId="mobile-pill"
                    className="absolute inset-0 bg-indigo-600 rounded-[24px] shadow-lg shadow-indigo-500/40"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      active ? "text-white" : "text-gray-400"
                    }`} 
                  />
                  
                  {active && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] font-bold text-white uppercase tracking-tighter"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}