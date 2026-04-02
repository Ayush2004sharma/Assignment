export const exportToCSV = (data, filename = "transactions.csv") => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","), // header row
    ...data.map((row) =>
      headers.map((field) => `"${row[field]}"`).join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
};

export const exportToJSON = (data, filename = "transactions.json") => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
};