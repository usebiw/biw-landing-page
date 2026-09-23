/**
 * getWhatsappHref
 * Builds a wa.me deep link from an E.164 (no "+") phone number and a
 * pre-filled message. Number is always received as a parameter — never
 * hardcoded here — the actual number lives in `src/content/site.json`
 * (`whatsappNumber`), read via getEntry/getCollection by the caller.
 */
export function getWhatsappHref(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
