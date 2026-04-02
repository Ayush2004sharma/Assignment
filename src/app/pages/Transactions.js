// pages/Transactions.jsx
import { useState } from "react";
import TransactionTable from "../components/TransactionTable";
import Filters from "../components/Filters";
import AddTransaction from "../components/AddTransaction";

export default function Transactions({
  transactions,
  setTransactions,
  role,
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const filtered = transactions.filter((t) => {
    return (
      t.category.toLowerCase().includes(search.toLowerCase()) &&
      (type ? t.type === type : true)
    );
  });

  const handleDelete = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  const handleAdd = (tx) => {
    setTransactions([...transactions, tx]);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Admin Form */}
      {role === "admin" && <AddTransaction onAdd={handleAdd} />}

      {/* Filters */}
      <Filters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />

      {/* Table */}
      <TransactionTable
        transactions={filtered}
        role={role}
        onDelete={handleDelete}
      />
    </div>
  );
}