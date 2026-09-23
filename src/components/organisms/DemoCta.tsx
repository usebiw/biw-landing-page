/**
 * DemoCta.tsx — React island (client:idle). "Contáctanos"/"Contact us" form.
 * Validation via src/lib/validation.ts (pure functions, no external lib,
 * returns dictionary KEYS, translated here via useTranslations). States:
 * idle / submitting / success / error. Posts JSON to
 * import.meta.env.PUBLIC_DEMO_ENDPOINT when set; otherwise simulates a
 * local success (see TODO below) since no backend exists yet.
 */
import { useState, type FormEvent } from 'react';
import { validateDemoForm, type DemoFormData } from '../../lib/validation';
import { useTranslations, type Locale } from '../../lib/i18n';

interface Props {
  locale: Locale;
  whatsappHref: string;
  whatsappLabel: string;
  privacyHref: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm: DemoFormData = {
  name: '',
  company: '',
  role: '',
  email: '',
  phone: '',
  activeProjects: '',
  consent: false,
};

export default function DemoCta({ locale, whatsappHref, whatsappLabel, privacyHref }: Props) {
  const t = useTranslations(locale);
  // validateDemoForm returns dictionary keys (e.g. "form.validation.emailInvalid"),
  // not literal strings — this resolves one to the active locale's text.
  const tv = (key?: string): string | undefined =>
    key ? (t(key as Parameters<typeof t>[0]) as unknown as string) : undefined;
  const [form, setForm] = useState<DemoFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  function update<K extends keyof DemoFormData>(key: K, value: DemoFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateDemoForm(form);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const endpoint = import.meta.env.PUBLIC_DEMO_ENDPOINT as string | undefined;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else {
        // TODO(backend): no contact-submission backend exists yet. Without
        // PUBLIC_DEMO_ENDPOINT configured, simulate success locally so the
        // form stays fully functional for review — wire the real endpoint
        // here once it exists, removing this simulated branch.
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="demo-fade flex flex-col items-center py-10 text-center">
        <span className="mb-5 inline-flex size-16 items-center justify-center rounded-full border border-biw-400/40 bg-biw-500/15 shadow-[0_0_40px_rgba(20,80,255,0.55)]">
          <svg viewBox="0 0 24 24" className="size-7 text-biw-400" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">{t('form.successTitle')}</p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{t('form.successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === 'submitting'} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('form.name')}
          name="name"
          value={form.name}
          error={tv(errors.name)}
          onChange={(v) => update('name', v)}
        />
        <Field
          label={t('form.company')}
          name="company"
          value={form.company}
          error={tv(errors.company)}
          onChange={(v) => update('company', v)}
        />
        <Field
          label={t('form.role')}
          name="role"
          value={form.role}
          error={tv(errors.role)}
          onChange={(v) => update('role', v)}
        />
        <Field
          label={t('form.email')}
          name="email"
          type="email"
          value={form.email}
          error={tv(errors.email)}
          onChange={(v) => update('email', v)}
        />
        <Field
          label={t('form.phone')}
          name="phone"
          type="tel"
          value={form.phone}
          error={tv(errors.phone)}
          onChange={(v) => update('phone', v)}
        />
        <Field
          label={t('form.activeProjects')}
          name="activeProjects"
          type="text"
          inputMode="numeric"
          value={form.activeProjects}
          error={tv(errors.activeProjects)}
          onChange={(v) => update('activeProjects', v)}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--text-primary)]/80">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          className="mt-0.5 size-4 shrink-0 rounded accent-[#1450ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-biw-400"
        />
        <span>
          {t('form.consentPrefix')}{' '}
          <a href={privacyHref} className="text-biw-400 underline underline-offset-2">
            {t('form.consentLinkLabel')}
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-signal-500">{tv(errors.consent)}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="relative inline-flex min-w-44 items-center justify-center gap-2 overflow-hidden rounded-lg bg-biw-500 px-7 py-3.5 text-base font-semibold tracking-tight text-white shadow-[0_20px_45px_-18px_rgba(20,80,255,0.75),inset_0_1px_0_rgba(255,255,255,0.25)] transition-[background-color,box-shadow] duration-300 hover:bg-biw-600 disabled:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-biw-400"
        >
          {status === 'submitting' && (
            <span className="skeleton absolute inset-0 [--skeleton-base:transparent] [--skeleton-shine:rgba(255,255,255,0.35)]" aria-hidden="true" />
          )}
          <span className="relative">{status === 'submitting' ? t('form.submitting') : t('form.submit')}</span>
        </button>
        <a
          href={whatsappHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-7 py-3.5 text-base font-semibold tracking-tight text-[var(--text-primary)] backdrop-blur-xl transition-[background-color,border-color] duration-300 hover:border-biw-400/70 hover:bg-[var(--glass-bg-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-biw-400"
        >
          {whatsappLabel}
        </a>
      </div>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p role="alert" aria-live="assertive" className="text-sm text-signal-500">
          {t('form.genericError')}
        </p>
      )}
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  inputMode?: 'numeric' | 'text';
  onChange: (value: string) => void;
}

function Field({ label, name, value, error, type = 'text', inputMode, onChange }: FieldProps) {
  const id = `demo-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required
        className={`rounded-xl border bg-[var(--surface-card)] px-4 py-3 text-sm text-[var(--text-primary)] backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[var(--text-secondary)] hover:border-[var(--border-hairline-strong)] focus:bg-[var(--surface-card-strong)] focus:outline-none focus-visible:border-biw-400 focus-visible:shadow-[0_0_0_4px_rgba(20,80,255,0.18),0_10px_30px_-12px_rgba(20,80,255,0.6)] ${
          error ? 'border-signal-500' : 'border-[var(--border-hairline)]'
        }`}
      />
      {error && (
        <p id={errorId} className="text-xs text-signal-500">
          {error}
        </p>
      )}
    </div>
  );
}
