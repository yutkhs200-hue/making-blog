import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug } from "@/lib/github"
import { markdownToHtml } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { DeleteDialog } from "@/components/delete-dialog"
import { Badge } from "@/components/ui/badge"
import { Pencil } from "lucide-react"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const html = await markdownToHtml(post.content)

  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <h1 className="text-2xl font-bold leading-snug">{post.title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/posts/${slug}/edit`}
              className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              編集
            </Link>
            <DeleteDialog slug={slug} sha={post.sha} />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground">{post.date}</span>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <hr />

      <MarkdownRenderer html={html} />
    </article>
  )
}
