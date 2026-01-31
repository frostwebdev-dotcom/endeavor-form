import { NextRequest } from "next/server";

export const runtime = "edge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  preferredEmail?: string;
  preferredPhone?: string;
  preferredDate?: string;
  preferredTime?: string;
  alternativeDate?: string;
  alternativeTime?: string;
  firmName?: string;
};

function validateBody(body: unknown): { ok: true; data: Body } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;
  const email = typeof b.preferredEmail === "string" ? b.preferredEmail.trim() : "";
  if (!email) {
    return { ok: false, error: "preferredEmail is required." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "preferredEmail must be a valid email address." };
  }
  return {
    ok: true,
    data: {
      preferredEmail: email,
      preferredPhone: typeof b.preferredPhone === "string" ? b.preferredPhone.trim() : undefined,
      preferredDate: typeof b.preferredDate === "string" ? b.preferredDate.trim() : undefined,
      preferredTime: typeof b.preferredTime === "string" ? b.preferredTime.trim() : undefined,
      alternativeDate: typeof b.alternativeDate === "string" ? b.alternativeDate.trim() : undefined,
      alternativeTime: typeof b.alternativeTime === "string" ? b.alternativeTime.trim() : undefined,
      firmName: typeof b.firmName === "string" ? b.firmName.trim() : undefined,
    },
  };
}

function buildEmailBody(data: Body): string {
  const lines: string[] = [
    "New Meeting Request - lp.infoendeavorconnect.com",
    "",
    "---",
    "",
    "Preferred email: " + data.preferredEmail,
    "Preferred phone: " + (data.preferredPhone || "(not provided)"),
    "Preferred date: " + (data.preferredDate || "(not provided)"),
    "Preferred time: " + (data.preferredTime || "(not provided)"),
    "Alternative date: " + (data.alternativeDate || "(not provided)"),
    "Alternative time: " + (data.alternativeTime || "(not provided)"),
    "Firm name: " + (data.firmName || "(not provided)"),
    "",
    "---",
  ];
  return lines.join("\r\n");
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const validated = validateBody(body);
  if (!validated.ok) {
    return Response.json({ error: validated.error }, { status: 400 });
  }
  const data = validated.data;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL_TO ?? "hello@infoendeavorconnect.com";
  const fromEmail = process.env.FROM_EMAIL ?? "no-reply@infoendeavorconnect.com";
  const replyTo = process.env.REPLY_TO_EMAIL ?? notifyTo;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return Response.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  const payload = {
    preferred_email: data.preferredEmail,
    preferred_phone: data.preferredPhone ?? null,
    preferred_date: data.preferredDate ?? null,
    preferred_time: data.preferredTime ?? null,
    alternative_date: data.alternativeDate ?? null,
    alternative_time: data.alternativeTime ?? null,
    firm_name: data.firmName ?? null,
  };

  const supabaseRes = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/meeting_requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!supabaseRes.ok) {
    const errText = await supabaseRes.text();
    console.error("Supabase insert failed:", supabaseRes.status, errText);
    return Response.json(
      {
        error:
          "We couldn't save your request. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }

  if (!sendgridKey) {
    console.error("Missing SENDGRID_API_KEY");
    return Response.json(
      {
        error:
          "Your request was received but we couldn't send a confirmation. We'll still get in touch.",
      },
      { status: 500 }
    );
  }

  const emailBody = buildEmailBody(data);
  const sendgridRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sendgridKey}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: notifyTo }] }],
      from: { email: fromEmail, name: "Endeavor Connect" },
      reply_to: { email: replyTo },
      subject: "New Meeting Request - lp.infoendeavorconnect.com",
      content: [{ type: "text/plain", value: emailBody }],
    }),
  });

  if (!sendgridRes.ok) {
    const errText = await sendgridRes.text();
    console.error("SendGrid failed:", sendgridRes.status, errText);
    return Response.json(
      {
        error:
          "Your request was saved but we couldn't send a notification. We'll still get in touch.",
      },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
