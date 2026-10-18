'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadType: 'loan' | 'insurance' | 'realestate' | 'sip_planning';
  title?: string;
  subtitle?: string;
  referenceData?: string;
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  leadType,
  title = "Compare Best Rates from Top Nepal Commercial Banks",
  subtitle = "Get free consultation and lowest rate offers with zero agent fees.",
  referenceData,
}: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Kathmandu Valley');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Store in localStorage or send to webhook / CRM
    try {
      const existing = JSON.parse(localStorage.getItem('nepalcalc_leads') || '[]');
      existing.push({
        leadType,
        name,
        phone,
        city,
        referenceData,
        date: new Date().toISOString(),
      });
      localStorage.setItem('nepalcalc_leads', JSON.stringify(existing));
    } catch (e) {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '460px',
          padding: '32px',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
          }}
        >
          <X size={16} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '999px', background: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
              Verified Partner Consultation
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: '1.3' }}>
              {title}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
              {subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label className="input-label">Full Name / पुरा नाम</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  className="text-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="input-label">Mobile Number / सम्पर्क नम्बर</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98XXXXXXXX"
                  className="text-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="input-label">City / Location</label>
                <select
                  className="select-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="Kathmandu Valley">Kathmandu / Lalitpur / Bhaktapur</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Chitwan">Chitwan (Bharatpur)</option>
                  <option value="Biratnagar">Biratnagar</option>
                  <option value="Butwal">Butwal / Bhairahawa</option>
                  <option value="Nepalgunj">Nepalgunj</option>
                  <option value="Other">Other Districts</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              <span>Request Free Consultation</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', fontSize: '11px', color: '#94a3b8' }}>
              <ShieldCheck size={14} />
              <span>100% Privacy. Your contact will only be shared with authorized advisors.</span>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', marginBottom: '16px' }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Consultation Requested!
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '24px' }}>
              Thank you, {name}. A verified financial specialist will connect with you on {phone} to assist with the best available terms and tax benefits.
            </p>
            <button onClick={onClose} className="btn-secondary" style={{ width: '100%' }}>
              Back to Calculator
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
