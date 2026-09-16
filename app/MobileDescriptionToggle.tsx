"use client";

import { useEffect } from "react";

const LABELS: Record<string, { more: string; less: string }> = {
  fr: { more: "Lire la suite", less: "Réduire" },
  en: { more: "Read more", less: "Show less" },
  id: { more: "Baca selengkapnya", less: "Tampilkan lebih sedikit" },
  zh: { more: "阅读更多", less: "收起" },
};

export default function MobileDescriptionToggle() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setup = () => {
      const paragraph = document.querySelector<HTMLElement>("#description .prose p");
      if (!paragraph || paragraph.dataset.mobileToggleReady === "1") return false;

      paragraph.dataset.mobileToggleReady = "1";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "mobile-description-toggle";

      const lang = document.documentElement.lang || "en";
      const labels = LABELS[lang] || LABELS.en;
      let expanded = false;

      const media = window.matchMedia("(max-width: 767px) and (orientation: portrait)");

      const render = () => {
        if (!media.matches) {
          paragraph.classList.remove("mobile-description-clamped");
          button.style.display = "none";
          return;
        }

        button.style.display = "inline-flex";
        paragraph.classList.toggle("mobile-description-clamped", !expanded);
        button.textContent = expanded ? labels.less : labels.more;
        button.setAttribute("aria-expanded", String(expanded));
      };

      const onClick = () => {
        expanded = !expanded;
        render();
      };

      button.addEventListener("click", onClick);
      paragraph.insertAdjacentElement("afterend", button);
      media.addEventListener("change", render);
      render();

      cleanup = () => {
        media.removeEventListener("change", render);
        button.removeEventListener("click", onClick);
        button.remove();
        paragraph.classList.remove("mobile-description-clamped");
        delete paragraph.dataset.mobileToggleReady;
      };

      return true;
    };

    if (setup()) return () => cleanup?.();

    const observer = new MutationObserver(() => {
      if (setup()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return null;
}
