import * as React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#807058]/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "border-[#5b4e3d] bg-[#5b4e3d] text-white shadow-[0_10px_28px_rgba(67,58,46,0.14)] hover:-translate-y-0.5 hover:border-[#806f58] hover:bg-[#806f58] hover:shadow-[0_14px_32px_rgba(67,58,46,0.18)]",
  outline:
    "border-[#d8d0c5] bg-white/90 text-[#3f3b36] shadow-[0_6px_20px_rgba(60,52,43,0.06)] hover:-translate-y-0.5 hover:border-[#806f58] hover:text-[#5b4e3d] hover:shadow-[0_10px_24px_rgba(60,52,43,0.1)]",
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
