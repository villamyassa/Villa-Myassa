"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AIRBNB_URL = "https://www.airbnb.fr/rooms/1505417552730386824";
const BOOKING_LABELS = new Set([
  "réserver",
  "réserver maintenant",
  "book",
  "book now",
  "pesan",
  "pesan sekarang",
  "预订",
  "立即预订",
]);

export default function BookingRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
        if (anchor.closest("header")) return;

        const label = (anchor.textContent || "").trim().toLowerCase().replace(/\s+/g, " ");
        if (!BOOKING_LABELS.has(label)) return;

        anchor.href = AIRBNB_URL;
        anchor.target = "_blank";
        anchor.rel = "noreferrer noopener";
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
