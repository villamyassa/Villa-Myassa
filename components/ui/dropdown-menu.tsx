
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  HTMLAttributes,
} from "react";
import clsx from "clsx";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
};
const MenuCtx = createContext<Ctx | null>(null);
const useMenu = () => {
  const ctx = useContext(MenuCtx);
  if (!ctx) throw new Error("DropdownMenu.* must be used inside <DropdownMenu>");
  return ctx;
};

type RootProps = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
};
export function DropdownMenu({ open, onOpenChange, children }: RootProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  const isOpen = open ?? internalOpen;
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    else setInternalOpen(v);
  };

  const value = useMemo(() => ({ open: isOpen, setOpen, triggerRef }), [isOpen]);

  // Fermer à ESC / clic extérieur
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current && triggerRef.current.contains(t)) return;
      const content = document.getElementById("__dm-content__");
      if (content && content.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen]);

  return <MenuCtx.Provider value={value}>{children}</MenuCtx.Provider>;
}

type TriggerProps = {
  asChild?: boolean;
  children: React.ReactElement;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function DropdownMenuTrigger({ asChild, children, ...rest }: TriggerProps) {
  const { open, setOpen, triggerRef } = useMenu();

  const props = {
    ref: triggerRef as React.Ref<any>,
    "aria-haspopup": "menu",
    "aria-expanded": open,
    onClick: (e: React.MouseEvent) => {
      rest.onClick?.(e);
      setOpen(!open);
    },
  };

  if (asChild) {
    return React.cloneElement(children, { ...children.props, ...props });
  }
  return (
    <button type="button" {...rest} {...props} className={clsx("inline-flex items-center", rest.className)}>
      {children}
    </button>
  );
}

type ContentProps = {
  align?: "start" | "center" | "end";
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * IMPORTANT :
 * Placez un conteneur parent avec `relative` autour du Trigger/Content.
 * (Dans votre page vous avez déjà `className="relative flex ..."` 👍)
 */
export function DropdownMenuContent({ align = "center", className, children, ...rest }: ContentProps) {
  const { open } = useMenu();
  if (!open) return null;

  const alignClass =
    align === "start"
      ? "left-0"
      : align === "end"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      id="__dm-content__"
      role="menu"
      {...rest}
      className={clsx(
        "absolute top-full mt-2 z-[1000] min-w-[12rem] rounded-xl border bg-white shadow-xl outline-none",
        alignClass,
        "p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

type ItemProps = {
  inset?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

export function DropdownMenuItem({ inset, className, children, onClick, ...rest }: ItemProps) {
  const { setOpen } = useMenu();
  return (
    <div
      role="menuitem"
      tabIndex={0}
      {...rest}
      onClick={(e) => {
        rest.onClick?.(e as any);
        onClick?.();
        // fermer après clic
        setOpen(false);
      }}
      className={clsx(
        "flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-100",
        inset && "pl-8",
        className
      )}
    >
      {children}
    </div>
  );
}
