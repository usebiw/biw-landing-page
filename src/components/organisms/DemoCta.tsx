/**
 * DemoCta.tsx — React island (client:idle). "Contáctenos"/"Contact us" form.
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
      <div role="status" aria-live="polite" className="border-l-2 border-accent py-2 pl-5">
        <p className="font-display text-xl font-bold text-ink [font-stretch:112%]">{t('form.successTitle')}</p>
        <p className="mt-2 text-ink-2">{t('form.successBody')}</p>
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

      <label className="flex items-start gap-3 text-sm text-ink-2">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          {t('form.consentPrefix')}{' '}
          <a href={privacyHref} className="text-accent-ink underline underline-offset-2">
            {t('form.consentLinkLabel')}
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-signal">{tv(errors.consent)}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-12 min-w-40 items-center justify-center rounded-[3px] bg-accent px-6 text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:bg-biw-600 disabled:cursor-progress disabled:opacity-70"
        >
          {status === 'submitting' ? t('form.submitting') : t('form.submit')}
        </button>
        <a
          href={whatsappHref}
          className="inline-flex h-12 items-center justify-center rounded-[3px] border border-ink/25 px-6 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:border-ink"
        >
          {whatsappLabel}
        </a>
      </div>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p role="alert" aria-live="assertive" className="text-sm text-signal">
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
      <label htmlFor={id} className="text-sm font-medium text-ink">
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
        className={`h-11 rounded-[3px] border bg-sheet px-3 text-[0.9375rem] text-ink transition-colors duration-150 hover:border-ink/40 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent ${
          error ? 'border-signal' : 'border-rule'
        }`}
      />
      {error && (
        <p id={errorId} className="text-xs text-signal">
          {error}
        </p>
      )}
    </div>
  );
}
