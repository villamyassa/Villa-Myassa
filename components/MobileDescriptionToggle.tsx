"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const LABELS: Record<string, { more: string; less: string }> = {
  fr: { more: "Lire la suite", less: "Réduire" },
  en: { more: "Read more", less: "Show less" },
  id: { more: "Baca selengkapnya", less: "Tampilkan lebih sedikit" },
  zh: { more: "阅读更多", less: "收起" },
};

export default function MobileDescriptionToggle() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = () => {};

    const setup = () => {
      const section = document.getElementById("description");
      const paragraph = section?.querySelector(".prose p") as HTMLParagraphElement | null;
      if (!section || !paragraph) return false;

      const existing = section.querySelector("[data-mobile-description-toggle]");
      if (existing) existing.remove();

      const lang = pathname?.split("/").filter(Boolean)[0] || "en";
      const labels = LABELS[lang] || LABELS.en;
      let expanded = false;

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-mobile-description-toggle", "true");
      button.className =
        "mt-3 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm md:hidden";

      const apply = () => {
        const portraitMobile = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;

        if (!portraitMobile) {
          paragraph.style.display = "block";
          paragraph.style.webkitBoxOrient = "initial";
          paragraph.style.webkitLineClamp = "initial";
          paragraph.style.overflow = "visible";
          button.style.display = "none";
          return;
        }

        button.style.display = "inline-flex";
        button.textContent = expanded ? labels.less : labels.more;
        button.setAttribute("aria-expanded", String(expanded));

        if (expanded) {
          paragraph.style.display = "block";
          paragraph.style.webkitBoxOrient = "initial";
          paragraph.style.webkitLineClamp = "initial";
          paragraph.style.overflow = "visible";
        } else {
          paragraph.style.display = "-webkit-box";
          paragraph.style.webkitBoxOrient = "vertical";
          paragraph.style.webkitLineClamp = "6";
          paragraph.style.overflow = "hidden";
        }
      };

      button.addEventListener("click", () => {
        expanded = !expanded;
        apply();
      });

      paragraph.insertAdjacentElement("afterend", button);
      apply();
      window.addEventListener("resize", apply);
      window.addEventListener("orientationchange", apply);

      cleanup = () => {
        window.removeEventListener("resize", apply);
        window.removeEventListener("orientationchange", apply);
        button.remove();
        paragraph.style.display = "";
        paragraph.style.webkitBoxOrient = "";
        paragraph.style.webkitLineClamp = "";
        paragraph.style.overflow = "";
      };

      return true;
    };

    if (!setup()) {
      const observer = new MutationObserver(() => {
        if (setup()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      const timer = window.setTimeout(() => observer.disconnect(), 5000);
      return () => {
        window.clearTimeout(timer);
        observer.disconnect();
        cleanup();
      };
    }

    return () => cleanup();
  }, [pathname]);

  return null;
}
