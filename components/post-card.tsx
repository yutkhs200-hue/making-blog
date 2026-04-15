import Link from "next/link"
import type { PostMeta } from "@/types/post"

type Props = {
  post: PostMeta
}

// Flat row style — rauchg.com / overreacted.io inspired.
// Date on the left (fixed width), title + tags on the right.
export function PostCard({ post }: Props) {
  const monthDay = post.date?.slice(5) ?? ""
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group grid grid-cols-[4rem_1fr] sm:grid-cols-[5rem_1fr] items-baseline gap-4 py-3 border-b border-border/50 last:border-b-0 transition-colors"
    >
      <time className="text-xs font-mono tabular-nums text-muted-foreground pt-0.5">
        {monthDay}
      </time>
      <div className="min-w-0 space-y-1">
        <h3 className="text-[15px] font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
