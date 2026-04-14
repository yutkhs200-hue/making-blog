"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PostEditor } from "@/components/post-editor"

function generateSlug(title: string): string {
  const date = new Date().toISOString().split("T")[0]
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 50)
  return `${date}-${slug || "untitled"}`
}

export default function NewPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  async function handleSave(data: { title: string; tags: string[]; content: string }) {
    setSaving(true)
    const slug = generateSlug(data.title)
    const date = new Date().toISOString().split("T")[0]

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, date, ...data }),
    })

    setSaving(false)
    if (res.ok) {
      router.push(`/posts/${slug}`)
      router.refresh()
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">新規記事</h1>
      <PostEditor onSave={handleSave} saving={saving} />
    </div>
  )
}
