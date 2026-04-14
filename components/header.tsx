"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { PenLine, LogOut } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Microblog
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <PenLine className="h-4 w-4" />
            新規作成
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </button>
        </div>
      </div>
    </header>
  )
}
