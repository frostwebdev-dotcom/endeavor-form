# Cloudflare Pages deployment (next-on-pages)

## Fix: npm install fails (ERESOLVE / peer dependency)

Cloudflare runs `npm install` without your local `.npmrc`. Do **both** of the following:

1. **Commit `.npmrc`** in the repo (it contains `legacy-peer-deps=true`). If you haven’t pushed it yet:
   ```bash
   git add .npmrc
   git commit -m "Add .npmrc for Cloudflare build"
   git push
   ```

2. **Set a build-time env var** in Cloudflare so install uses legacy peer deps even if `.npmrc` is missing:
   - **Cloudflare Dashboard** → your **Pages** project → **Settings** → **Environment variables**
   - **Add variable** (for **Production** and/or **Preview**):
     - **Variable name:** `NPM_CONFIG_LEGACY_PEER_DEPS`
     - **Value:** `true`
   - Save. Then trigger a new deploy (e.g. **Deployments** → **Retry deployment** or push a new commit).

After this, `npm install` should succeed and the build can continue.

---

## Build settings

In **Cloudflare Pages** → your project → **Settings** → **Builds & deployments** → **Build configuration**:

| Setting | Value |
|--------|--------|
| **Framework preset** | Next.js |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | (leave blank if repo root is the app) |
| **Environment variables** | Add all vars from `.env.example` (see below) |

## Compatibility flags (required for next-on-pages)

If you see **"Node.JS Compatibility Error – no nodejs_compat compatibility flag set"**:

1. **Cloudflare Dashboard** → **Workers & Pages** → your **Pages** project.
2. Go to **Settings** → **Compatibility flags** (under "Build configuration" or "Functions").
3. Under **Compatibility flags**, add:
   - **Flag:** `nodejs_compat`
   - Enable it for **Production** and **Preview**.
4. Save. Redeploy (e.g. **Deployments** → **Retry deployment** or push a commit).

Without this flag, the Next.js app built with `@cloudflare/next-on-pages` cannot run on Cloudflare Pages.

## Environment variables

In **Settings** → **Environment variables**, add for **Production** (and Preview if desired):

- `SUPABASE_URL` – your Supabase project URL  
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key (keep secret)  
- `SENDGRID_API_KEY` – SendGrid API key (keep secret)  
- `NOTIFY_EMAIL_TO` – e.g. `hello@infoendeavorconnect.com`  
- `FROM_EMAIL` – e.g. `no-reply@infoendeavorconnect.com`  
- `REPLY_TO_EMAIL` – e.g. `hello@infoendeavorconnect.com`  
- `ADMIN_SECRET` – secret for `/admin` dashboard (view meeting requests); keep strong and private  

## Admin dashboard

- **URL:** `/admin` (e.g. `https://your-site.pages.dev/admin`).
- **Auth:** Sign in with the value of `ADMIN_SECRET`. Stored in session only (cleared on sign out or when the tab is closed).
- **Features:** View all meeting requests (email, phone, dates, times, name, submitted at). New submissions since the page was opened are highlighted and trigger an audible notification. Data auto-refreshes every 20 seconds.

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

### Create an API key (Mail Send)

1. **Log in** to [SendGrid](https://app.sendgrid.com/).
2. Open **Settings** (gear icon in the left sidebar) → **API Keys**.
3. Click **Create API Key**.
4. **Name:** e.g. `Endeavor Meeting Request` (any label you like).
5. **API Key Permissions:** choose **Restricted Access**.
6. Under **Mail Send**, turn **ON** only:
   - **Mail Send** → **Mail Send** (full access or “Send” is enough).
7. Leave all other permissions (e.g. Mail Settings, Tracking) **OFF**.
8. Click **Create & View**.
9. **Copy the key immediately** — SendGrid shows it only once. It looks like:
   ```text
   SG.xxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
10. Store it in your `.env` (see below). For Cloudflare Pages, add the same value in **Settings → Environment variables** as `SENDGRID_API_KEY`.

**Add to `.env` (local):**

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Replace the value with your actual key. No quotes needed. Do not commit `.env` to git.

### Sender verification

- The **From** address (`FROM_EMAIL`, e.g. `no-reply@infoendeavorconnect.com`) must be verified in SendGrid, or the domain must be authenticated.
- In SendGrid: **Settings** → **Sender Authentication** → either verify a **Single Sender** (one email) or **Authenticate a domain** (allows any address on that domain).
- Until one of these is done, SendGrid may block or reject sends.

## Local preview (optional)

```bash
npm run pages:build
npm run preview
```

This uses Wrangler to serve the built output locally.
