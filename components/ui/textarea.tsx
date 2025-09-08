import * as React from "react"

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={["min-h-[120px] w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20", className].join(" ")}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"
