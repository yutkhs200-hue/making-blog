import { auth } from "@/lib/auth"
import { markdownToHtml } from "@/lib/markdown"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { content } = await req.json()
  const html = await markdownToHtml(content ?? "")
  return NextResponse.json({ html })
}
