import { validateRegistration, escapeHtml as e } from "@/lib/validate.ts";
import { notify } from "@/lib/mail.ts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const result = validateRegistration(body);
  if (!result.ok) {
    // Pretend success to bots so they don't retry.
    if (result.error === "spam") return Response.json({ ok: true });
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }
  const r = result.data;
  try {
    await notify(
      `New registration: ${r.childName} (age ${r.childAge})`,
      [
        ["Player", e(r.childName)],
        ["Age", String(r.childAge)],
        ["Parent / guardian", e(r.parentName)],
        ["Email", e(r.email)],
        ["Phone", e(r.phone)],
        ["Notes", e(r.notes || "None")],
      ],
      r.email,
    );
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "We couldn't send your registration. Please call 437-505-4387." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
