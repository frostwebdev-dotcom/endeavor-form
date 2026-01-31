# Cloudflare Pages deployment (next-on-pages)

## Build settings

In **Cloudflare Pages** → your project → **Settings** → **Builds & deployments** → **Build configuration**:

| Setting | Value |
|--------|--------|
| **Framework preset** | Next.js |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | (leave blank if repo root is the app) |
| **Environment variables** | Add all vars from `.env.example` (see below) |

## Environment variables

In **Settings** → **Environment variables**, add for **Production** (and Preview if desired):

- `SUPABASE_URL` – your Supabase project URL  
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key (keep secret)  
- `SENDGRID_API_KEY` – SendGrid API key (keep secret)  
- `NOTIFY_EMAIL_TO` – e.g. `hello@infoendeavorconnect.com`  
- `FROM_EMAIL` – e.g. `no-reply@infoendeavorconnect.com`  
- `REPLY_TO_EMAIL` – e.g. `hello@infoendeavorconnect.com`  

## Supabase setup

1. In Supabase, create a table `meeting_requests` with columns:

   - `id` – `uuid`, default `gen_random_uuid()`, primary key  
   - `preferred_email` – `text`, not null  
   - `preferred_phone` – `text`, nullable  
   - `preferred_date` – `date` or `text`, nullable  
   - `preferred_time` – `text`, nullable  
   - `alternative_date` – `date` or `text`, nullable  
   - `alternative_time` – `text`, nullable  
   - `firm_name` – `text`, nullable  
   - `created_at` – `timestamptz`, default `now()`  

2. Enable RLS if you use it; the API uses the **service role** key, so it can insert regardless of RLS. Prefer restricting other access via RLS.

## SendGrid

- Create an API key with “Mail Send” permission.  
- Ensure `FROM_EMAIL` is a verified sender (or use a verified domain) in SendGrid.

## Local preview (optional)

```bash
npm run pages:build
npm run preview
```

This uses Wrangler to serve the built output locally.
