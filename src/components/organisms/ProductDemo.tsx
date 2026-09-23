/**
 * ProductDemo.tsx — React island (client:visible).
 *
 * Architecture decision (roles ↔ product demo): role data drives this tab
 * strip directly rather than living in a second, separate `RolesSection`
 * interactive widget. `RolesSection.astro` (static, server-rendered) covers
 * full accessible/crawlable coverage of all 5 roles and their
 * responsibilities; this island reuses the same roles purely as a lens to
 * demonstrate how the SAME synthetic dashboard reads differently per role
 * (what each role would see first). This avoids two competing, partially-
 * redundant interactive widgets and keeps the "product in action" moment
 * to one place. State: plain useState, no external libs.
 *
 * i18n: roles are looked up by the stable, locale-independent `roleKey`
 * (never by the localized display `name`), so the tab strip works
 * identically under /es/ and /en/. All copy (snapshot headlines, chapter
 * names, tone labels) is duplicated per locale in SNAPSHOTS_BY_LOCALE
 * below rather than pulled from a translation dictionary, since it's
 * synthetic demo data tied 1:1 to this component's own logic.
 *
 * All figures are synthetic mockups — never real customer data — and the
 * "Datos de ejemplo"/"Sample data" label stays visible at all times, never
 * hidden behind a tooltip or collapsed state.
 */
import { useState, type KeyboardEvent } from 'react';

export type Locale = 'es' | 'en';

interface RoleDemoInput {
  roleKey: string;
  name: string;
  access: string;
}

interface Props {
  roles: RoleDemoInput[];
  locale: Locale;
  sampleDataLabel: string;
  tabsAriaLabel: string;
  legend: { real: string; planned: string; budget: string };
}

interface ChapterRow {
  name: string;
  planned: number;
  real: number;
  execution: number;
  tone: 'ok' | 'warning' | 'blocked';
}

interface RoleSnapshot {
  headline: string;
  chapters: ChapterRow[];
}

