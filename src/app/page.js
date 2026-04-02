"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, ReceiptText, Zap } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import InsightsPage from "./pages/Insights";

// API Service & Initial Data
import { api } from "./services/api";
import { mockTransactions } from "./data/mockData";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ✅ FIX: isDark state define kar di (By default light mode)
  const [isDark, setIsDark] = useState(false);

  // Dark Mode Class Toggle Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Initial Data Load
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(false); // API call simulate kar rahe hain
        const savedData = await api.getTransactions();
        if (savedData && savedData.length > 0) {
          setTransactions(savedData);
        } else {
          setTransactions(mockTransactions);
          await api.saveTransactions(mockTransactions);
        }
      } catch (error) {
        console.error("API failed:", error);
        setTransactions(mockTransactions);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  const handleUpdateTransactions = async (newTransactions) => {
    setTransactions(newTransactions);
    await api.saveTransactions(newTransactions);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Activity", icon: ReceiptText },
    { id: "insights", label: "Insights", icon: Zap },
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-950">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  return (
    // Added dark:bg-gray-950 for the main wrapper
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 transition-colors duration-300 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* ✅ Navbar ko isDark aur setIsDark pass karna zaroori hai toggle button ke liye */}
      <Navbar 
        page={page} 
        setPage={setPage} 
        role={role} 
        setRole={setRole} 
        navItems={navItems} 
        isDark={isDark} 
        setIsDark={setIsDark} 
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-32 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Dashboard mein isDark pass kiya Recharts update karne ke liye */}
            {page === "dashboard" && (
              <Dashboard transactions={transactions} isDark={isDark} />
            )}
            
            {page === "transactions" && (
              <Transactions
                transactions={transactions}
                setTransactions={handleUpdateTransactions}
                role={role}
                isDark={isDark}
              />
            )}

            {page === "insights" && (
              <InsightsPage transactions={transactions} isDark={isDark} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}