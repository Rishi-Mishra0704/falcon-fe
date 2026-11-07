"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Item {
  href: string
  label: string
  group: string
}

export function DocsSidebar() {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState("")
  const [open, setOpen] = useState(false) // mobile toggle

  useEffect(() => {
    const collect = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]")
      const mapped: Item[] = Array.from(sections).map(section => {
        const heading = section.querySelector("h2, h3")
        return {
          href: `#${section.id}`,
          label: heading?.textContent || section.id,
          group: section.dataset.group ?? "",
        }
      })
      // Keeping the same array when nothing changed matters: the sidebar is part of the
      // page it watches, so a new array would re-render it, change the page, and loop.
      setItems(prev => (JSON.stringify(prev) === JSON.stringify(mapped) ? prev : mapped))
    }

    // The docs load after the page does, so collect the sections again whenever they change.
    collect()
    const observer = new MutationObserver(collect)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  // Highlight the section being read.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: "0px 0px -70% 0px" },
    )
    items.forEach(item => {
      const section = document.querySelector(item.href)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [items])

  const groups = items.reduce<{ name: string; items: Item[] }[]>((acc, item) => {
    const last = acc[acc.length - 1]
    if (last && last.name === item.group) {
      last.items.push(item)
    } else {
      acc.push({ name: item.group, items: [item] })
    }
    return acc
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
          bg-sidebar border border-sidebar-border rounded-lg p-3
          md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:overflow-y-auto
          ${open ? "block" : "hidden"} md:block
        `}
      >
        {groups.map(group => (
          <div key={group.name} className="mb-4 last:mb-0">
            {group.name && (
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.name}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded px-2 py-1 text-[0.9rem] transition-colors ${
                      active === item.href
                        ? "border-l-2 border-brand bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                    onClick={() => setOpen(false)} // close menu on mobile click
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </>
  )
}
