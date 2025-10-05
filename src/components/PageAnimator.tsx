"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageAnimator({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Add initial page fade-in
    const root = document.documentElement;
    root.classList.remove("page-fade-leave");
    root.classList.add("page-fade-enter");
    const t = setTimeout(() => {
      root.classList.remove("page-fade-enter");
    }, 500);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    // IntersectionObserver for elements with data-animate
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("in-view");
          } else {
            el.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    const observeAll = () => {
      const els = document.querySelectorAll("[data-animate]");
      els.forEach((el) => observer.observe(el));
    };

    // Auto-add data-animate to existing <section> tags so public pages animate without edits
    const addToSections = (root: ParentNode = document) => {
      const secs = Array.from(root.querySelectorAll('section')) as HTMLElement[];
      secs.forEach((s) => {
        if (!s.hasAttribute('data-animate')) s.setAttribute('data-animate', '');
      });
    };

    addToSections();
    observeAll();

    // Watch for new sections added dynamically
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList' && m.addedNodes.length) {
          m.addedNodes.forEach((n) => {
            if (!(n instanceof HTMLElement)) return;
            if (n.tagName.toLowerCase() === 'section') {
              if (!n.hasAttribute('data-animate')) n.setAttribute('data-animate', '');
              observer.observe(n);
            } else {
              // In case a subtree with sections was added
              addToSections(n as ParentNode);
              observeAll();
            }
          });
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return <>{children}</>;
}
