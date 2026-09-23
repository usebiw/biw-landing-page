/**
 * validation.ts — pure functions, no side effects, no external libraries,
 * no hardcoded language. Returns dictionary KEYS (see `form.validation.*`
 * in `src/lib/i18n.ts`), not literal message strings — the caller
 * translates them with `t()` for the active locale.
 */

export interface DemoFormData {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  activeProjects: string;
  consent: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts digits, spaces, parens, dashes and an optional leading +; 7-15 digits total.
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digitCount = value.replace(/[^\d]/g, '').length;
  return PHONE_RE.test(value.trim()) && digitCount >= 7 && digitCount <= 15;
}

export function validateDemoForm(data: DemoFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'form.validation.nameRequired';
  }
  if (!data.company.trim()) {
    errors.company = 'form.validation.companyRequired';
  }
  if (!data.role.trim()) {
    errors.role = 'form.validation.roleRequired';
  }
  if (!data.email.trim()) {
    errors.email = 'form.validation.emailRequired';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'form.validation.emailInvalid';
  }
  if (!data.phone.trim()) {
    errors.phone = 'form.validation.phoneRequired';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'form.validation.phoneInvalid';
  }
  if (!data.activeProjects.trim()) {
    errors.activeProjects = 'form.validation.activeProjectsRequired';
  } else if (!/^\d+$/.test(data.activeProjects.trim())) {
    errors.activeProjects = 'form.validation.activeProjectsInvalid';
  }
  if (!data.consent) {
    errors.consent = 'form.validation.consentRequired';
  }

  return errors;
}
