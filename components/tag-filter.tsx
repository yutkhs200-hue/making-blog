"use client"

import { cn } from "@/lib/utils"

type Props = {
  tags: string[]
  selected: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, selected, onSelect }: Props) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12px] font-mono">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "transition-colors hover:text-foreground",
          selected === null ? "text-primary" : "text-muted-foreground",
        )}
      >
        all
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(selected === tag ? null : tag)}
          className={cn(
            "transition-colors hover:text-foreground",
            selected === tag ? "text-primary" : "text-muted-foreground",
          )}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
}
