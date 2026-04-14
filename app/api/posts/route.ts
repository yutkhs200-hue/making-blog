import { auth } from "@/lib/auth"
import { getAllPosts, createPost } from "@/lib/github"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const posts = await getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { slug, title, tags, content, date } = await req.json()
  await createPost(slug, { title, tags, content, date })
  return NextResponse.json({ ok: true })
}
