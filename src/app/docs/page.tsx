"use client"

import Link from "next/link"

import { DocsSidebar } from "@/components/ui/docssidebar"
import { DocsContent } from "@/components/ui/docscontent"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  return (
    <main className="bg-background">
      
      <section className="px-4 md:px-8 py-10">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          
          {/* Sidebar */}
          <aside
            className="md:sticky md:top-4 h-max"
            aria-label="Documentation Sidebar"
          >
            <DocsSidebar />
          </aside>

          {/* Main Documentation Content */}
          <article
            className="prose dark:prose-invert max-w-3xl"
            aria-label="Documentation Content"
          >
            <header className="mb-6 border-b border-border pb-4">
              <h1 className="text-3xl font-extrabold">Documentation</h1>
              <p className="mt-2 text-muted-foreground">
                Learn how to install, configure, and deploy your Go framework.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Button asChild>
                  <Link href="https://pkg.go.dev/github.com/ascendingheavens/falcon">Getting Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                >
                  <Link
                    href="https://github.com/AscendingHeavens/falcon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </Button>
              </div>
            </header>

            <DocsContent />
          </article>
        </div>
      </section>
    </main>
  )
}
