"use client"

import Link from "next/link"

const items = [
  { href: "#introduction", label: "Introduction" },
  { href: "#installation", label: "Installation" },
  { href: "#getting-started", label: "Getting Started" },
  { href: "#routing", label: "Routing" },
  { href: "#middleware", label: "Middleware" },
  { href: "#cli", label: "CLI" },
]

export function DocsSidebar() {
  return (
    <nav className="text-sm bg-sidebar rounded-md border border-sidebar-border p-3">
      <ul className="flex md:block items-center md:items-stretch gap-3 md:gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block rounded px-2 py-1 text-[0.9rem] hover:text-sidebar-accent grey">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
