"use client"

import { CodeSnippet } from "@/components/ui/codesnippet"

export function DocsContent() {
  return (
    <div className="space-y-12">
      {/* ---------------- Introduction ---------------- */}
      <section id="introduction" aria-labelledby="heading-introduction">
        <h2 id="heading-introduction" className="text-2xl font-bold">Introduction</h2>
        <p className="mt-3 text-muted-foreground">
          Falcon is a minimal and fast Go framework for building HTTP services. 
          It provides a clear API, predictable performance, and a smooth developer experience.
        </p>
      </section>

      {/* ---------------- Installation ---------------- */}
      <section id="installation" aria-labelledby="heading-installation">
        <h2 id="heading-installation" className="text-2xl font-bold">Installation</h2>
        <p className="mt-3 text-muted-foreground">Install Falcon using:</p>
        <div className="mt-3">
          <CodeSnippet language="bash" code={`go get github.com/AscendingHeavens/falcon`} />
        </div>
      </section>

      {/* ---------------- Getting Started ---------------- */}
      <section id="getting-started" aria-labelledby="heading-getting-started">
        <h2 id="heading-getting-started" className="text-2xl font-bold">Getting Started</h2>
        <p className="mt-3 text-muted-foreground">
          Create a new <code>main.go</code> and start a Falcon server:
        </p>
        <div className="mt-3">
          <CodeSnippet language="go" code={`package main

import (
  "net/http"
  framework "github.com/AscendingHeavens/falcon"
)

func main() {
  app := framework.New()

  app.GET("/", func(c framework.Context) error {
    return c.String(http.StatusOK, "Hello, World!")
  })

  app.Start(":8080")
}`} />
        </div>
      </section>

      {/* ---------------- Routing ---------------- */}
      <section id="routing" aria-labelledby="heading-routing">
        <h2 id="heading-routing" className="text-2xl font-bold">Routing</h2>
        <p className="mt-3 text-muted-foreground">
          Define routes with HTTP verbs and path parameters:
        </p>
        <div className="mt-3">
          <CodeSnippet language="go" code={`app.GET("/users/:id", func(c framework.Context) error {
  id := c.Param("id")
  return c.JSON(200, map[string]string{"id": id})
})`} />
        </div>
      </section>

      {/* ---------------- Middleware ---------------- */}
      <section id="middleware" aria-labelledby="heading-middleware">
        <h2 id="heading-middleware" className="text-2xl font-bold">Middleware</h2>
        <p className="mt-3 text-muted-foreground">
          Use middleware for logging, authentication, and more:
        </p>
        <div className="mt-3">
          <CodeSnippet language="go" code={`app.Use(framework.Logger())

app.Use(func(next framework.HandlerFunc) framework.HandlerFunc {
  return func(c framework.Context) error {
    // before
    err := next(c)
    // after
    return err
  }
})`} />
        </div>
      </section>

      {/* ---------------- CLI ---------------- */}
      <section id="cli" aria-labelledby="heading-cli">
        <h2 id="heading-cli" className="text-2xl font-bold">CLI</h2>
        <p className="mt-3 text-muted-foreground">
          Example CLI command to initialize a new service:
        </p>
        <div className="mt-3">
          <CodeSnippet language="bash" code={`falcon init my-service && cd my-service && go run .`} />
        </div>
      </section>

      {/* ---------------- Constants ---------------- */}
      <section id="constants" aria-labelledby="heading-constants">
        <h2 id="heading-constants" className="text-2xl font-bold">Constants</h2>
        <p className="mt-3 text-muted-foreground">
          Falcon currently does not define any constants.
        </p>
      </section>

      {/* ---------------- Variables ---------------- */}
      <section id="variables" aria-labelledby="heading-variables">
        <h2 id="heading-variables" className="text-2xl font-bold">Variables</h2>
        <p className="mt-3 text-muted-foreground">
          Falcon currently does not define any variables.
        </p>
      </section>

      {/* ---------------- Functions ---------------- */}
      <section id="functions" aria-labelledby="heading-functions">
        <h2 id="heading-functions" className="text-2xl font-bold">Functions</h2>

        <h3 className="text-xl font-semibold mt-6">func NewTemplateRenderer</h3>
        <p className="mt-2 text-muted-foreground">
          Encapsulates <code>server.NewTemplateRenderer</code>.
        </p>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func NewTemplateRenderer(pattern string, devMode bool, funcs template.FuncMap) *server.TemplateRenderer
// Creates a new template renderer with optional development mode and custom functions`} />
        </div>
      </section>

      {/* ---------------- Types ---------------- */}
      <section id="types" aria-labelledby="heading-types">
        <h2 id="heading-types" className="text-2xl font-bold">Types</h2>

        <h3 className="text-xl font-semibold mt-6">type ConditionalMiddleware</h3>
        <p className="mt-2 text-muted-foreground">
          Pairs a pattern (e.g. <code>"/api/*"</code>) with a Middleware function.
        </p>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type ConditionalMiddleware = middleware.ConditionalMiddleware
// Associates a URL pattern with a middleware function`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type Context</h3>
        <p className="mt-2 text-muted-foreground">
          Wraps the request and response writer and provides convenience methods (params, body parsing, etc.).
        </p>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type Context = server.Context
// Provides methods for accessing request parameters, body, and writing responses`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type Group</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type Group struct {
  Prefix string
  Server *Server
  Middlewares []middleware.Middleware
}`} />
        </div>
        <p className="mt-2 text-muted-foreground">
          Represents a collection of routes sharing a common prefix and middleware stack. Useful for organizing related endpoints like <code>/api/v1/*</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">type HandlerFunc</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type HandlerFunc = server.HandlerFunc
// Function signature for route handlers: accepts *Context and returns *Response`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type Middleware</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type Middleware = middleware.Middleware
// Wraps and modifies a HandlerFunc`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type Response</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type Response = server.Response
// Unified return type from handlers, encoded as JSON`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type Server</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type Server struct {
  // internal fields
}`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type TLSStarter</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type TLSStarter interface {
  // startTLSServer method
}`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">type TemplateRenderer</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`type TemplateRenderer = server.TemplateRenderer
// Responsible for rendering HTML templates within Falcon`} />
        </div>
      </section>

      {/* ---------------- Server Methods ---------------- */}
      <section id="server-methods" aria-labelledby="heading-server-methods">
        <h2 className="text-2xl font-bold mt-8">Server Methods</h2>

        <h3 className="text-xl font-semibold mt-6">func New</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func New() *Server
