"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CodeSnippet({
  code,
  language,
  label,
}: {
  code: string
  language: "bash" | "go" | "sh" | "txt"
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="w-full rounded-md border border-border overflow-hidden bg-card">
      <div className="flex items-center justify-between bg-muted px-3 py-2">
        <span className="text-xs text-muted-foreground">{label ?? language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code)
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            } catch {
              // ignore
            }
          }}
          className="h-7 px-2"
        >
          <Copy className="h-4 w-4 mr-1" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className={cn("text-sm p-4 overflow-x-auto font-mono", "bg-card text-foreground")} aria-label="code block">
        <code>{code}</code>
      </pre>
    </div>
  )
}
