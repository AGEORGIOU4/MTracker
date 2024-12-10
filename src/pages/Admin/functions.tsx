import { toLocalISOString } from "../../utils/functions";
import { parse } from "papaparse"
import { v4 as uuidv4 } from 'uuid';


const parseDate = (dateString: string) => {
  return toLocalISOString(dateString);
};

const generateTimestamp = (dateString: string) => {
  const date = new Date(dateString);
  const milliseconds = date.getTime();

  return {
    seconds: Math.floor(milliseconds / 1000),
    nanoseconds: (milliseconds % 1000) * 1e6,
  };
};

export const convertRevolutCSVToJSON = (csvText: string) => {
  if (!csvText || typeof csvText !== "string") {
    throw new Error("Invalid CSV input.");
  }

  // Use PapaParse to parse the CSV
  const { data: rows }: { data: any[] } = parse(csvText, { header: false, skipEmptyLines: true });

  if (rows.length < 2) {
    throw new Error("CSV does not contain enough rows.");
  }

  // Use the first row as headers
  const headers = rows[0];
  if (!Array.isArray(headers)) {
    throw new Error("Headers are not in array format.");
  }

  return rows.slice(1).map((row: any[], rowIndex: number) => {
    if (!Array.isArray(row)) return {}; // Skip invalid rows

    const data = headers.reduce((acc: Record<string, string>, header: string, index: number) => {
      acc[header.trim()] = (row[index] || "").toString().trim();
      return acc;
    }, {});


    const amount = data["Amount"]
    const transactionType = amount >= 0 ? "Debit" : "Credit";

    return {
      type: transactionType,
      description: data["Description"],
      category: "Uncategorized",
      method: "Revolut",
      amount: Math.abs(amount),
      id: uuidv4(),
      user: "Joint",
      account: "Joint",
      date: parseDate(data["Started Date"]),
      timestamp: generateTimestamp(data["Started Date"]),
    };
  });
};

export const convertBoCCSVToJSON = (csvText: string) => {
  if (!csvText || typeof csvText !== "string") {
    throw new Error("Invalid CSV input.");
  }

  // Use PapaParse to parse the CSV
  const { data: rows }: { data: any[] } = parse(csvText, { header: false, skipEmptyLines: true });

  if (rows.length < 2) {
    throw new Error("CSV does not contain enough rows.");
  }

  // Use the first row as headers
  const headers = rows[0];
  if (!Array.isArray(headers)) {
    throw new Error("Headers are not in array format.");
  }

  return rows.slice(1).map((row: any[], rowIndex: number) => {
    if (!Array.isArray(row)) return {}; // Skip invalid rows

    const data = headers.reduce((acc: Record<string, string>, header: string, index: number) => {
      acc[header.trim()] = (row[index] || "").toString().trim();
      return acc;
    }, {});

    const debitValue = data["Debit"]?.replace(",", ".");
    const creditValue = data["Credit"]?.replace(",", ".")
    const amount = debitValue || creditValue || 0;

    const transactionType = debitValue >= 0 ? "Debit" : "Credit";

    return {
      type: transactionType,
      description: data["Description"],
      category: "Uncategorized",
      method: "Bank of Cyprus",
      amount: amount,
      id: uuidv4(),
      user: "Joint",
      account: "Joint",
      date: parseDate(data["Date"]),
      timestamp: generateTimestamp(data["Date"]),
    };
  });
};

