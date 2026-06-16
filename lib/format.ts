// Prices are stored in the database as integers in paise (1/100 of a rupee)
// to avoid floating-point rounding issues. This converts them for display.

export function formatPriceINR(amountInPaise: number): string {
  const rupees = amountInPaise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}