/**
 * Formats a number or string into a localized currency string.
 *
 * @param amount - The numeric value to format. Can be a number or string.
 * @param currency - ISO 4217 currency code (e.g., "USD", "EUR", "JPY"). Defaults to "USD".
 * @param locale - BCP 47 locale string (e.g., "en-US", "fr-FR"). Defaults to "en-US".
 * @param options - Additional Intl.NumberFormat options to customize formatting
 *                  (e.g., minimumFractionDigits, notation, etc.).
 *
 * @returns A formatted currency string according to the specified locale and currency.
 *          Returns an empty string if the amount is null, undefined, empty, or invalid.
 *
 * @example
 * formatCurrency(1500); // "$1,500.00"
 * formatCurrency(1500, "EUR", "fr-FR"); // "1 500,00 €"
 * formatCurrency(1500, "JPY", "ja-JP"); // "￥1,500"
 * formatCurrency(1500.456, "USD", "en-US", { minimumFractionDigits: 3 }); // "$1,500.456"
 * formatCurrency(1500, "USD", "en-US", { notation: "compact" }); // "$1.5K"
 */
export function formatCurrency(
  amount?: number | string | null,
  currency: string = "USD",
  locale: string = "en-US",
  options: Intl.NumberFormatOptions = {}
): string {
  if (amount === null || amount === undefined || amount === "") return "";

  const numericAmount = typeof amount === "string" ? Number(amount) : amount;

  if (isNaN(numericAmount)) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options,
  }).format(numericAmount);
}
