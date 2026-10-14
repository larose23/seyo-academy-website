"use client";

import { useState, type FormEvent } from "react";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

async function submit(url: string, form: HTMLFormElement): Promise<Status> {
  const fd = new FormData(form);
  const body: Record<string, unknown> = Object.fromEntries(fd.entries());
  body.consent = fd.get("consent") === "on";
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const json = await res.json();
    if (json.ok) return { state: "sent" };
    return { state: "error", message: json.error ?? "Something went wrong. Please call 437-505-4387." };
  } catch {
    return { state: "error", message: "Couldn't reach the server. Check your connection and try again." };
  }
}

export function RegisterForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "sending" });
    const s = await submit("/api/register", e.currentTarget);
    setStatus(s);
  }

  if (status.state === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Registration sent</h3>
        <p>Thanks. A coach will call or email you within a few days to confirm the schedule and next steps.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus({ state: "idle" })}>
          Register another player
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <label>
          Player&apos;s name
          <input name="childName" autoComplete="off" required />
        </label>
        <label className="narrow">
          Age
          <input name="childAge" type="number" inputMode="numeric" min={5} max={15} required />
        </label>
      </div>
      <label>
        Parent or guardian
        <input name="parentName" autoComplete="name" required />
      </label>
      <div className="field-row">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <label>
        Anything we should know? <span className="optional">Optional</span>
        <textarea name="notes" rows={3} placeholder="Experience level, allergies, preferred location…" />
      </label>
      <label className="hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>I&apos;m this player&apos;s parent or guardian and agree to be contacted about SEYO programs.</span>
      </label>
      {status.state === "error" && (
        <p className="form-error" role="alert">
          {status.message}
        </p>
      )}
      <button className="btn btn-lime" type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send registration"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "sending" });
    const s = await submit("/api/contact", e.currentTarget);
    setStatus(s);
  }

  if (status.state === "sent") {
    return (
      <div className="form-done light" role="status">
        <h3>Message sent</h3>
        <p>Thanks for reaching out. We&apos;ll reply by email.</p>
      </div>
    );
  }

  return (
    <form className="form light" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows={4} required />
      </label>
      <label className="hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {status.state === "error" && (
        <p className="form-error" role="alert">
          {status.message}
        </p>
      )}
      <button className="btn btn-navy" type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
