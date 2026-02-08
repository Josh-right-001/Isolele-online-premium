import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Contact form submission endpoint
// Stores messages in Supabase and optionally sends email via Resend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, type } = body as {
      name?: string
      email?: string
      subject?: string
      message?: string
      type?: string
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Store in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      await supabase.from("contact_messages").insert({
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        type: type || "general",
        created_at: new Date().toISOString(),
        status: "unread",
      })
    }

    // Send email via Resend if API key is available
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Isolele Contact <noreply@isolele.com>",
          to: ["contact@isolele.com"],
          subject: `[Isolele Contact] ${subject || "New Message"} from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${type || "general"}</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <hr/>
            <p>${message}</p>
          `,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message", details: String(error) },
      { status: 500 }
    )
  }
}
