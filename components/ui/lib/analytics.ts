// lib/analytics.ts
// Helpers unifiés pour Meta Pixel (fbq) et TikTok Pixel (ttq)

declare global {
  interface Window {
    __vm_fbq?: (...args: any[]) => void;
    __vm_ttq?: any;
  }
}

/** Page vue (général) */
export const trackPageView = (props?: Record<string, any>) => {
  try {
    window.__vm_fbq?.("track", "PageView", props || {});
  } catch {}
  try {
    // ttq.page() existe mais on renvoie aussi un ViewContent simple
    window.__vm_ttq?.page?.();
  } catch {}
};

/** Vue de contenu (page/section importante) */
export const trackViewContent = (props?: Record<string, any>) => {
  try {
    window.__vm_fbq?.("track", "ViewContent", props || {});
  } catch {}
  try {
    window.__vm_ttq?.track?.("ViewContent", props || {});
  } catch {}
};

/** Intention forte (clic Réserver, etc.) */
export const trackLead = (props?: Record<string, any>) => {
  try {
    window.__vm_fbq?.("track", "Lead", props || {});
  } catch {}
  try {
    // Pas d'event "Lead" standard côté TikTok : on utilise AddToCart comme intention
    window.__vm_ttq?.track?.("AddToCart", props || {});
  } catch {}
};

/** Contact (clic WhatsApp, bouton contact) */
export const trackContact = (props?: Record<string, any>) => {
  try {
    window.__vm_fbq?.("track", "Contact", props || {});
  } catch {}
  try {
    window.__vm_ttq?.track?.("Contact", props || {});
  } catch {}
};

/** Envoi de formulaire (mailto ou vrai submit) */
export const trackSubmitForm = (props?: Record<string, any>) => {
  try {
    // Pas d'event "SubmitForm" par défaut Meta : on s'approche avec SubmitApplication
    window.__vm_fbq?.("track", "SubmitApplication", props || {});
  } catch {}
  try {
    window.__vm_ttq?.track?.("SubmitForm", props || {});
  } catch {}
};
