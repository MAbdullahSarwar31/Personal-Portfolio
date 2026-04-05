import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  /* ── Server-side validation ─────────────────────────────── */
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (name.trim().length > 100 || subject.trim().length > 200 || message.trim().length > 5000) {
    return NextResponse.json({ error: "Input exceeds allowed length." }, { status: 400 });
  }

  /* ── Web3Forms delivery (requires WEB3FORMS_ACCESS_KEY env var) ── */
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  // Demo mode — no key configured
  if (!accessKey || accessKey === "your_web3forms_access_key_here") {
    return NextResponse.json({
      success: true,
      demo: true,
    });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey.trim(),
        name:        name.trim(),
        email:       email.trim(),
        subject:     `Portfolio Contact: ${subject.trim()}`,
        message:     message.trim(),
        from_name:   "Portfolio Contact Form",
        replyto:     email.trim(),
      }),
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Web3Forms non-JSON response:", responseText);
      return NextResponse.json(
        { error: "Web3Forms API Error: " + responseText.substring(0, 50) },
        { status: 500 }
      );
    }

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: data.message ?? "Failed to send. Please try again." },
      { status: 500 }
    );
  } catch (err: any) {
    console.error("Web3Forms fetch error:", err);
    return NextResponse.json(
      { error: err.message || "Server error. Please email me directly." },
      { status: 500 }
    );
  }
}
