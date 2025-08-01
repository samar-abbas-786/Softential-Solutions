export const exportToCSV = (data, filename = "customers.csv") => {
  const headers = [
    "Full Name",
    "Email",
    "Contact Number",
    "Date of Birth",
    "State",
    "City",
    "Date of Registration",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((customer) =>
      [
        `"${customer.fullName}"`,
        `"${customer.email}"`,
        `"${customer.contactNumber}"`,
        `"${new Date(customer.dateOfBirth).toLocaleDateString()}"`,
        `"${customer.state}"`,
        `"${customer.city}"`,
        `"${new Date(customer.createdAt).toLocaleDateString()}"`,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data, filename = "customers.xlsx") => {
  // For simplicity, we'll export as CSV with .xlsx extension
  // In a real application, you might want to use a library like xlsx
  exportToCSV(data, filename.replace(".xlsx", ".csv"));
};
