# SEYO Academy Website

The website for **SEYO Academy** (Sports, Education and Youth Organization), a non-profit youth soccer program in Etobicoke and York, Toronto, for players aged 5 to 15.

**Live site:** _link added after deployment_

## What it does

| Section | Purpose |
|---|---|
| Home | Who SEYO is, ages, session times and size at a glance |
| Programs | Skills covered, year-round seasons, training locations with map links |
| Photos | Real photos from SEYO sessions |
| Register | Parents register a player online; the academy gets an email with every detail |
| Support | How to donate by e-Transfer and what donations pay for |
| Contact | Phone, email and a message form |

## How it's built

- **Next.js 14 + TypeScript**, deployed on **Vercel** (free tier)
- **Forms:** registration and contact forms post to server routes that validate every field again on the server (age 5 to 15, valid email and phone, guardian consent), escape anything a user types before it goes into an email, and drop spam bots with a hidden honeypot field
- **Email:** submissions are delivered to the academy's inbox through **Resend**
- **No database:** the site stores no children's data; registrations go straight to the academy's inbox
- **Content in one file:** programs, seasons, locations and photos live in [`lib/site.ts`](lib/site.ts), so a non-developer can update the schedule
- **Tests:** form validation is covered by unit tests in [`tests/`](tests/)

## History

Version 1 was built on an AI app-building platform with a database and admin area, and stopped working when that platform's hosting expired. Version 2 is a rebuild that removes every dependency on that platform, so the site can be hosted anywhere for free. The v1 code is in this repo's history.

## Run it locally

```bash
npm install
cp .env.example .env.local   # add a Resend API key and the inbox to notify
npm run dev
npm test
```

Website by Zakariya Mahadalle.
