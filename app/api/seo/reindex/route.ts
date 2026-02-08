import { NextResponse } from "next/server"

const SITE_URL = "https://isolele.com"

// All important pages to submit for indexing
const PAGES = [
  "/",
  "/about",
  "/founder",
  "/news",
  "/characters",
  "/characters/zaire",
  "/characters/kimoya",
  "/characters/zattar",
  "/characters/jumeaux-njoko",
  "/characters/reine-imvula",
  "/shop",
  "/supporters",
  "/supporters/partners",
]

// POST: Trigger reindexing of all pages via IndexNow + Google
export async function POST() {
  const results: Record<string, unknown> = {}
  const urls = PAGES.map((p) => `${SITE_URL}${p}`)

  // 1. Submit to IndexNow (Bing, Yandex)
  try {
    const indexNowKey = process.env.INDEXNOW_API_KEY || "isolele-indexnow-key"
    const indexNowResponse = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "isolele.com",
        key: indexNowKey,
        keyLocation: `https://isolele.com/${indexNowKey}.txt`,
        urlList: urls,
      }),
    })
    results.indexNow = {
      status: indexNowResponse.status,
      submitted: urls.length,
    }
  } catch (error) {
    results.indexNow = { error: String(error) }
  }

  // 2. Ping Google with sitemap
  try {
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`
    )
    results.googlePing = { status: googlePing.status }
  } catch (error) {
    results.googlePing = { error: String(error) }
  }

  // 3. Ping Bing with sitemap
  try {
    const bingPing = await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`
    )
    results.bingPing = { status: bingPing.status }
  } catch (error) {
    results.bingPing = { error: String(error) }
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    pagesSubmitted: urls.length,
    results,
  })
}
