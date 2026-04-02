// pages/Insights.jsx
import Insights from "../components/Insights";

export default function InsightsPage({ transactions }) {
  // Monthly comparison logic (unchanged)
  const currentMonth = new Date().getMonth();

  const current = transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonth
  );

  const previous = transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonth - 1
  );

  const currentTotal = current.reduce(
    (acc, t) => (t.type === "expense" ? acc + Number(t.amount) : acc),
    0
  );

  const prevTotal = previous.reduce(
    (acc, t) => (t.type === "expense" ? acc + Number(t.amount) : acc),
    0
  );

  const diff =
    prevTotal === 0
      ? 0
      : (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1);

  // Helper for color coding the difference
  const isSpendingUp = Number(diff) > 0;

  return (
    <div className="p-4 space-y-6">
      {/* 1. Top Insights Card (Already updated) */}
      <Insights transactions={transactions} />

      {/* 2. Monthly Comparison Card */}
      {/* Updated: dark:bg-gray-900, dark:border-gray-800 */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-[28px] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
          Monthly Comparison
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          You spent{" "}
          <span className={`font-black text-lg ${
            isSpendingUp 
              ? "text-rose-600 dark:text-rose-400" 
              : "text-emerald-600 dark:text-emerald-400"
          }`}>
            {isSpendingUp ? `+${diff}%` : `${diff}%`}
          </span>{" "}
          compared to last month.
        </p>
        
        {/* Simple Progress visualization (Optional add-on for extra style) */}
        <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${isSpendingUp ? 'bg-rose-500' : 'bg-emerald-500'}`}
            style={{ width: `${Math.min(Math.abs(diff), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}