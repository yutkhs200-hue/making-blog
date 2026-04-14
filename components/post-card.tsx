import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PostMeta } from "@/types/post"

type Props = {
  post: PostMeta
}

export function PostCard({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold leading-snug">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {post.date}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
