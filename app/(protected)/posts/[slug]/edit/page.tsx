"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PostEditor } from "@/components/post-editor"
import type { Post } from "@/types/post"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const [post, setPost] = useState<Post | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then(setPost)
  }, [slug])

  async function handleSave(data: { title: string; tags: string[]; content: string }) {
    if (!post) return
    setSaving(true)

    const res = await fetch(`/api/posts/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sha: post.sha, date: post.date, ...data }),
    })

    setSaving(false)
    if (res.ok) {
      router.push(`/posts/${slug}`)
      router.refresh()
    }
  }

  if (!post) {
    return <div className="text-muted-foreground text-sm">読み込み中...</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">記事を編集</h1>
      <PostEditor
        initialTitle={post.title}
        initialTags={post.tags}
        initialContent={post.content}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}
