import { validateContact, escapeHtml as e } from "@/lib/validate.ts";
import { notify } from "@/lib/mail.ts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const result = validateContact(body);
  if (!result.ok) {
    if (result.error === "spam") return Response.json({ ok: true });
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }
  const m = result.data;
  try {
    await notify(`Website message from ${m.name}`, [["Name", e(m.name)], ["Email", e(m.email)], ["Message", e(m.message)]], m.email);
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "We couldn't send your message. Please call 437-505-4387." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
