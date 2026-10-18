'use client';

import { useEffect } from 'react';

/**
 * Lightweight, zero-dependency, high-performance IntersectionObserver-based 
 * Animate-On-Scroll (AOS) provider for Next.js App Router.
 * Automatically animates elements with `data-aos` attribute on scroll.
 */
export function AOSInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // Re-scan when new DOM elements appear dynamically (e.g. category filter changes)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
