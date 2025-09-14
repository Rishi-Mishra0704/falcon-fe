import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
  return (
 <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <Link href="/">
          <div className="flex items-center gap-3">
          <Image src="/falcon.png" alt="Falcon Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-gray-900">Falcon</h1>
        </div>
      </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="https://pkg.go.dev/github.com/ascendingheavens/falcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Go Docs</Button>
          </Link>
          <Link
            href="https://github.com/AscendingHeavens/falcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">GitHub</Button>
          </Link>
        </nav>
      </header>
  )
}

export default Header
