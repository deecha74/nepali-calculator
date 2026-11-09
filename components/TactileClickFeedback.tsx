'use client';

import { useEffect } from 'react';

export function TactileClickFeedback() {
  useEffect(() => {
    let audioCtx: AudioContext | null = null;

    const playSubtleClick = () => {
      try {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtx = new AudioContextClass();
          }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (audioCtx && audioCtx.state === 'running') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(420, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.035);

          gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + 0.036);
        }
      } catch {
        // Ignore audio errors gracefully
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        'button, [role="button"], .btn-primary, .btn-secondary, .neu-btn, .hover-lift, .btn-tactile, a.btn'
      );
      if (target) {
        // Haptic feedback on mobile / vibration-enabled devices
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(10);
          } catch {
            // Safe fallback
          }
        }
        // Subtle micro tactile sound
        playSubtleClick();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return null;
}

