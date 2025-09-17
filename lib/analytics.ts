// lib/analytics.ts
declare global {
  interface Window {
    __vm_fbq?: (...args: any[]) => void;
    __vm_ttq?: any;
  }
}

export const trackPageView = (props?: Record<string, any>) => {
  try { window.__vm_fbq?.("track", "PageView", props || {}); } catch {}
  try { window.__vm_ttq?.page?.(); } catch {}
};

export const trackViewContent = (props?: Record<string, any>) => {
  try { window.__vm_fbq?.("track", "ViewContent", props || {}); } catch {}
  try { window.__vm_ttq?.track?.("ViewContent", props || {}); } catch {}
};

export const trackLead = (props?: Record<string, any>) => {
  try { window.__vm_fbq?.("track", "Lead", props || {}); } catch {}
  try { window.__vm_ttq?.track?.("AddToCart", props || {}); } catch {}
};

export const trackContact = (props?: Record<string, any>) => {
  try { window.__vm_fbq?.("track", "Contact", props || {}); } catch {}
  try { window.__vm_ttq?.track?.("Contact", props || {}); } catch {}
};

export const trackSubmitForm = (props?: Record<string, any>) => {
  try { window.__vm_fbq?.("track", "SubmitApplication", props || {}); } catch {}
  try { window.__vm_ttq?.track?.("SubmitForm", props || {}); } catch {}
};
