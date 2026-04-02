const DB_KEY = "my_app_transactions";

export const api = {
  // GET
  getTransactions: async () => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : null;
  },

  // POST (Simulated)
  addTransaction: (newTx) => {
    const current = api.getTransactions();
    const updated = [newTx, ...current];
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
    return updated;
  },

  // DELETE
  deleteTransaction: (id) => {
    const current = api.getTransactions();
    const updated = current.filter(t => t.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
    return updated;
  }, // <--- Added missing closing brace here

  // SAVE/UPDATE (Now correctly positioned as a property of 'api')
  saveTransactions: async (transactions) => {
    localStorage.setItem(DB_KEY, JSON.stringify(transactions));
    return true;
  }
};