# SEYO Academy Website

**A full website for SEYO, a youth soccer academy in Toronto: program listings, online registration with email confirmation, a photo gallery, donations, and an admin area for managing programs and sign-ups.**

> **Portfolio note:** Built by Zakariya Mahadalle for a real youth soccer academy where I coach, using an AI build agent (Manus). I gathered the requirements from the academy, decided the pages and features, reviewed every screen, and handled the content and launch.

## The problem
The academy ran registrations and parent communication through social media and messages. Parents had no single place to see programs, age groups, schedules and pricing, and staff had no clean list of who had signed up.

## What it does
| Page / feature | Purpose |
|---|---|
| Home, About | Mission, coaches, impact and testimonials |
| Programs | Age groups, schedules and pricing in one place |
| Registration | Online sign-up form with validation and an email confirmation |
| Gallery | Photos and videos with a lightbox viewer |
| Support / Donate | Donation and sponsorship options |
| Contact | Form, map, hours and social links |
| Admin | Staff manage programs and view registrations |

**Built with:** React, TypeScript, Vite, Tailwind CSS, tRPC, Drizzle ORM, MySQL, Node.js, Vitest

## What I learned
- The hardest part of a client website is the brief, not the code: turning "we need a website" into a list of pages and features the academy actually uses.
- Anything that handles children's registrations needs care with data: what gets collected, who can see it, and where it is stored. Registration data and gallery records are deliberately not included in this repo.

## Status
The first version was hosted on the build platform's temporary hosting, which has since expired. The source is here in full.

## Run it locally
```bash
pnpm install
pnpm dev      # needs a MySQL database URL in .env
```
