import { expenses_categories, income_categories, transfers_categories } from "./options";

export function toLocalISOStringDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function toLocalISOString(dateInput: string) {
  const pad = (n: number) => String(n).padStart(2, "0");

  // Handle input in "dd/mm/yyyy" format and extract date and time parts
  const [day, month, year] = dateInput.split(" ")[0].split("/");
  let timePart = dateInput.split(" ")[1] || "00:00:00";

  // Ensure the time part has a leading zero if it starts with a single-digit hour
  if (/^\d:\d{2}(:\d{2})?$/.test(timePart)) {
    timePart = `0${timePart}`;
  } else if (/^\d{2}:\d{2}$/.test(timePart)) {
    timePart = `${timePart}:00`; // Add seconds if missing
  }

  // Construct a Date object
  const formattedDate = new Date(`${year}-${month}-${day}T${timePart}`);

  if (isNaN(formattedDate.getTime())) {
    console.error("Invalid Date Input:", dateInput);
    return "Invalid Date";
  }

  const yearOut = formattedDate.getFullYear();
  const monthOut = pad(formattedDate.getMonth() + 1); // Months are 0-indexed
  const dayOut = pad(formattedDate.getDate());
  const hours = pad(formattedDate.getHours());
  const minutes = pad(formattedDate.getMinutes());
  const seconds = pad(formattedDate.getSeconds());
  const milliseconds = String(formattedDate.getMilliseconds()).padStart(3, "0");

  return `${yearOut}-${monthOut}-${dayOut}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function formatDateToCustomString(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Extract hours, minutes, and seconds
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Convert to 12-hour format and determine AM/PM
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${period}`;
}

export function formatDateToDDMMYY(dateInput: string | Date): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

  return `${day}/${month}/${year}`;
}

export const getTransactionColor = (type: string, category: string) => {
  if (type === "Expenses") {
    return expenses_categories.find((categoryObj) => categoryObj.value === category)?.color || "#dedede";
  }
  if (type === "Income") {
    return income_categories.find((categoryObj) => categoryObj.value === category)?.color || "#dedede";
  }
  if (type === "Transfers") {
    return transfers_categories.find((categoryObj) => categoryObj.value === category)?.color || "#dedede";
  }
  return "#dedede"; // Default color
};