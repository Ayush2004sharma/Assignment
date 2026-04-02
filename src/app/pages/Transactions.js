"use client";
import { useState } from "react";
import TransactionTable from "../components/TransactionTable";
import Filters from "../components/Filters";
import AddTransaction from "../components/AddTransaction";

export default function Transactions({ transactions, setTransactions, role }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // Date filter ke liye state

  // ✅ UNIVERSAL FILTER LOGIC
  const filtered = transactions.filter((t) => {
    const searchTerm = search.toLowerCase();
    
    // Check if matches category, date, OR amount
    const matchesSearch = 
      t.category.toLowerCase().includes(searchTerm) || 
      t.date.includes(searchTerm) || 
      t.amount.toString().includes(searchTerm);

    // Check if matches selected type (Income/Expense/All)
    const matchesType = type ? t.type === type : true;

    // Check if matches specific date picker
    const matchesDate = dateFilter ? t.date === dateFilter : true;

    return matchesSearch && matchesType && matchesDate;
  });

  const handleDelete = (index) => {
    // Index base delete mein bug ho sakta hai agar filtered list use ho rahi ho
    // Best hai ki filter se match karke original list update karo
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  const handleAdd = (tx) => {
    setTransactions([...transactions, tx]);
  };

  return (
    <div className="p-4 space-y-6">
      {role === "admin" && <AddTransaction onAdd={handleAdd} />}

      <Filters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <TransactionTable
        transactions={filtered}
        role={role}
        onDelete={handleDelete}
      />
    </div>
  );
}