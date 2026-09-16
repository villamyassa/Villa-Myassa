import * as React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a6ccbf]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "border-[#a6ccbf] bg-[#a6ccbf] text-[#2b4c41] shadow-[0_10px_28px_rgba(79,124,109,0.12)] hover:-translate-y-0.5 hover:border-[#80b2a1] hover:bg-[#80b2a1] hover:text-white hover:shadow-[0_14px_32px_rgba(79,124,109,0.16)]",
  outline:
    "border-[#dae6e1] bg-white/90 text-[#3f514a] shadow-[0_6px_20px_rgba(79,124,109,0.05)] hover:-translate-y-0.5 hover:border-[#80b2a1] hover:bg-[#e7f2ee] hover:text-[#2b4c41] hover:shadow-[0_10px_24px_rgba(79,124,109,0.09)]",
};

const sizes = {
  sm: "h-10 px-4",
  md: "h-11 px-5",
  lg: "h-12 px-7 text-base",
};

export function Button({
  asChild,
  href,
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const cls = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if (asChild && href) {
    return <Link href={href} className={cls} {...(props as any)} />;
  }

  return <button className={cls} {...props} />;
}
