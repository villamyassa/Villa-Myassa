"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const TAG_ID = "AW-18456944751";
const SEND_TO = `${TAG_ID}/wC8WCKyomIEdEO_A-uBE`;
const STORAGE_KEY = "vm-google-ads-consent-v1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
type Choice = "granted" | "denied";
type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const copy = {
  en: {
    title: "Advertising measurement",
    text: "Allow Google Ads cookies and data sharing with Google to measure clicks to Guesty? This is optional. You can change your choice at any time.",
    accept: "Accept", reject: "Refuse", settings: "Ad measurement settings",
  },
  fr: {
    title: "Mesure publicitaire",
    text: "Autoriser les cookies Google Ads et le partage de données avec Google pour mesurer les clics vers Airbnb ? Ce choix est facultatif et modifiable à tout moment.",
    accept: "Accepter", reject: "Refuser", settings: "Réglages de mesure publicitaire",
  },
  id: {
    title: "Pengukuran iklan",
    text: "Izinkan cookie Google Ads dan berbagi data dengan Google untuk mengukur klik ke Guesty? Ini opsional. Anda dapat mengubah pilihan kapan saja.",
    accept: "Terima", reject: "Tolak", settings: "Pengaturan pengukuran iklan",
  },
  zh: {
    title: "广告效果衡量",
    text: "是否允许 Google Ads Cookie 并与 Google 共享数据，以衡量前往 Airbnb 的点击？此选项非必选，您可以随时更改。",
    accept: "接受", reject: "拒绝", settings: "广告衡量设置",
  },
};

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && (saved.choice === "granted" || saved.choice === "denied") &&
        typeof saved.at === "number" && saved.at <= Date.now() && Date.now() - saved.at < MAX_AGE) {
      return saved.choice;
    }
  } catch { /* Storage may be unavailable; ask again without blocking booking. */ }
  return null;
}

export default function GoogleAdsTracking() {
  const pathname = usePathname();
  const language = pathname.split("/")[1] as keyof typeof copy;
  const t = copy[language] || copy.en;
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const allowed = useRef(false);
  const initialized = useRef(false);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        allowed.current = false;
        setChoice(readChoice());
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    const w = window as TagWindow;
    allowed.current = choice === "granted";
    const consent = {
      ad_storage: choice === "granted" ? "granted" : "denied",
      ad_user_data: choice === "granted" ? "granted" : "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    };
    if (choice !== "granted") {
      if (initialized.current) w.gtag?.("consent", "update", consent);
      return;
    }
    if (initialized.current) {
      w.gtag?.("consent", "update", consent);
      return;
    }
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function () { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", {
      ad_storage: "denied", ad_user_data: "denied",
      ad_personalization: "denied", analytics_storage: "denied",
    });
    w.gtag("consent", "update", consent);
    w.gtag("js", new Date());
    w.gtag("config", TAG_ID, { allow_ad_personalization_signals: false });
    initialized.current = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`;
    document.head.appendChild(script);
  }, [choice]);

  useEffect(() => {
    const track = (event: MouseEvent) => {
      if (!allowed.current || event.defaultPrevented ||
          (event.type === "click" ? event.button !== 0 : event.button !== 1)) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.protocol !== "https:" ||
          !["airbnb.fr", "www.airbnb.fr", "airbnb.com", "www.airbnb.com"].includes(url.hostname) ||
          !/^\/rooms\/1505417552730386824\/?$/.test(url.pathname)) return;
      // Keep native navigation, including new tabs and modifier keys.
      (window as TagWindow).gtag?.("event", "conversion", {
        send_to: SEND_TO, value: 1.0, currency: "EUR", transport_type: "beacon",
      });
    };
    document.addEventListener("click", track);
    document.addEventListener("auxclick", track);
    return () => {
      document.removeEventListener("click", track);
      document.removeEventListener("auxclick", track);
    };
  }, []);

  function choose(next: Choice) {
    allowed.current = next === "granted";
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: next, at: Date.now() })); }
    catch { /* The current visit still honors the choice. */ }
    setChoice(next);
    setShowSettings(false);
  }

  if (!ready) return null;
  if (choice !== null && !showSettings) {
    return <button type="button" onClick={() => setShowSettings(true)}
      className="fixed bottom-3 left-3 z-[60] max-w-[45vw] rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-800 shadow-sm">{t.settings}</button>;
  }
  return (
    <section aria-label={t.title} className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-xl border border-stone-300 bg-white p-5 text-stone-900 shadow-xl">
      <h2 className="text-base font-semibold">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed">{t.text}</p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("denied")} className="flex-1 rounded-lg border border-stone-600 px-4 py-3 text-sm font-medium">{t.reject}</button>
        <button type="button" onClick={() => choose("granted")} className="flex-1 rounded-lg border border-stone-600 px-4 py-3 text-sm font-medium">{t.accept}</button>
      </div>
    </section>
  );
}
