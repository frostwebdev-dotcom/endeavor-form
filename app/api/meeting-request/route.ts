import { NextRequest } from "next/server";

export const runtime = "edge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: 10–15 digits (after stripping non-digits)
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

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
  const phone = typeof b.preferredPhone === "string" ? b.preferredPhone.trim() : "";
  if (phone && !isValidPhone(phone)) {
    return { ok: false, error: "preferredPhone must be a valid phone number (10–15 digits)." };
  }
  return {
    ok: true,
    data: {
      preferredEmail: email,
      preferredPhone: phone || undefined,
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
    "Name: " + (data.firmName || "(not provided)"),
    "",
    "---",
  ];
  return lines.join("\r\n");
}

function buildThankYouEmailBody(data: Body): string {
  const firstPart = data.preferredEmail?.split("@")[0] ?? "";
  const firstNameOrThere =
    firstPart.length > 0
      ? firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase()
      : "there";
  const preferredPhoneOrDash = data.preferredPhone?.trim() || "—";
  const preferredDateTime =
    [data.preferredDate, data.preferredTime].filter(Boolean).join(" at ") || "—";
  const alternativeDateTime =
    [data.alternativeDate, data.alternativeTime].filter(Boolean).join(" at ") || "—";
  const firmNameOrDash = data.firmName?.trim() || "—";

  const lines: string[] = [
    "Hello " + firstNameOrThere + ",",
    "",
    "Thank you for contacting Endeavor Search Partners. Your meeting request has been received, and a member of our team will follow up shortly to confirm scheduling.",
    "",
    "For your reference, here is what we received:",
    "",
    "Email: " + data.preferredEmail,
    "",
    "Phone: " + preferredPhoneOrDash,
    "",
    "Preferred date/time: " + preferredDateTime,
    "",
    "Alternative date/time: " + alternativeDateTime,
    "",
    "Name: " + firmNameOrDash,
    "",
    "For questions, please reply to this email or contact us at hello@infoendeavorconnect.com.",
    "",
    "Sincerely,",
    "Endeavor Search Partners",
    "infoendeavorconnect.com",
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
    console.error("SendGrid (admin) failed:", sendgridRes.status, errText);
    return Response.json(
      {
        error:
          "Your request was saved but we couldn't send a notification. We'll still get in touch.",
      },
      { status: 500 }
    );
  }

  // Thank-you email to the user (from no-reply@...)
  const thankYouBody = buildThankYouEmailBody(data);
  const thankYouRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sendgridKey}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: data.preferredEmail }] }],
      from: { email: fromEmail, name: "Endeavor Search Partners" },
      reply_to: { email: replyTo },
      subject: "Confirmation — meeting request received",
      content: [{ type: "text/plain", value: thankYouBody }],
    }),
  });

  if (!thankYouRes.ok) {
    const errText = await thankYouRes.text();
    console.error("SendGrid (thank-you) failed:", thankYouRes.status, errText);
    return Response.json(
      {
        error:
          "Your request was saved but we couldn't send your confirmation email. We'll still be in touch.",
      },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
