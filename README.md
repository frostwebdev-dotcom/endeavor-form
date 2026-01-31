# Endeavor Connect – Meeting Request Form

Production-ready “Get In Touch” meeting request form for **infoendeavorconnect.com**, built with Next.js and deployable to Cloudflare Pages.

## Quick start

```bash
npm install
cp .env.example .env
# Edit .env with your Supabase and SendGrid values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the form.

## What’s included

- **Form page** (`/`) – preferred email (required), phone, preferred/alternative date & time, firm name, validation, success/error messages, disabled submit while sending.
- **API route** (`/api/meeting-request`) – Edge runtime, validates input, inserts into Supabase `meeting_requests`, then sends a notification email via SendGrid.
- **Styling** – Tailwind CSS, responsive, accessible.

## Environment variables

See `.env.example`. Required:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` – Supabase project and service role key.
- `SENDGRID_API_KEY` – SendGrid API key.
- `NOTIFY_EMAIL_TO`, `FROM_EMAIL`, `REPLY_TO_EMAIL` – Email addresses (defaults in example).

## Supabase

Run `supabase-meeting_requests.sql` in the Supabase SQL Editor to create the `meeting_requests` table.

## Deploy to Cloudflare Pages

See **DEPLOYMENT.md** for:

- Build command: `npx @cloudflare/next-on-pages@1`
- Build output directory: `.vercel/output/static`
- Environment variables and SendGrid/Supabase setup.

## Tech

- Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- Edge runtime for the API (no Node-only APIs).
- Supabase REST API and SendGrid REST API via `fetch()`.
