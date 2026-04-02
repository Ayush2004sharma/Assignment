"use client";
import { useState, useMemo } from "react";
import { 
  Trash2, ArrowUpCircle, ArrowDownCircle, 
  Calendar, Tag, LayoutGrid, ChevronUp, ChevronDown 
} from "lucide-react";

export default function TransactionTable({ transactions, role, onDelete }) {
  const isAdmin = role === "admin";
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'asc' 
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        if (sortConfig.key === 'amount') {
          return sortConfig.direction === 'asc' 
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    // Added dark:bg-gray-900 and dark:border-gray-800
    <div className="bg-white dark:bg-gray-900 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
      
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/50">
        <h3 className="font-bold text-gray-800 dark:text-white tracking-tight">Recent Activity</h3>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-sm border dark:border-gray-800">
          {transactions.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Table Header Row */}
            <tr className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50/50 dark:bg-gray-800/30">
              
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all group/head"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center gap-2">
                  <span>Date</span>
                  <div className={`transition-opacity ${sortConfig.key === 'date' ? 'opacity-100' : 'opacity-0 group-hover/head:opacity-50'}`}>
                    {sortConfig.key === 'date' && sortConfig.direction === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                </div>
              </th>

              <th className="px-6 py-4">Transaction</th>

              <th 
                className="px-6 py-4 cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all group/head"
                onClick={() => requestSort('amount')}
              >
                <div className="flex items-center gap-2">
                  <span>Amount</span>
                  <div className={`transition-opacity ${sortConfig.key === 'amount' ? 'opacity-100' : 'opacity-0 group-hover/head:opacity-50'}`}>
                    {sortConfig.key === 'amount' && sortConfig.direction === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                </div>
              </th>

              <th className="px-6 py-4">Type</th>
              {isAdmin && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 opacity-30 dark:opacity-20">
                    <LayoutGrid className="w-12 h-12 text-gray-400" />
                    <p className="text-sm font-medium text-gray-400">No history found</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedTransactions.map((tx, index) => (
                <tr key={index} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                      {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-sm transition-all">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200 capitalize">{tx.category}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`text-sm font-black ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {tx.type === "income" ? "+" : "-"} ₹{Number(tx.amount).toLocaleString()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      tx.type === "income" 
                        ? "bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
                        : "bg-rose-100/50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400"
                    }`}>
                      {tx.type === "income" ? <ArrowUpCircle className="w-3 h-3" /> : <ArrowDownCircle className="w-3 h-3" />}
                      {tx.type}
                    </div>
                  </td>

                  {isAdmin && (
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDelete(index)}
                        className="p-2 text-gray-300 dark:text-gray-600 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}