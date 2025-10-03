"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Item {
  href: string
  label: string
}

export function DocsSidebar() {
  const [items, setItems] = useState<Item[]>([])
  const [open, setOpen] = useState(false) // mobile toggle

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]")
    const mapped: Item[] = Array.from(sections).map(section => {
      const heading = section.querySelector("h2, h3")
      return { href: `#${section.id}`, label: heading?.textContent || section.id }
    })
    setItems(mapped)
  }, [])

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 bg-muted text-sm rounded-md border border-border"
        >
          {open ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Sidebar container */}
      <nav
        className={`
          bg-sidebar border border-sidebar-border rounded-md p-3
          md:sticky md:top-4
          ${open ? "block" : "hidden"} md:block
        `}
      >
        <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {items.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-2 py-1 rounded text-[0.9rem] "
                onClick={() => setOpen(false)} // close menu on mobile click
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
