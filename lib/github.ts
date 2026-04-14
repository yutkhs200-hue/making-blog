import { Octokit } from "@octokit/rest"
import matter from "gray-matter"
import type { Post, PostMeta } from "@/types/post"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const owner = process.env.GITHUB_OWNER!
const repo = process.env.GITHUB_REPO!
const branch = process.env.GITHUB_BRANCH ?? "main"
const POSTS_DIR = "content/posts"

function slugToPath(slug: string) {
  return `${POSTS_DIR}/${slug}.md`
}

function parseFile(slug: string, raw: string, sha: string): Post {
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
    sha,
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: POSTS_DIR,
      ref: branch,
    })

    if (!Array.isArray(data)) return []

    const posts = await Promise.all(
      data
        .filter((f) => f.name.endsWith(".md"))
        .map(async (f) => {
          const { data: file } = await octokit.repos.getContent({
            owner,
            repo,
            path: f.path,
            ref: branch,
          })
          if (Array.isArray(file) || file.type !== "file") return null
          const raw = Buffer.from(file.content, "base64").toString("utf-8")
          const post = parseFile(f.name.replace(/\.md$/, ""), raw, file.sha)
          const { content: _, html: __, ...meta } = post
          return meta
        })
    )

    return (posts.filter(Boolean) as PostMeta[]).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: slugToPath(slug),
      ref: branch,
    })

    if (Array.isArray(data) || data.type !== "file") return null

    const raw = Buffer.from(data.content, "base64").toString("utf-8")
    return parseFile(slug, raw, data.sha)
  } catch {
    return null
  }
}

type PostInput = {
  title: string
  date: string
  tags: string[]
  content: string
}

function buildFileContent({ title, date, tags, content }: PostInput): string {
  const frontmatter = matter.stringify(content, { title, date, tags })
  return frontmatter
}

export async function createPost(slug: string, input: PostInput): Promise<void> {
  const fileContent = buildFileContent(input)
  const encoded = Buffer.from(fileContent).toString("base64")

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: slugToPath(slug),
    message: `feat: add post "${input.title}"`,
    content: encoded,
    branch,
  })
}

export async function updatePost(
  slug: string,
  sha: string,
  input: PostInput
): Promise<void> {
  const fileContent = buildFileContent(input)
  const encoded = Buffer.from(fileContent).toString("base64")

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: slugToPath(slug),
    message: `feat: update post "${input.title}"`,
    content: encoded,
    sha,
    branch,
  })
}

export async function deletePost(slug: string, sha: string): Promise<void> {
  await octokit.repos.deleteFile({
    owner,
    repo,
    path: slugToPath(slug),
    message: `feat: delete post "${slug}"`,
    sha,
    branch,
  })
}
