"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { CodeSnippet } from "@/components/ui/codesnippet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Everything on this page comes from docs.json, which is generated from Falcon's source
// code, so the docs can't drift from the code. To change what's shown, change the Go doc
// comments or Example functions in the falcon repository and regenerate docs.json there.

type Docs = {
  packages?: DocType[]
  types: DocType[]
  functions: DocFunction[]
}

// The order packages appear in the API reference, and their import paths.
const packages = [
  { name: "falcon", path: "github.com/ascendingheavens/falcon" },
  { name: "middleware", path: "github.com/ascendingheavens/falcon/middleware" },
  { name: "server", path: "github.com/ascendingheavens/falcon/server" },
]

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export function DocsContent() {
  const [docs, setDocs] = useState<Docs | null>(null)
  const [failed, setFailed] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("/api/docs")
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Docs) => setDocs(data))
      .catch(() => setFailed(true))
  }, [])

  if (failed) {
    return (
      <p className="text-muted-foreground">
        The documentation couldn&apos;t be loaded. It&apos;s also available on{" "}
        <a href="https://pkg.go.dev/github.com/ascendingheavens/falcon" className="text-brand underline">
          pkg.go.dev
        </a>
        .
      </p>
    )
  }
  if (!docs) {
    return <p className="text-muted-foreground animate-pulse">Loading the documentation…</p>
  }

  const overview = (name: string) => docs.packages?.find(p => p.name === name)?.doc ?? ""
  const guide = splitGuide(overview("falcon"))

  return (
    <div className="space-y-14">
      {/* ---------- Guide, from the falcon package's documentation ---------- */}
      <section id="introduction" data-group="Guide" aria-labelledby="heading-introduction">
        <h2 id="heading-introduction" className="text-2xl font-bold">Introduction</h2>
        <DocText text={guide.intro} />
        {guide.features.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {guide.features.map(feature => (
              <div key={feature.title} className="rounded-lg border border-border border-l-4 border-l-brand bg-card p-4 shadow-sm">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {guide.sections.map(section => (
        <section
          key={section.title}
          id={`guide-${slug(section.title)}`}
          data-group="Guide"
          aria-labelledby={`heading-guide-${slug(section.title)}`}
        >
          <h2 id={`heading-guide-${slug(section.title)}`} className="text-2xl font-bold">
            {section.title}
          </h2>
          <DocText text={section.body} />
        </section>
      ))}

      {/* ---------- API reference ---------- */}
      <div className="border-t border-border pt-10">
        <h2 className="text-3xl font-extrabold tracking-tight">API Reference</h2>
        <p className="mt-2 text-muted-foreground">
          Every exported function, type and method. Examples are run by <code>go test</code>, so their output is real.
        </p>
        <label className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Filter by name, such as RateLimit or Render"
            className="w-full bg-transparent text-sm outline-none"
            aria-label="Filter the API reference"
          />
        </label>
      </div>

      {packages.map(pkg => (
        <PackageReference
          key={pkg.name}
          name={pkg.name}
          path={pkg.path}
          overview={overview(pkg.name)}
          functions={docs.functions.filter(f => f.package === pkg.name)}
          types={docs.types.filter(t => t.package === pkg.name)}
          query={query.trim().toLowerCase()}
        />
      ))}
    </div>
  )
}

// splitGuide turns the falcon package's documentation into a guide: the opening text,
// the list of what makes Falcon different as feature cards, and a section per heading.
function splitGuide(doc: string) {
  const [head, ...rest] = doc.split(/^# /m)
  const blocks = docBlocks(head)
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

  // "Package falcon is..." is phrased for Go's tools; a reader just needs "Falcon is...".
  const intro = blocks
    .filter(block => !/^\s+- /.test(block))
    .join("\n\n")
    .replace(/^Package falcon is/, "Falcon is")
  const features = blocks
    .filter(block => /^\s+- /.test(block))
    .flatMap(listItems)
    .map(item => {
      const [title, ...text] = item.split(": ")
      return text.length > 0 ? { title, text: capitalize(text.join(": ")) } : { title: item, text: "" }
    })
  const sections = rest.map(chunk => {
    const [title, ...body] = chunk.split("\n")
    return { title: title.trim(), body: body.join("\n") }
  })

  return { intro, features, sections }
}

function PackageReference({
  name,
  path,
  overview,
  functions,
  types,
  query,
}: {
  name: string
  path: string
  overview: string
  functions: DocFunction[]
  types: DocType[]
  query: string
}) {
  const matches = (entry: { name: string }) => !query || entry.name.toLowerCase().includes(query)
  const shownTypes = types
    .map(t => ({
      ...t,
      methods: (t.methods ?? []).filter(m => matches(t) || matches(m)).sort(byName),
    }))
    .filter(t => matches(t) || t.methods.length > 0)
    .sort(byName)
  const shownFunctions = functions.filter(matches).sort(byName)

  if (query && shownTypes.length === 0 && shownFunctions.length === 0) {
    return null
  }

  return (
    <section id={`package-${name}`} data-group="API reference" aria-labelledby={`heading-package-${name}`}>
      <h2 id={`heading-package-${name}`} className="text-2xl font-bold">
        <span className="text-muted-foreground font-normal">package</span> {name}
      </h2>
      <p className="mt-1 text-sm">
        <code className="rounded bg-muted px-1.5 py-0.5">{path}</code>
      </p>

      {/* The falcon package's overview is the guide above, so only the others repeat theirs here. */}
      {!query && name !== "falcon" && <DocText text={overview} />}

      {shownFunctions.length > 0 && (
        <>
          <h3 className="mt-10 text-lg font-semibold uppercase tracking-wide text-muted-foreground">Functions</h3>
          <div className="mt-4 space-y-5">
            {shownFunctions.map(f => (
              <EntryCard key={f.name} id={`${name}-${f.name}`} kind="func" name={f.name} entry={f} />
            ))}
          </div>
        </>
      )}

      {shownTypes.length > 0 && (
        <>
          <h3 className="mt-10 text-lg font-semibold uppercase tracking-wide text-muted-foreground">Types</h3>
          <div className="mt-4 space-y-5">
            {shownTypes.map(t => (
              <EntryCard key={t.name} id={`${name}-${t.name}`} kind="type" name={t.name} entry={t}>
                {t.methods.length > 0 && (
                  <Accordion type="single" collapsible defaultValue={query ? "methods" : undefined} className="mt-4">
                    <AccordionItem value="methods" className="rounded-md border border-border px-3">
                      <AccordionTrigger className="text-sm font-semibold">
                        {t.methods.length} {t.methods.length === 1 ? "method" : "methods"}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {t.methods.map(m => (
                          <EntryCard
                            key={m.name}
                            id={`${name}-${t.name}-${m.name}`}
                            kind="method"
                            name={`${t.name}.${m.name}`}
                            entry={m}
                            nested
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </EntryCard>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

const kindStyles = {
  func: "bg-brand text-brand-foreground",
  type: "bg-primary text-primary-foreground",
  method: "bg-secondary text-secondary-foreground border border-border",
}

function EntryCard({
  id,
  kind,
  name,
  entry,
  nested,
  children,
}: {
  id: string
  kind: keyof typeof kindStyles
  name: string
  entry: { doc: string; code?: string; examples?: DocExample[] }
  nested?: boolean
  children?: React.ReactNode
}) {
  return (
    <div id={id} className={nested ? "rounded-md bg-muted/50 p-4" : "rounded-xl border border-border bg-card p-5 shadow-sm"}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${kindStyles[kind]}`}>
          {kind}
        </span>
        <h4 className="font-mono text-base font-semibold break-all">{name}</h4>
      </div>
      {entry.code && (
        <div className="mt-3">
          <CodeSnippet language="go" label="signature" code={entry.code} />
        </div>
      )}
      <DocText text={entry.doc} />
      {(entry.examples ?? []).map((example, i) => (
        <ExampleBlock key={i} example={example} />
      ))}
      {children}
    </div>
  )
}

function ExampleBlock({ example }: { example: DocExample }) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-brand">
        Example{example.name ? `: ${example.name.replaceAll("_", " ")}` : ""}
      </p>
      <div className="mt-2">
        <CodeSnippet language="go" label="example" code={example.code} />
      </div>
      {example.output && (
        <div className="mt-2">
          <CodeSnippet language="txt" label="output" code={example.output.trimEnd()} />
        </div>
      )}
    </div>
  )
}

// listItems splits a Go doc list into its items. An item can continue on the following,
// more indented, lines.
function listItems(block: string) {
  return block.split(/\n(?=\s+- )/).map(item => item.replace(/^\s+- /, "").replace(/\s*\n\s*/g, " "))
}

// InlineText shows Go doc links, such as [Server.Start], as code.
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[A-Za-z][\w.]*\])/g)
  return (
    <>
      {parts.map((part, i) =>
        /^\[[A-Za-z][\w.]*\]$/.test(part) ? (
          <code key={i} className="rounded bg-muted px-1 py-0.5 text-[0.9em] text-foreground">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}

const isCode = (block: string) => block.split("\n").every(line => line.startsWith("\t") || line.trim() === "")

// docBlocks splits a Go doc comment into blocks at blank lines. Code can contain blank
// lines too, so consecutive code blocks are joined back into one, as go doc does.
// Only blank lines are trimmed at the start, because a tab there means code.
function docBlocks(text: string) {
  const blocks: string[] = []
  for (const block of text.replace(/^\s*\n/, "").trimEnd().split(/\n[ \t]*\n/)) {
    if (blocks.length > 0 && isCode(block) && isCode(blocks[blocks.length - 1])) {
      blocks[blocks.length - 1] += "\n\n" + block
    } else {
      blocks.push(block)
    }
  }
  return blocks
}

// DocText renders a Go doc comment, which has headings ("# Title"), lists ("  - item"),
// code (lines indented with a tab) and paragraphs, separated by blank lines.
function DocText({ text }: { text: string }) {
  if (!text.trim()) {
    return null
  }

  return (
    <>
      {docBlocks(text).map((block, i) => {
          const lines = block.split("\n")

          if (lines.length === 1 && lines[0].startsWith("# ")) {
            return (
              <h3 key={i} className="mt-8 text-xl font-semibold">
                {lines[0].slice(2)}
              </h3>
            )
          }

          if (isCode(block)) {
            const code = lines.map(line => line.replace(/^\t/, "")).join("\n")
            const language = code.startsWith("go get") ? "bash" : code.trimStart().startsWith("{") ? "json" : "go"
            return (
              <div key={i} className="mt-4">
                <CodeSnippet language={language} code={code} />
              </div>
            )
          }

          if (/^\s+- /.test(lines[0])) {
            return (
              <ul key={i} className="mt-3 list-disc pl-6 text-muted-foreground space-y-1">
                {listItems(block).map((item, j) => (
                  <li key={j}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            )
          }

          return (
            <p key={i} className="mt-3 leading-7 text-muted-foreground">
              <InlineText text={block.replace(/\s*\n\s*/g, " ")} />
            </p>
          )
        })}
    </>
  )
}
