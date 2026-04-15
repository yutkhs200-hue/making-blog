"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { PostCard } from "@/components/post-card"
import { TagFilter } from "@/components/tag-filter"
import { Search } from "lucide-react"
import type { PostMeta } from "@/types/post"

export default function HomePage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  const filtered = posts.filter((p) => {
    const matchTag = selectedTag ? p.tags.includes(selectedTag) : true
    const matchSearch = search
      ? p.title.toLowerCase().includes(search.toLowerCase())
      : true
    return matchTag && matchSearch
  })

  const groupedByYear = useMemo(() => {
    const groups = new Map<string, PostMeta[]>()
    for (const p of filtered) {
      const year = p.date?.slice(0, 4) ?? "——"
      if (!groups.has(year)) groups.set(year, [])
      groups.get(year)!.push(p)
    }
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filtered])

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
        <p className="text-sm text-muted-foreground">
          {loading ? "—" : `${posts.length} 件の記事`}
        </p>
      </header>

      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="記事を検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <TagFilter
          tags={allTags}
          selected={selectedTag}
          onSelect={setSelectedTag}
        />
      </div>

      {loading ? (
        <div className="text-muted-foreground text-sm py-8">読み込み中...</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground text-sm py-8 text-center border border-dashed rounded-lg">
          {posts.length === 0
            ? "まだ記事がありません。"
            : "該当する記事がありません。"}
        </div>
      ) : (
        <div className="space-y-10">
          {groupedByYear.map(([year, items]) => (
            <section key={year} className="space-y-2">
              <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                {year}
              </h2>
              <div className="flex flex-col">
                {items.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
