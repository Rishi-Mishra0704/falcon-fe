"use client"

import { CodeSnippet } from "@/components/ui/codesnippet"

export function DocsContent() {
  return (
    <div className="space-y-12">
      <section id="introduction" aria-labelledby="heading-introduction">
        <h2 id="heading-introduction" className="text-2xl font-bold">
          Introduction
        </h2>
        <p className="mt-3 text-muted-foreground">
          Your Go Framework is a minimal, fast toolkit for building HTTP services. It focuses on clear APIs, predictable
          performance, and a smooth developer experience.
        </p>
      </section>

      <section id="installation" aria-labelledby="heading-installation">
        <h2 id="heading-installation" className="text-2xl font-bold">
          Installation
        </h2>
        <p className="mt-3 text-muted-foreground">Install the framework using go get:</p>
        <div className="mt-3">
          <CodeSnippet language="bash" code={`go get github.com/AscendingHeavens/falcon`} />
        </div>
      </section>

      <section id="getting-started" aria-labelledby="heading-getting-started">
        <h2 id="heading-getting-started" className="text-2xl font-bold">
          Getting Started
        </h2>
        <p className="mt-3 text-muted-foreground">Create a new main.go and start a server:</p>
        <div className="mt-3">
          <CodeSnippet
            language="go"
            code={`package main

import (
  "net/http"
  framework "github.com/AscendingHeavens/falcon"
)

func main() {
  app := framework.New()

  app.GET("/", func(c framework.Context) error {
    return c.String(http.StatusOK, "Hello, World!")
  })

  app.Listen(":8080")
}`}
          />
        </div>
      </section>

      <section id="routing" aria-labelledby="heading-routing">
        <h2 id="heading-routing" className="text-2xl font-bold">
          Routing
        </h2>
        <p className="mt-3 text-muted-foreground">Define routes with HTTP verbs and path parameters:</p>
        <div className="mt-3">
          <CodeSnippet
            language="go"
            code={`app.GET("/users/:id", func(c framework.Context) error {
  id := c.Param("id")
  return c.JSON(200, map[string]string{"id": id})
})`}
          />
        </div>
      </section>

      <section id="middleware" aria-labelledby="heading-middleware">
        <h2 id="heading-middleware" className="text-2xl font-bold">
          Middleware
        </h2>
        <p className="mt-3 text-muted-foreground">Use middleware for logging, auth, and more:</p>
        <div className="mt-3">
          <CodeSnippet
            language="go"
            code={`app.Use(framework.Logger())
app.Use(func(next framework.Handler) framework.Handler {
  return func(c framework.Context) error {
    // before
    err := next(c)
    // after
    return err
  }
})`}
          />
        </div>
      </section>

      <section id="cli" aria-labelledby="heading-cli">
        <h2 id="heading-cli" className="text-2xl font-bold">
          CLI
        </h2>
        <p className="mt-3 text-muted-foreground">If you provide a CLI, here’s an example init command:</p>
        <div className="mt-3">
          <CodeSnippet language="bash" code={`yourfw init my-service && cd my-service && go run .`} />
        </div>
      </section>
    </div>
  )
}
