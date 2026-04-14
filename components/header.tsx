"use client"

import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { PenLine, LogOut, Sun, Moon } from "lucide-react"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight shrink-0">
          Microblog
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-1 text-sm px-2 sm:px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <PenLine className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">新規作成</span>
          </Link>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="ダークモード切り替え"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="inline-flex items-center gap-1 text-sm px-2 sm:px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">ログアウト</span>
          </button>
        </div>
      </div>
    </header>
  )
}
