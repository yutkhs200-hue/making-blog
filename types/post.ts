export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  content: string // Markdown原文
  sha: string     // GitHub API の更新・削除に必要
  html?: string   // レンダリング済みHTML
}

export type PostMeta = Omit<Post, "content" | "html">
