"use client";
import { Trash2, ArrowUpCircle, ArrowDownCircle, Calendar, Tag } from "lucide-react";

export default function TransactionTable({ transactions, role, onDelete }) {
  const isAdmin = role === "admin";

  return (
    <div className="bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-bold text-gray-800 tracking-tight">Recent Activity</h3>
        <span className="text-xs font-medium text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
          {transactions.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              {isAdmin && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <LayoutGrid className="w-12 h-12" />
                    <p className="text-sm font-medium">No history found</p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr key={index} className="group hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-gray-700 capitalize">{tx.category}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`text-sm font-black ${tx.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                      {tx.type === "income" ? "+" : "-"} ₹{Number(tx.amount).toLocaleString()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      tx.type === "income" 
                        ? "bg-emerald-100/50 text-emerald-700" 
                        : "bg-rose-100/50 text-rose-700"
                    }`}>
                      {tx.type === "income" ? <ArrowUpCircle className="w-3 h-3" /> : <ArrowDownCircle className="w-3 h-3" />}
                      {tx.type}
                    </div>
                  </td>

                  {isAdmin && (
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDelete(index)}
                        className="p-2 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
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