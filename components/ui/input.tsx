import * as React from "react"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={["h-11 w-full rounded-xl border px-3 outline-none focus:ring-2 focus:ring-black/20", className].join(" ")}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
