'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle,
  Trash2,
  Sparkles
} from 'lucide-react';
import { 
  NEPALI_MONTHS, 
  NEPALI_DAYS, 
  convertAdToBsApprox, 
  convertBsToAdApprox, 
  toNepaliDigits, 
  toEnglishDigits 
} from '@/lib/nepaliDate';

interface ConvertedRow {
  index: number;
  raw: string;
  converted: string;
  weekday: string;
  fullDesc: string;
  isValid: boolean;
  detectedMode: 'BS to AD' | 'AD to BS';
}

const SAMPLE_EXCEL_DATA = `2080-05-14
2081/01/01
2078.10.15
2082-08-25
2075-12-30
2083/06/18
२०८०-०४-२२`;

export function BulkDateConverter() {
  const [inputText, setInputText] = useState<string>(SAMPLE_EXCEL_DATA);
  const [mode, setMode] = useState<'auto' | 'bsToAd' | 'adToBs'>('auto');
  const [copiedColumn, setCopiedColumn] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  // Parse input line by line
  const parsedRows: ConvertedRow[] = useMemo(() => {
    if (!inputText.trim()) return [];

    const lines = inputText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    return lines.map((line, idx) => {
      // Clean up string and convert devanagari numerals to english
      const normalized = toEnglishDigits(line).replace(/["']/g, '').trim();

      // Match YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
      const match = normalized.match(/^(\d{4})[-/. ](\d{1,2})[-/. ](\d{1,2})$/);

      if (!match) {
        return {
          index: idx + 1,
          raw: line,
          converted: 'Invalid Format',
          weekday: '-',
          fullDesc: 'Format must be YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD',
          isValid: false,
          detectedMode: mode === 'adToBs' ? 'AD to BS' : 'BS to AD',
        };
      }

      const p1 = parseInt(match[1], 10);
      const p2 = parseInt(match[2], 10);
      const p3 = parseInt(match[3], 10);

      let isBs = true;
      if (mode === 'bsToAd') {
        isBs = true;
      } else if (mode === 'adToBs') {
        isBs = false;
      } else {
        // Auto: BS years are typically 2000 to 2100. AD years in this context are 1950 to 2040.
        isBs = p1 >= 2040;
      }

      if (isBs) {
        // BS to AD
        const bsYear = p1;
        const bsMonth = Math.min(12, Math.max(1, p2));
        const bsDay = Math.min(32, Math.max(1, p3));

        const adDate = convertBsToAdApprox(bsYear, bsMonth, bsDay);
        const y = adDate.getFullYear();
        const m = String(adDate.getMonth() + 1).padStart(2, '0');
        const d = String(adDate.getDate()).padStart(2, '0');
        const converted = `${y}-${m}-${d}`;
        const dayObj = NEPALI_DAYS[adDate.getDay()] || NEPALI_DAYS[0];

        return {
          index: idx + 1,
          raw: line,
          converted,
          weekday: `${dayObj.bs} (${dayObj.en})`,
          fullDesc: `${adDate.toDateString()}`,
          isValid: true,
          detectedMode: 'BS to AD',
        };
      } else {
        // AD to BS
        const adYear = p1;
        const adMonth = Math.min(12, Math.max(1, p2));
        const adDay = Math.min(31, Math.max(1, p3));
        const adDate = new Date(adYear, adMonth - 1, adDay);

        const bs = convertAdToBsApprox(adDate);
        const yStr = String(bs.year);
        const mStr = String(bs.month).padStart(2, '0');
        const dStr = String(bs.day).padStart(2, '0');
        const converted = `${yStr}-${mStr}-${dStr}`;
        const dayObj = NEPALI_DAYS[adDate.getDay()] || NEPALI_DAYS[0];
        const monthObj = NEPALI_MONTHS[bs.month - 1] || NEPALI_MONTHS[0];

        return {
          index: idx + 1,
          raw: line,
          converted,
          weekday: `${dayObj.bs} (${dayObj.en})`,
          fullDesc: `${bs.year} ${monthObj.bs} ${bs.day} (${toNepaliDigits(bs.year)} ${monthObj.bs} ${toNepaliDigits(bs.day)})`,
          isValid: true,
          detectedMode: 'AD to BS',
        };
      }
    });
  }, [inputText, mode]);

  const validCount = parsedRows.filter(r => r.isValid).length;
  const invalidCount = parsedRows.length - validCount;

  // Copy converted column only (Excel friendly)
  const handleCopyColumn = () => {
    const colText = parsedRows.map(r => (r.isValid ? r.converted : '')).join('\n');
    navigator.clipboard.writeText(colText);
    setCopiedColumn(true);
    setTimeout(() => setCopiedColumn(false), 2000);
  };

  // Copy full TSV/CSV
  const handleCopyCsv = () => {
    const header = "Row\tInput Date\tConverted Date\tDay of Week\tMode\n";
    const body = parsedRows.map(r => `${r.index}\t${r.raw}\t${r.converted}\t${r.weekday}\t${r.detectedMode}`).join('\n');
    navigator.clipboard.writeText(header + body);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  // Download CSV
  const handleDownloadCsv = () => {
    const csvHeader = "Row,Input Date,Converted Date,Day of Week,Mode\n";
    const csvRows = parsedRows.map(r => `"${r.index}","${r.raw}","${r.converted}","${r.weekday}","${r.detectedMode}"`).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'converted_nepali_dates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="calculator-card" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              backgroundColor: '#e0f2fe', 
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Bulk Nepali Date Converter (एकमुष्ट मिति रूपान्तरण)
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              Designed for Microsoft Excel & Google Sheets copy-paste (BS ⇄ AD)
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setMode('auto')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: mode === 'auto' ? 'var(--primary)' : 'transparent',
              color: mode === 'auto' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Auto Detect
          </button>
          <button
            type="button"
            onClick={() => setMode('bsToAd')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: mode === 'bsToAd' ? 'var(--primary)' : 'transparent',
              color: mode === 'bsToAd' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            BS to AD (वि.सं. ➔ ई.सं.)
          </button>
          <button
            type="button"
            onClick={() => setMode('adToBs')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: mode === 'adToBs' ? 'var(--primary)' : 'transparent',
              color: mode === 'adToBs' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            AD to BS (ई.सं. ➔ वि.सं.)
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Paste Date Column From Excel or Text (१ लाइनमा १ मिति):
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setInputText(SAMPLE_EXCEL_DATA)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                fontSize: '12px',
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
            >
              <Sparkles size={13} />
              Sample Data
            </button>
            <button
              type="button"
              onClick={() => setInputText('')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                fontSize: '12px',
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#ef4444'
              }}
            >
              <Trash2 size={13} />
              Clear
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste rows here:&#10;2080-05-14&#10;2081/01/01&#10;2078.10.15&#10;..."
          className="input-field"
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            padding: '12px',
            borderRadius: '8px',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          <span>Supports formats: <code>YYYY-MM-DD</code>, <code>YYYY/MM/DD</code>, <code>YYYY.MM.DD</code> & Devanagari digits.</span>
          <span>
            Total: <strong>{parsedRows.length}</strong> | Valid: <strong style={{ color: '#16a34a' }}>{validCount}</strong> | Errors: <strong style={{ color: '#dc2626' }}>{invalidCount}</strong>
          </span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '20px',
          padding: '12px',
          background: 'var(--bg-subtle)',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <button
          type="button"
          onClick={handleCopyColumn}
          disabled={parsedRows.length === 0}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
        >
          {copiedColumn ? <Check size={16} /> : <Copy size={16} />}
          {copiedColumn ? 'Copied Column!' : 'Copy Converted Column (For Excel)'}
        </button>

        <button
          type="button"
          onClick={handleCopyCsv}
          disabled={parsedRows.length === 0}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
        >
          {copiedCsv ? <Check size={16} /> : <Copy size={16} />}
          {copiedCsv ? 'Copied All!' : 'Copy Full Table (TSV)'}
        </button>

        <button
          type="button"
          onClick={handleDownloadCsv}
          disabled={parsedRows.length === 0}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
        >
          <Download size={16} />
          Download CSV
        </button>
      </div>

      {/* Results Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-secondary)', width: '60px' }}>#</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Input Date</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Converted (YYYY-MM-DD)</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Day (बार)</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Description</th>
            </tr>
          </thead>
          <tbody>
            {parsedRows.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No dates entered. Paste an Excel column of dates above to see results.
                </td>
              </tr>
            ) : (
              parsedRows.map((r) => (
                <tr 
                  key={r.index}
                  style={{ 
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: !r.isValid ? 'rgba(239, 68, 68, 0.05)' : undefined 
                  }}
                >
                  <td style={{ padding: '8px 14px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    {r.index}
                  </td>
                  <td style={{ padding: '8px 14px', fontWeight: 500, fontFamily: 'monospace' }}>
                    {r.raw}
                  </td>
                  <td style={{ padding: '8px 14px' }}>
                    {r.isValid ? (
                      <span style={{ 
                        fontFamily: 'monospace', 
                        fontWeight: 700, 
                        color: 'var(--primary)',
                        background: 'rgba(2, 132, 199, 0.08)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {r.converted}
                      </span>
                    ) : (
                      <span style={{ color: '#dc2626', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <AlertCircle size={14} />
                        {r.converted}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-secondary)' }}>
                    {r.weekday}
                  </td>
                  <td style={{ padding: '8px 14px', color: 'var(--text-primary)', fontSize: '12px' }}>
                    {r.fullDesc}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Helpful Excel Guide */}
      <div style={{ marginTop: '20px', padding: '14px', background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '12px', color: 'var(--text-secondary)' }}>
        <strong>How to use with Excel in 3 simple steps:</strong>
        <ol style={{ paddingLeft: '18px', margin: '6px 0 0', lineHeight: '1.6' }}>
          <li>Select and copy (<code>Ctrl+C</code>) your entire date column in Microsoft Excel or Google Sheets.</li>
          <li>Paste (<code>Ctrl+V</code>) it into the box above.</li>
          <li>Click <strong>&quot;Copy Converted Column (For Excel)&quot;</strong> and paste (<code>Ctrl+V</code>) directly back into your Excel spreadsheet.</li>
        </ol>
      </div>
    </div>
  );
}
