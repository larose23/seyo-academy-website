// Checks form submissions on the server. Pure functions so they can be unit tested.

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export interface Registration {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  notes: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9+().\-\s]{10,20}$/;

export function validateRegistration(input: Record<string, unknown>): Result<Registration> {
  if (clean(input.website, 200)) return { ok: false, error: "spam" }; // hidden field bots fill in
  const data: Registration = {
    parentName: clean(input.parentName, 100),
    email: clean(input.email, 150),
    phone: clean(input.phone, 30),
    childName: clean(input.childName, 100),
    childAge: Number(input.childAge),
    notes: clean(input.notes, 1000),
  };
  if (!data.parentName) return { ok: false, error: "Enter the parent or guardian's name." };
  if (!EMAIL.test(data.email)) return { ok: false, error: "Enter a valid email address." };
  if (!PHONE.test(data.phone)) return { ok: false, error: "Enter a phone number we can call, including area code." };
  if (!data.childName) return { ok: false, error: "Enter the player's name." };
  if (!Number.isInteger(data.childAge) || data.childAge < 5 || data.childAge > 15) {
    return { ok: false, error: "Players must be between 5 and 15 years old." };
  }
  if (input.consent !== true && input.consent !== "on") {
    return { ok: false, error: "Tick the box to confirm you're the player's parent or guardian." };
  }
  return { ok: true, data };
}

export function validateContact(input: Record<string, unknown>): Result<ContactMessage> {
  if (clean(input.website, 200)) return { ok: false, error: "spam" };
  const data: ContactMessage = {
    name: clean(input.name, 100),
    email: clean(input.email, 150),
    message: clean(input.message, 2000),
  };
  if (!data.name) return { ok: false, error: "Enter your name." };
  if (!EMAIL.test(data.email)) return { ok: false, error: "Enter a valid email address." };
  if (data.message.length < 5) return { ok: false, error: "Write a short message so we know how to help." };
  return { ok: true, data };
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
