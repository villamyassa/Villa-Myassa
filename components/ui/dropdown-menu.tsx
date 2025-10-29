"use client";

/**
 * DropdownMenu minimal sans dépendances externes.
 * Fournit: <DropdownMenu>, <DropdownMenuTrigger>, <DropdownMenuContent>, <DropdownMenuItem>
 * - Positionnement via CSS utilitaires (Tailwind) et small JS
 * - Aucune dépendance "clsx"
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";

type MenuCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
};

const Ctx = createContext<MenuCtx | null>(null);

function useMenuCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("DropdownMenu.* must be used inside <DropdownMenu>");
  return ctx;
}

export function DropdownMenu({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? !!controlledOpen : uncontrolledOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange]
  );

  const triggerRef = useRef<HTMLElement>(null);

  // Fermer sur "Escape" ou clic en dehors
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      const menu = document.getElementById("__dropdown-content");
      if (menu && !menu.contains(t) && triggerRef.current && !triggerRef.current.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, setOpen]);

  const value = useMemo<MenuCtx>(() => ({ open, setOpen, triggerRef }), [open, setOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: {
  asChild?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  const { open, setOpen, triggerRef } = useMenuCtx();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      ref: triggerRef,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      onClick: (e: any) => {
        children.props?.onClick?.(e);
        setOpen(!open);
      },
    });
  }

  return (
    <button
      ref={triggerRef as any}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  align = "center",
  className = "",
  children,
  ...props
}: {
  align?: "start" | "center" | "end";
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const { open, triggerRef } = useMenuCtx();
  const contentRef = useRef<HTMLDivElement>(null);

  // Positionner sous le trigger
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const panel = contentRef.current;
    if (!trigger || !panel) return;

    const rect = trigger.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 8; // 8px offset
    let left = rect.left + window.scrollX;

    // largeur du panel pour alignement
    const panelWidth = panel.offsetWidth || 300;
    if (align === "center") left = left + rect.width / 2 - panelWidth / 2;
    if (align === "end") left = left + rect.width - panelWidth;

    // collisions viewport
    const maxLeft = window.scrollX + (document.documentElement.clientWidth - panelWidth - 8);
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + 8) left = window.scrollX + 8;

    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  }, [open, align, triggerRef]);

  if (!open) return null;

  const base =
    "fixed z-[1000] rounded-xl border border-neutral-200 bg-white shadow-2xl p-1 focus:outline-none";
  return (
    <div
      id="__dropdown-content"
      ref={contentRef}
      className={`${base} ${className}`}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  className = "",
  children,
  onClick,
  ...props
}: {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useMenuCtx();
  const base =
    "w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none flex items-center";
  return (
    <button
      role="menuitem"
      className={`${base} ${className}`}
      onClick={(e) => {
        onClick?.(e);
        // on ferme après l’action
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
