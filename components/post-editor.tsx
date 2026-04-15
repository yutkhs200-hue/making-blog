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
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-xs text-muted-foreground font-normal">
          タイトル
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="記事タイトル"
          className="h-10 text-base"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags" className="text-xs text-muted-foreground font-normal">
          タグ（カンマ区切り）
        </Label>
        <Input
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="tech, note, idea"
          className="h-9 text-sm font-mono"
        />
        {parseTags(tagInput).length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {parseTags(tagInput).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px] font-mono font-normal">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-border">
          <div className="flex">
            <button
              type="button"
              onClick={() => setTab("edit")}
              className={`px-3 py-2 text-xs transition-colors border-b-2 -mb-px ${
                tab === "edit"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              編集
            </button>
            <button
              type="button"
              onClick={handlePreview}
              disabled={loadingPreview}
              className={`px-3 py-2 text-xs transition-colors border-b-2 -mb-px ${
                tab === "preview"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {loadingPreview ? "生成中..." : "プレビュー"}
            </button>
          </div>
        </div>

        {tab === "edit" ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Markdownで記述..."
            className="min-h-[480px] font-mono text-[13px] leading-relaxed resize-y border-border/70 focus-visible:border-primary/50"
          />
        ) : (
          <div className="min-h-[480px] rounded-md bg-background px-1 py-2">
            <MarkdownRenderer html={previewHtml} />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2 border-t border-border/50">
        <Button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="mt-4"
        >
          {saving ? "保存中..." : "保存"}
        </Button>
      </div>
    </div>
  )
}
