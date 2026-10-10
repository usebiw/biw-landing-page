import type { Locale } from './i18n';

/** Colombian-peso amount as printed on a budget sheet: "$ 1.574.400.000"
 * in Spanish, "$1,574,400,000" in English. No decimals. */
export function formatCop(value: number, locale: Locale): string {
  const n = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-CO', { maximumFractionDigits: 0 }).format(value);
  return locale === 'en' ? `$${n}` : `$ ${n}`;
}

/** Plain quantity with fixed decimals, locale grouping ("1.130,00"). */
export function formatQty(value: number, locale: Locale, decimals = 2): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
