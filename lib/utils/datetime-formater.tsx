/**
 * Format a date string or Date object into a human-readable format.
 *
 * @param date - A date string, timestamp, or Date object.
 * @param locale - Locale for formatting (default: "en-US").
 * @param options - Intl.DateTimeFormat options for customization.
 * @returns Formatted date string or empty string if invalid.
 */

export function formatDate(
  date?: string | number | Date | null,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  if (!date) return "";
  const parsedDate = date instanceof Date ? date : new Date(date);
  if (isNaN(parsedDate.getTime())) return ""; // Handle invalid date
  return new Intl.DateTimeFormat(locale, options).format(parsedDate);
}
