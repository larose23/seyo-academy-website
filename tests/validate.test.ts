import { test } from "node:test";
import assert from "node:assert/strict";
import { validateRegistration, validateContact, escapeHtml } from "../lib/validate.ts";

const good = { parentName: "Amina Ali", email: "amina@example.com", phone: "416-555-0199", childName: "Yusuf", childAge: "9", consent: true };

test("accepts a complete registration", () => {
  const r = validateRegistration(good);
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.data.childAge, 9);
});

test("rejects players outside 5-15", () => {
  assert.equal(validateRegistration({ ...good, childAge: "4" }).ok, false);
  assert.equal(validateRegistration({ ...good, childAge: "16" }).ok, false);
  assert.equal(validateRegistration({ ...good, childAge: "7.5" }).ok, false);
});

test("requires guardian consent", () => {
  assert.equal(validateRegistration({ ...good, consent: false }).ok, false);
});

test("rejects bad email and phone", () => {
  assert.equal(validateRegistration({ ...good, email: "nope" }).ok, false);
  assert.equal(validateRegistration({ ...good, phone: "123" }).ok, false);
});

test("flags bots that fill the hidden field", () => {
  const r = validateRegistration({ ...good, website: "http://spam" });
  assert.deepEqual(r, { ok: false, error: "spam" });
});

test("contact form needs a real message", () => {
  assert.equal(validateContact({ name: "A", email: "a@b.co", message: "hi" }).ok, false);
  assert.equal(validateContact({ name: "A", email: "a@b.co", message: "When does spring start?" }).ok, true);
});

test("escapes html so form input can't inject markup into the email", () => {
  assert.equal(escapeHtml('<b>"x"</b>'), "&lt;b&gt;&quot;x&quot;&lt;/b&gt;");
});
