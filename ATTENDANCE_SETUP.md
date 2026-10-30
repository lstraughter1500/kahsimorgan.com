# Game attendance tracker

## What exists

The site previously had only Cloudflare Worker static assets, no database, and no backend code. The new same-origin Worker API uses Cloudflare D1 and the existing hosting account. No external SaaS or browser API key is needed. The production database `kahsi-attendance` has been created in Cloudflare account `24cbaba4f5e2d31667031a159cc4314a` and is connected by the `ATTENDANCE_DB` binding. Database UUID: `4df00d95-3442-4ed6-a605-9797dc11fc4a`.

## Production configuration and recovery

Run these commands from this project with Node/npm and Cloudflare Wrangler installed, signing into the Cloudflare account that owns `kahsimorgan-com1` (account `24cbaba4f5e2d31667031a159cc4314a`):

```sh
npx wrangler login
npx wrangler d1 list
```

If an appropriate attendance database already exists, reuse it. Otherwise:

```sh
npx wrangler d1 create kahsi-attendance
```

For a replacement database only, update `database_id` in `wrangler.jsonc` to its returned UUID. Keep the binding name `ATTENDANCE_DB`. Apply migrations with:

```sh
npx wrangler d1 migrations apply kahsi-attendance --remote
```

The checked-in config also declares:

- Worker entry point: `server/worker.mjs`
- Static assets binding: `ASSETS`, directory `./dist`, Worker-first routing only for `/api/*`
- D1 binding: `ATTENDANCE_DB`, database `kahsi-attendance`
- Rate limiter binding: `ATTENDANCE_LIMITER`, namespace `1001`, 30 requests per 60 seconds per key, independently applied to hashed device and network keys

Keep database credentials in Cloudflare bindings; do not put API tokens in HTML or JavaScript. The D1 UUID is configuration, not a secret. The rate-limit namespace must remain dedicated to this feature within the account. No paid plan upgrade is configured by this code.

After review, publish through the existing GitHub/Cloudflare build flow or `npx wrangler deploy`. Verify the live API and UI after deployment. No production RSVP tests should leave records behind.

## Local preview and tests

```sh
npx wrangler d1 migrations apply kahsi-attendance --local
npx wrangler dev --local --ip 127.0.0.1 --port 8787
python3 tests/attendance-api.py
node tests/attendance-worker.mjs
node tests/attendance-client.mjs
```

Open `http://127.0.0.1:8787/basketball-schedule`. The existing Python static server at port 8000 cannot run the API; use 8787 for this feature. Local D1 data persists under ignored `.wrangler/state/`; local test records never reach production.

For a second anonymous visitor in the same browser, use `http://localhost:8787/basketball-schedule`: this has separate browser storage but the same local database. Alternatively use a separate browser profile. Cancel test RSVPs afterward to return to zero.

## Behavior and limits

- The canonical schedule remains `basketball-schedule.js`; both pages and the API use its existing stable IDs. Keep IDs unchanged when editing opponents or times. New games need new IDs.
- An empty table produces real zero counts. There are no sample or seeded attendance values.
- The browser stores a random UUID under `kahsi-attendance-visitor-v1`. Only its SHA-256 hash is stored in the RSVP table alongside game ID and creation timestamp. Names, emails, and raw IP addresses are not stored in that table. Network hashes are used only as edge limiter keys.
- Atomic database batches and the composite primary key enforce one RSVP per visitor/game. PUT requests specify the desired state, making retries idempotent. Confirmation appears only after a verified server response.
- The open popup refreshes every 10 seconds while the page is visible. Polling and in-flight requests stop when it closes. Cached responses are disabled.
- Loading, unavailable storage, network errors, and rate limits display explanatory messages. Failed writes are read back before another toggle; counts are never incremented optimistically.
- Same-origin checks, strict UUID/game/body validation, prepared statements, and edge throttling provide basic spam protection. Cloudflare edge throttling is approximate, not a globally exact limit. Clearing browser storage, using private browsing, or changing devices permits another RSVP. This is a per-browser interest count, not identity verification or ticketing.
- Local storage removal loses the ability to cancel the old device RSVP. There is intentionally no public list of visitors or administrative deletion endpoint.