// Creates a new Falcon Server instance`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">func (*Server) GET / POST / PUT / PATCH / DELETE</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func (s *Server) GET(path string, handler HandlerFunc)
func (s *Server) POST(path string, handler HandlerFunc)
func (s *Server) PUT(path string, handler HandlerFunc)
func (s *Server) PATCH(path string, handler HandlerFunc)
func (s *Server) DELETE(path string, handler HandlerFunc)
// Registers a route with the corresponding HTTP method`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">func (*Server) Group</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func (s *Server) Group(prefix string) *Group
// Creates a route group with common prefix and middleware stack`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">func (*Server) Use / UseIf</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func (s *Server) Use(mw Middleware)
func (s *Server) UseIf(pattern string, mw Middleware)
// Registers global or conditional middleware`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">func (*Server) ServeHTTP</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request)
// Implements http.Handler, executes the route handler, writes Response`} />
        </div>

        <h3 className="text-xl font-semibold mt-6">func (*Server) Start / StartTLS / StartAutoTLS / StartAutoTLSWithStarter</h3>
        <div className="mt-3">
          <CodeSnippet language="go" code={`func (s *Server) Start(addr string)
func (s *Server) StartTLS(addr, certFile, keyFile string)
func (s *Server) StartAutoTLS(domain string)
func (s *Server) StartAutoTLSWithStarter(domain string, starter TLSStarter)
// Starts the server with optional TLS or automatic Let's Encrypt support`} />
        </div>
      </section>
    </div>
  )
}
