import { NextResponse, type NextRequest } from "next/server"

const SITE_HOST = "isolele.com"
const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || "isolele-indexnow-key"

// POST: Submit URLs to IndexNow (Bing, Yandex, etc.)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls } = body as { urls?: string[] }

    if (!urls || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 })
    }

    // Prefix all URLs with the site domain if not already
    const fullUrls = urls.map((url: string) =>
      url.startsWith("http") ? url : `https://${SITE_HOST}${url}`
    )

    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    }

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({
      success: true,
      status: response.status,
      submitted: fullUrls.length,
      urls: fullUrls,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit to IndexNow", details: String(error) },
      { status: 500 }
    )
  }
}

// GET: Health check for IndexNow
export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    status: "active",
    host: SITE_HOST,
    key: INDEXNOW_KEY,
  })
}
