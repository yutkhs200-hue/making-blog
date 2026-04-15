"use client"

import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { PenLine, LogOut, Sun, Moon } from "lucide-react"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-[15px] tracking-tight shrink-0 hover:text-primary transition-colors"
        >
          microblog
        </Link>
        <nav className="flex items-center gap-0.5 text-muted-foreground">
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-1.5 text-[13px] px-2.5 sm:px-3 py-1.5 rounded-md hover:bg-accent hover:text-foreground transition-colors"
          >
            <PenLine className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">新規</span>
          </Link>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent hover:text-foreground transition-colors"
            aria-label="テーマ切り替え"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="inline-flex items-center gap-1.5 text-[13px] px-2.5 sm:px-3 py-1.5 rounded-md hover:bg-accent hover:text-foreground transition-colors"
            aria-label="ログアウト"
          >
            <LogOut className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">ログアウト</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
