"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { PostCard } from "@/components/post-card"
import { TagFilter } from "@/components/tag-filter"
import type { PostMeta } from "@/types/post"

export default function HomePage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false) })
  }, [])

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  const filtered = posts.filter((p) => {
    const matchTag = selectedTag ? p.tags.includes(selectedTag) : true
    const matchSearch = search
      ? p.title.toLowerCase().includes(search.toLowerCase())
      : true
    return matchTag && matchSearch
  })

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input
          placeholder="記事を検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <TagFilter tags={allTags} selected={selectedTag} onSelect={setSelectedTag} />
      </div>

      {loading ? (
        <div className="text-muted-foreground text-sm">読み込み中...</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          {posts.length === 0 ? "まだ記事がありません。" : "該当する記事がありません。"}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
