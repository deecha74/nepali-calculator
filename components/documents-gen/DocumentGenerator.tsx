'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Printer, X, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { DOC_DEFS } from '@/lib/documents/definitions';
import type { FieldDef, RowValues, Values } from '@/lib/documents/types';

function FieldInput({
  field, value, onChange, ne,
}: { field: FieldDef; value: string; onChange: (v: string) => void; ne: boolean }) {
  const label = ne ? field.labelNe : field.label;
  const common = { value, onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>) => onChange(e.target.value) };
  return (
    <label className="dg-field" style={{ gridColumn: field.span === 2 ? '1 / -1' : undefined }}>
      <span className="dg-label">{label}</span>
      {field.type === 'textarea' ? (
        <textarea className="dg-input" rows={2} placeholder={field.placeholder} {...common} />
      ) : field.type === 'select' ? (
        <select className="dg-input" {...common}>
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{ne ? o.labelNe : o.label}</option>
          ))}
        </select>
      ) : (
        <input
          className="dg-input"
          type={field.type === 'number' ? 'number' : 'text'}
          inputMode={field.type === 'number' ? 'decimal' : undefined}
          placeholder={field.placeholder}
          {...common}
        />
      )}
    </label>
  );
}

export default function DocumentGenerator({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const ne = language === 'ne';
  const def = DOC_DEFS[slug];
  const [values, setValues] = useState<Values>(() => def.initial());
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);
  const key = `docgen:${slug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValues({ ...def.initial(), ...JSON.parse(raw) });
    } catch { /* ignore */ }
    loaded.current = true;
    setReady(true);
  }, [key, def]);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(key, JSON.stringify(values)); } catch { /* ignore */ }
  }, [values, key]);

  useEffect(() => {
    const done = () => document.body.classList.remove('printing-doc');
    window.addEventListener('afterprint', done);
    return () => window.removeEventListener('afterprint', done);
  }, []);

  const blocks = useMemo(() => def.render(values), [def, values]);
  const warnings = useMemo(() => def.warnings(values), [def, values]);

  const setField = (id: string, val: string) => setValues((p) => ({ ...p, [id]: val }));
  const rowsOf = (id: string): RowValues[] => (Array.isArray(values[id]) ? (values[id] as RowValues[]) : []);
  const setRow = (id: string, i: number, fid: string, val: string) =>
    setValues((p) => {
      const list = [...rowsOf(id)];
      list[i] = { ...list[i], [fid]: val };
      return { ...p, [id]: list };
    });
  const addRow = (id: string, max: number) =>
    setValues((p) => (rowsOf(id).length >= max ? p : { ...p, [id]: [...rowsOf(id), {}] }));
  const removeRow = (id: string, i: number) =>
    setValues((p) => ({ ...p, [id]: rowsOf(id).filter((_, k) => k !== i) }));

  const clearAll = () => {
    if (window.confirm(t('Clear all fields?', 'सबै फिल्ड खाली गर्ने?'))) {
      localStorage.removeItem(key);
      setValues(def.initial());
    }
  };
  const print = () => {
    document.body.classList.add('printing-doc');
    window.print();
  };

  return (
    <div className="dg-wrap">
      <div className="dg-form">
        <div className="dg-form-top">
          <span className="dg-privacy"><ShieldCheck size={14} /> {t('Stays in your browser', 'तपाईंको ब्राउजरमै रहन्छ')}</span>
          <button type="button" className="dg-ghost" onClick={clearAll} id={`dg-clear-${slug}`}>
            <RotateCcw size={13} /> {t('Clear all', 'खाली गर्नुहोस्')}
          </button>
        </div>

        {def.sections.map((s, si) => (
          <section key={s.id} className="dg-section">
            <h2 className="dg-section-title"><span>{si + 1}</span>{ne ? s.titleNe : s.title}</h2>
            {s.repeat ? (
              <>
                {rowsOf(s.id).map((row, i) => (
                  <div key={i} className="dg-row">
                    <div className="dg-row-head">
                      <strong>{ne ? s.repeat!.itemLabelNe : s.repeat!.itemLabel} {i + 1}</strong>
                      {rowsOf(s.id).length > s.repeat!.min && (
                        <button type="button" className="dg-x" aria-label="Remove" onClick={() => removeRow(s.id, i)}><X size={14} /></button>
                      )}
                    </div>
                    <div className="dg-grid">
                      {s.fields.map((fd) => (
                        <FieldInput key={fd.id} field={fd} ne={ne} value={row[fd.id] || ''} onChange={(v) => setRow(s.id, i, fd.id, v)} />
                      ))}
                    </div>
                  </div>
                ))}
                {rowsOf(s.id).length < s.repeat.max && (
                  <button type="button" className="dg-add" onClick={() => addRow(s.id, s.repeat!.max)}>
                    <Plus size={14} /> {t('Add', 'थप्नुहोस्')} {ne ? s.repeat.itemLabelNe : s.repeat.itemLabel}
                  </button>
                )}
              </>
            ) : (
              <div className="dg-grid">
                {s.fields.map((fd) => (
                  <FieldInput key={fd.id} field={fd} ne={ne} value={(values[fd.id] as string) || ''} onChange={(v) => setField(fd.id, v)} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="dg-preview">
        <div className="dg-bar">
          <span className="dg-live"><i /> {t('Live preview', 'लाइभ प्रिभ्यु')}</span>
          <button type="button" className="btn-primary dg-print" onClick={print} id={`dg-print-${slug}`}>
            <Printer size={15} /> {t('Print / Save PDF', 'प्रिन्ट / PDF')}
          </button>
        </div>
        {warnings.length > 0 && (
          <div className="dg-warn">
            {warnings.map((w, i) => (
              <div key={i}><AlertTriangle size={13} /> {ne ? w.ne : w.en}</div>
            ))}
          </div>
        )}
        <div className="dg-tip">{t('Tip: A4 paper, turn off “Headers and footers” in the print dialog.', 'सुझाव: A4 कागज, प्रिन्टमा “Headers and footers” बन्द गर्नुहोस्।')}</div>
        <div className="dg-paper-scroll">
          <article id="doc-paper" className="dg-paper" style={{ opacity: ready ? 1 : 0.6 }}>
            {blocks.map((b, i) => {
              switch (b.t) {
                case 'title': return <h2 key={i} className="dp-title">{b.text}</h2>;
                case 'sub': return <p key={i} className="dp-sub">{b.text}</p>;
                case 'h': return <h3 key={i} className="dp-h">{b.text}</h3>;
                case 'p': return <p key={i} className="dp-p">{b.text}</p>;
                case 'ol':
                  return (
                    <ol key={i} className="dp-ol">
                      {b.items.map((it, k) => <li key={k}>{it}</li>)}
                    </ol>
                  );
                case 'table':
                  return (
                    <table key={i} className="dp-table">
                      <thead><tr>{b.head.map((h, k) => <th key={k}>{h}</th>)}</tr></thead>
                      <tbody>{b.rows.map((rw, k) => <tr key={k}>{rw.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                    </table>
                  );
                case 'sign':
                  return (
                    <div key={i} className="dp-sign">
                      {b.names.map((n, k) => (
                        <div key={k}><div className="dp-line" />{n}</div>
                      ))}
                    </div>
                  );
              }
            })}
          </article>
        </div>
        <p className="dg-disclaimer">
          {t('Template for general use — have a lawyer review before signing or registering.', 'सामान्य प्रयोगका लागि नमुना — सही गर्नु/दर्ता गर्नुअघि वकिलबाट जाँच गराउनुहोस्।')}
        </p>
      </div>
    </div>
  );
}
