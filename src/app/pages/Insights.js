// pages/Insights.jsx
import Insights from "../components/Insights";

export default function InsightsPage({ transactions }) {
  // Monthly comparison
  const currentMonth = new Date().getMonth();

  const current = transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonth
  );

  const previous = transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonth - 1
  );

  const currentTotal = current.reduce(
    (acc, t) =>
      t.type === "expense"
        ? acc + Number(t.amount)
        : acc,
    0
  );

  const prevTotal = previous.reduce(
    (acc, t) =>
      t.type === "expense"
        ? acc + Number(t.amount)
        : acc,
    0
  );

  const diff =
    prevTotal === 0
      ? 0
      : (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1);

  return (
    <div className="p-4 space-y-4">
      <Insights transactions={transactions} />

      <div className="bg-white p-5 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-2">Monthly Comparison</h3>

        <p className="text-gray-600">
          You spent{" "}
          <span className="font-semibold">{diff}%</span> compared to last
          month
        </p>
      </div>
    </div>
  );
}