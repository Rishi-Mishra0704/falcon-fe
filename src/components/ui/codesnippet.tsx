"use client"

import { useState } from "react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import go from "react-syntax-highlighter/dist/esm/languages/prism/go"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

// Only the languages the site shows are loaded, to keep the page small.
SyntaxHighlighter.registerLanguage("go", go)
SyntaxHighlighter.registerLanguage("bash", bash)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("html", markup)

export function CodeSnippet({
  code,
  language,
  label,
}: {
  code: string
  language: "bash" | "go" | "sh" | "txt" | "json" | "html"
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const highlight = language === "sh" ? "bash" : language

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden bg-code-background shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-white/60">{label ?? language}</span>
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
          className="h-7 px-2 text-white/70 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      {highlight === "txt" ? (
        <pre className="text-sm p-4 overflow-x-auto font-mono text-white/90" aria-label="code block">
          <code>{code}</code>
        </pre>
      ) : (
        <SyntaxHighlighter
          language={highlight}
          style={oneDark}
          customStyle={{ margin: 0, padding: "1rem", background: "transparent", fontSize: "0.85rem" }}
          codeTagProps={{ style: { fontFamily: "var(--font-mono), ui-monospace, monospace" } }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  )
}