// Synthetic per-role dashboard snapshots — illustrative only — keyed by
// the stable roleKey, one full set of copy per locale.
const SNAPSHOTS_BY_LOCALE: Record<Locale, Record<string, RoleSnapshot>> = {
  es: {
    'gerencia-general': {
      headline: 'KPIs consolidados de 6 obras activas',
      chapters: [
        { name: 'Torre Norte — Estructura', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Bodega Sur — Cimentación', planned: 100, real: 100, execution: 64, tone: 'ok' },
        { name: 'Vía Perimetral — Excavación', planned: 70, real: 55, execution: 112, tone: 'blocked' },
      ],
    },
    'director-proyecto': {
      headline: 'Aprobaciones pendientes en Torre Norte',
      chapters: [
        { name: 'Estructura', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Mampostería', planned: 60, real: 45, execution: 58, tone: 'ok' },
        { name: 'Acabados', planned: 20, real: 8, execution: 22, tone: 'ok' },
      ],
    },
    'ingeniero-residente': {
      headline: 'Registro diario del frente — hoy',
      chapters: [
        { name: 'Estructura, eje 4-7', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Instalaciones hidráulicas', planned: 40, real: 38, execution: 41, tone: 'ok' },
        { name: 'Cuadrilla asignada: 12', planned: 100, real: 92, execution: 70, tone: 'ok' },
      ],
    },
    'area-financiera': {
      headline: 'Ejecución presupuestal por capítulo',
      chapters: [
        { name: 'Estructura', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Cimentación', planned: 100, real: 100, execution: 64, tone: 'ok' },
        { name: 'Excavación (contratista)', planned: 70, real: 55, execution: 112, tone: 'blocked' },
      ],
    },
    'contratistas-externos': {
      headline: 'Corte de contratista — estado actual',
      chapters: [
        { name: 'Excavación (mío)', planned: 70, real: 55, execution: 112, tone: 'blocked' },
        { name: 'Corte #4', planned: 100, real: 100, execution: 100, tone: 'ok' },
        { name: 'Anticipo amortizado', planned: 100, real: 62, execution: 62, tone: 'ok' },
      ],
    },
  },
  en: {
    'gerencia-general': {
      headline: 'Consolidated KPIs across 6 active sites',
      chapters: [
        { name: 'North Tower — Structure', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'South Warehouse — Foundation', planned: 100, real: 100, execution: 64, tone: 'ok' },
        { name: 'Perimeter Road — Excavation', planned: 70, real: 55, execution: 112, tone: 'blocked' },
      ],
    },
    'director-proyecto': {
      headline: 'Pending approvals on North Tower',
      chapters: [
        { name: 'Structure', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Masonry', planned: 60, real: 45, execution: 58, tone: 'ok' },
        { name: 'Finishes', planned: 20, real: 8, execution: 22, tone: 'ok' },
      ],
    },
    'ingeniero-residente': {
      headline: "Today's work-front log",
      chapters: [
        { name: 'Structure, axis 4-7', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Plumbing', planned: 40, real: 38, execution: 41, tone: 'ok' },
        { name: 'Crew assigned: 12', planned: 100, real: 92, execution: 70, tone: 'ok' },
      ],
    },
    'area-financiera': {
      headline: 'Budget execution by chapter',
      chapters: [
        { name: 'Structure', planned: 92, real: 80, execution: 80, tone: 'warning' },
        { name: 'Foundation', planned: 100, real: 100, execution: 64, tone: 'ok' },
        { name: 'Excavation (contractor)', planned: 70, real: 55, execution: 112, tone: 'blocked' },
      ],
    },
    'contratistas-externos': {
      headline: 'Contractor progress cut — current status',
      chapters: [
        { name: 'Excavation (mine)', planned: 70, real: 55, execution: 112, tone: 'blocked' },
        { name: 'Cut #4', planned: 100, real: 100, execution: 100, tone: 'ok' },
        { name: 'Advance amortized', planned: 100, real: 62, execution: 62, tone: 'ok' },
      ],
    },
  },
};

const toneLabels: Record<Locale, Record<ChapterRow['tone'], string>> = {
  es: { ok: 'En regla', warning: 'Cerca del 80%', blocked: 'Bloqueado · 110%' },
  en: { ok: 'On track', warning: 'Near 80%', blocked: 'Blocked · 110%' },
};

const toneClasses: Record<ChapterRow['tone'], string> = {
  ok: 'bg-biw-500/15 text-biw-400 border-biw-500/30',
  warning: 'bg-signal-500/15 text-signal-500 border-signal-500/30',
  blocked: 'bg-signal-500/25 text-signal-500 border-signal-500/40',
};

export default function ProductDemo({ roles, locale, sampleDataLabel, tabsAriaLabel, legend }: Props) {
  const [active, setActive] = useState(roles[0]?.roleKey ?? '');
  const snapshots = SNAPSHOTS_BY_LOCALE[locale];
  const snapshot = snapshots[active] ?? snapshots[roles[0]?.roleKey ?? ''];
  const role = roles.find((r) => r.roleKey === active);
  const toneLabel = toneLabels[locale];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + roles.length) % roles.length;
    setActive(roles[nextIndex].roleKey);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  }

  return (
    <div className="glass-strong glass-edge relative rounded-3xl p-2 md:p-3">
      <div
        role="tablist"
        aria-label={tabsAriaLabel}
        className="flex gap-1.5 overflow-x-auto rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] p-1.5 [scrollbar-width:none]"
      >
        {roles.map((r, index) => {
          const isActive = r.roleKey === active;
          return (
            <button
              key={r.roleKey}
              id={`demo-tab-${r.roleKey}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="demo-tabpanel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(r.roleKey)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
              className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold tracking-tight transition-[background-color,color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-biw-400 ${
                isActive
                  ? 'bg-biw-500 text-white shadow-[0_10px_30px_-10px_rgba(20,80,255,0.95),inset_0_1px_0_rgba(255,255,255,0.25)]'
                  : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-card-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              {r.name}
            </button>
          );
        })}
      </div>

      <div
        id="demo-tabpanel"
        role="tabpanel"
        aria-labelledby={`demo-tab-${active}`}
        className="p-5 md:p-7"
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div key={active} className="demo-fade">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-biw-400">{role?.access}</p>
            <p className="mt-1.5 font-display text-xl font-bold tracking-tight text-[var(--text-primary)] md:text-2xl">
              {snapshot.headline}
            </p>
          </div>
          <span className="inline-flex items-center rounded-lg border border-biw-500/30 bg-biw-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-biw-400">
            {sampleDataLabel}
          </span>
        </div>

        <ul className="flex flex-col gap-5">
          {snapshot.chapters.map((chapter, i) => (
            <li key={`${active}-${i}`} className="demo-fade flex flex-col gap-2" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{chapter.name}</span>
                <span
                  className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] tabular-nums ${toneClasses[chapter.tone]}`}
                >
                  {toneLabel[chapter.tone]} · {chapter.execution}%
                </span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-[var(--border-hairline-strong)]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--text-primary)]/20"
                  style={{ width: `${chapter.planned}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#0d3ad1,#1450ff_60%,#4d7bff)] shadow-[0_0_18px_rgba(20,80,255,0.65)]"
                  style={{ width: `${chapter.real}%` }}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--border-hairline)] pt-5 text-xs text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-[linear-gradient(90deg,#0d3ad1,#4d7bff)]" aria-hidden="true" />
            {legend.real}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-[var(--text-primary)]/20" aria-hidden="true" />
            {legend.planned}
          </span>
          <span>{legend.budget}</span>
        </div>
      </div>
    </div>
  );
}
