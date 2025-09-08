import * as React from "react"
import Link from "next/link"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  href?: string
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

const base =
  "inline-flex items-center justify-center rounded-2xl border text-sm font-medium transition px-4 py-2 shadow-sm hover:shadow"

const variants = {
  default: "bg-black text-white border-black/10",
  outline: "bg-white text-black border-black/10"
}

const sizes = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-5 text-base"
}

export function Button({
  asChild,
  href,
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const cls = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ")
  if (asChild && href) {
    return <Link href={href} className={cls} {...(props as any)} />
  }
  return <button className={cls} {...props} />
}
