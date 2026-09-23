"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = "25598835056413193";
const STORAGE_KEY = "vm-ads-consent-v2";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

type Choice = "granted" | "denied";

type Fbq = ((...args: unknown[]) => void) & {
  queue: unknown[][];
  loaded: boolean;
  version: string;
  callMethod?: (...args: unknown[]) => void;
};

type MetaWindow = Window & {
  fbq?: Fbq;
  _fbq?: Fbq;
};

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (
      saved &&
      (saved.choice === "granted" || saved.choice === "denied") &&
      typeof saved.at === "number" &&
      saved.at <= Date.now() &&
      Date.now() - saved.at < MAX_AGE
    ) {
      return saved.choice;
    }
  } catch {
    // Storage may be unavailable.
  }
  return null;
}

function ensurePixel() {
  const w = window as MetaWindow;
  if (!w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as Fbq;

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    w.fbq = fbq;
    w._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  w.fbq?.("init", PIXEL_ID);
}

export default function MetaPixelTracking() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const initialized = useRef(false);
  const allowed = useRef(false);

  useEffect(() => {
    const sync = () => setChoice(readChoice());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("vm-ads-consent-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("vm-ads-consent-changed", sync);
    };
  }, []);

  useEffect(() => {
    allowed.current = choice === "granted";
    if (choice !== "granted") return;

    ensurePixel();
    initialized.current = true;
    (window as MetaWindow).fbq?.("track", "PageView");
  }, [choice, pathname]);

  useEffect(() => {
    const track = (event: MouseEvent) => {
      if (!allowed.current || !initialized.current || event.defaultPrevented) return;
      const anchor =
        event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = new URL(anchor.href);
      const isAirbnb =
        url.protocol === "https:" &&
        ["airbnb.fr", "www.airbnb.fr", "airbnb.com", "www.airbnb.com"].includes(
          url.hostname
        ) &&
        /^\/rooms\/1505417552730386824\/?$/.test(url.pathname);

      if (!isAirbnb) return;

      (window as MetaWindow).fbq?.("trackCustom", "AirbnbClick", {
        destination: "Airbnb",
        listing_id: "1505417552730386824",
      });
    };

    document.addEventListener("click", track);
    document.addEventListener("auxclick", track);
    return () => {
      document.removeEventListener("click", track);
      document.removeEventListener("auxclick", track);
    };
  }, []);

  return null;
}
