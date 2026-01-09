import { format } from 'date-fns';

/**
 * Format date as DD.MM.YYYY
 * @param date - Date to format
 * @param _language - Language (unused, kept for API compatibility)
 * @returns Formatted date string like "09.01.2026"
 */
export function formatRelativeTime(date: Date, _language: string = 'en'): string {
  return format(date, 'dd.MM.yyyy');
}

/**
 * Format date with time as DD.MM.YYYY HH:mm
 * @param date - Date to format
 * @returns Formatted date string like "09.01.2026 14:30"
 */
export function formatDateTime(date: Date): string {
  return format(date, 'dd.MM.yyyy HH:mm');
}

