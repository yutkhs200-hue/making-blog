"use client"

import { Badge } from "@/components/ui/badge"

type Props = {
  tags: string[]
  selected: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, selected, onSelect }: Props) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selected === null ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => onSelect(null)}
      >
        すべて
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selected === tag ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelect(selected === tag ? null : tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
