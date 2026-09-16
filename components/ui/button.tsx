import * as React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-wide backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7eee7]/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "border-[#b7dacf]/70 bg-[#d7eee7]/75 text-[#3a5b50] shadow-[0_8px_24px_rgba(79,124,109,0.08)] hover:-translate-y-0.5 hover:border-[#a0cdbf]/80 hover:bg-[#b5dbcf]/90 hover:text-[#2d4e43] hover:shadow-[0_12px_28px_rgba(79,124,109,0.12)]",
  outline:
    "border-[#e0ebe7]/90 bg-white/70 text-[#52645e] shadow-[0_6px_20px_rgba(79,124,109,0.05)] hover:-translate-y-0.5 hover:border-[#b7dacf]/90 hover:bg-[#eff8f5]/90 hover:text-[#3a5b50] hover:shadow-[0_10px_24px_rgba(79,124,109,0.08)]",
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
