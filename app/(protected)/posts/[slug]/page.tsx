import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug } from "@/lib/github"
import { markdownToHtml } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { DeleteDialog } from "@/components/delete-dialog"
import { ArrowLeft, Pencil } from "lucide-react"

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
    <article className="space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        記事一覧へ
      </Link>

      <header className="space-y-4 pb-6 border-b border-border/60">
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <time>{post.date}</time>
          {post.tags.length > 0 && (
            <>
              <span className="text-border">·</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-[2rem] font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 pt-2">
          <Link
            href={`/posts/${slug}/edit`}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-border hover:bg-accent hover:text-foreground text-muted-foreground transition-colors"
          >
            <Pencil className="h-3 w-3" />
            編集
          </Link>
          <DeleteDialog slug={slug} sha={post.sha} />
        </div>
      </header>

      <MarkdownRenderer html={html} />
    </article>
  )
}
