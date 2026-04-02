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

  // 1. Initial Load from Persistence
// 1. Initial Load with Fallback Support
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);
        const savedData = await api.getTransactions();
        
        if (savedData && savedData.length > 0) {
          setTransactions(savedData);
        } else {
          // Case: API success but no data found (First time user)
          setTransactions(mockTransactions);
          await api.saveTransactions(mockTransactions);
        }
      } catch (error) {
        // Case: API Response fail (Server down ya error)
        console.error("API failed, loading mock data instead:", error);
        setTransactions(mockTransactions);
      } finally {
        setIsLoading(false);
      }
    };
    
    initData();
  }, []);
  // 2. Wrap setTransactions to include persistence
  const handleUpdateTransactions = async (newTransactions) => {
    // Optimistic update (UI changes immediately)
    setTransactions(newTransactions);
    // Persist to "database"
    await api.saveTransactions(newTransactions);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Activity", icon: ReceiptText },
    { id: "insights", label: "Insights", icon: Zap },
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar page={page} setPage={setPage} role={role} setRole={setRole} navItems={navItems} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-32 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {page === "dashboard" && <Dashboard transactions={transactions} />}
            
            {page === "transactions" && (
              <Transactions
                transactions={transactions}
                setTransactions={handleUpdateTransactions}
                role={role}
              />
            )}

            {page === "insights" && <InsightsPage transactions={transactions} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- Mobile Nav (Keep your existing code here) --- */}
    </div>
  );
}