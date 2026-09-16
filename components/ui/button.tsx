import * as React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66846f]/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "border-[#3d5b48] bg-[#3d5b48] text-white shadow-[0_10px_28px_rgba(45,72,55,0.13)] hover:-translate-y-0.5 hover:border-[#66846f] hover:bg-[#66846f] hover:shadow-[0_14px_32px_rgba(45,72,55,0.17)]",
  outline:
    "border-[#dae0d8] bg-white/90 text-[#354239] shadow-[0_6px_20px_rgba(48,65,53,0.06)] hover:-translate-y-0.5 hover:border-[#66846f] hover:bg-[#e2ebe2] hover:text-[#3d5b48] hover:shadow-[0_10px_24px_rgba(48,65,53,0.1)]",
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
