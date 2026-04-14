"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MarkdownRenderer } from "@/components/markdown-renderer"

type Props = {
  initialTitle?: string
  initialTags?: string[]
  initialContent?: string
  initialHtml?: string
  onSave: (data: { title: string; tags: string[]; content: string }) => Promise<void>
  saving?: boolean
}

export function PostEditor({
  initialTitle = "",
  initialTags = [],
  initialContent = "",
  initialHtml = "",
  onSave,
  saving = false,
}: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [tagInput, setTagInput] = useState(initialTags.join(", "))
  const [content, setContent] = useState(initialContent)
  const [previewHtml, setPreviewHtml] = useState(initialHtml)
  const [tab, setTab] = useState<"edit" | "preview">("edit")
  const [loadingPreview, setLoadingPreview] = useState(false)

  async function handlePreview() {
    if (tab === "preview") {
      setTab("edit")
      return
    }
    setLoadingPreview(true)
    const res = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
    const { html } = await res.json()
    setPreviewHtml(html)
    setLoadingPreview(false)
    setTab("preview")
  }

  function parseTags(input: string): string[] {
    return input
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  }

  async function handleSave() {
    await onSave({ title, tags: parseTags(tagInput), content })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="記事タイトル"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">タグ（カンマ区切り）</Label>
        <Input
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="tech, note, idea"
        />
        {parseTags(tagInput).length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {parseTags(tagInput).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>本文</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePreview}
            disabled={loadingPreview}
          >
            {loadingPreview ? "生成中..." : tab === "edit" ? "プレビュー" : "編集に戻る"}
          </Button>
        </div>

        {tab === "edit" ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Markdownで記述..."
            className="min-h-[400px] font-mono text-sm resize-y"
          />
        ) : (
          <div className="min-h-[400px] border rounded-md p-4 bg-background">
            <MarkdownRenderer html={previewHtml} />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving || !title.trim()}>
          {saving ? "保存中..." : "保存する"}
        </Button>
      </div>
    </div>
  )
}
