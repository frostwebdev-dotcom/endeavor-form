import { NextRequest } from "next/server";

export const runtime = "edge";

export type MeetingRequestRow = {
  id: string;
  preferred_email: string;
  preferred_phone: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  alternative_date: string | null;
  alternative_time: string | null;
  firm_name: string | null;
  created_at: string;
};

function getAdminSecret(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim() || null;
  const secret = request.headers.get("x-admin-secret");
  return secret?.trim() || null;
}

export async function GET(request: NextRequest) {
  const secret = getAdminSecret(request);
  const expected = process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const url = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/meeting_requests?order=created_at.desc&select=*`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Supabase meeting_requests GET failed:", res.status, text);
    return Response.json(
      { error: "Failed to load meeting requests" },
      { status: 500 }
    );
  }

  const data = (await res.json()) as MeetingRequestRow[];
  return Response.json(data);
}
