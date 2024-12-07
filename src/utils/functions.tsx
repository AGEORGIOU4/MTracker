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