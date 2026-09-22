"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GUESTY_URL = "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
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

        anchor.href = GUESTY_URL;
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
