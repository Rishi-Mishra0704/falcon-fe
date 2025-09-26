import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { CodeSnippet } from "@/components/ui/codesnippet"
import { Code2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Falcon — Minimalistic Go Web Framework
        </h2>
        <p className="text-gray-700 max-w-xl mb-6">
          High-performance, minimal, and developer-friendly framework to build Go web
          applications effortlessly.
        </p>
        <div className="flex gap-4 mb-12">
          <a href="/docs">
            <Button>Get Started</Button>
          </a>
          <a
            href="https://github.com/AscendingHeavens/falcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">View on GitHub</Button>
          </a>
        </div>
      </section>

      {/* Install Section */}
      <section className="w-full bg-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <CodeSnippet
            language="bash"
            label="Install"
            code={`go get github.com/AscendingHeavens/falcon`}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Why Falcon?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Blazing Fast</h4>
              <p className="text-gray-700">
                Falcon is optimized for performance and minimal overhead, making
                your Go web apps lightning fast.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Minimal & Flexible</h4>
              <p className="text-gray-700">
                Build exactly what you need without unnecessary boilerplate.
                Falcon provides simple yet powerful abstractions.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Developer-Friendly</h4>
              <p className="text-gray-700">
                Clean API, structured documentation, and middleware support make
                development smooth and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart Section */}
      <section className="px-6 md:px-8 pb-20">
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardHeader className="flex items-center md:items-start">
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Quickstart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeSnippet
                language="go"
                label="main.go"
                code={`package main

import (
  "net/http"
  framework "github.com/AscendingHeavens/falcon"
)

func main() {
  app := framework.New()

  app.GET("/hello/:name", func(c framework.Context) error {
    name := c.Param("name")
    return c.JSON(http.StatusOK, map[string]string{"message": "Hello " + name})
  })

  app.Listen(":8080")
}`}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="w-full bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Highlights</h3>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-3 max-w-2xl mx-auto">
            <li>Built-in routing, middleware, and context handling</li>
            <li>Template rendering with hot reload in dev mode</li>
            <li>JSON, XML, Form, and Multipart body binding</li>
            <li>JWT authentication middleware ready to use</li>
            <li>CORS and CSRF protection out-of-the-box</li>
            <li>Validation middleware using go-playground/validator</li>
            <li>Simple, extensible, and production-ready</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
