"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Item {
  href: string
  label: string
}

export function DocsSidebar() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    // Grab all sections inside DocsContent
    const sections = document.querySelectorAll<HTMLDivElement>("section[id]")

    const mapped: Item[] = Array.from(sections).map((section) => {
      const heading = section.querySelector("h2, h3") // grab first heading
      return {
        href: `#${section.id}`,
        label: heading?.textContent || section.id,
      }
    })

    setItems(mapped)
  }, [])

  return (
    <nav className="text-sm bg-sidebar rounded-md border border-sidebar-border p-3 sticky top-4">
      <ul className="flex md:block items-center md:items-stretch gap-3 md:gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded px-2 py-1 text-[0.9rem] hover:text-sidebar-accent"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
