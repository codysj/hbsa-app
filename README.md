# HBSA Application Portal

Next.js application for **Haas Business Student Association (HBSA)** associate recruiting. Applicants complete a multi-step form; submissions are stored in **Airtable**.

This README is written for the **Director of Technology** (or whoever owns the stack) to run, deploy, and update the portal each cycle.

---

## Stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js](https://nextjs.org/) 15 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion, Heroicons |
| Client state | [Zustand](https://zustand-demo.pmnd.rs/) (`src/store/formStore.ts`) |
| Submissions | `POST /api/submit` → Airtable REST API |

---

## Local development

**Requirements:** Node.js 20+ (LTS recommended), npm.

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

---

## Environment variables

Create **`.env.local`** in the project root (never commit real secrets).

| Variable | Required | Where it’s used |
|----------|----------|------------------|
| `AIRTABLE_TOKEN` | **Yes** (for live submissions) | `src/lib/airtable.ts` — personal access token, scoped `data.records:write` on the applications base |
| `AIRTABLE_BASE_ID` | **Yes** (for live submissions) | `src/lib/airtable.ts` — base ID, starts with `app` |
| `AIRTABLE_TABLE_NAME` | No | Defaults to `Applications` |

> Do **not** prefix these with `NEXT_PUBLIC_`. That prefix inlines the value into the browser bundle, which would publish your Airtable token.

See **`.env.example`** for a template.

---

## Backend: Airtable

Submissions do **not** hit a traditional database. Flow:

1. Browser sends JSON to **`POST /api/submit`** (`src/app/api/submit/route.ts`).
2. Server validates the payload and calls **`submitToAirtable()`** in `src/lib/airtable.ts`.
3. That function `POST`s one record to the Airtable REST API. No deployment step, nothing to keep in sync.

### First-time setup (checklist)

Detailed steps live in **[`BACKEND_SETUP.md`](./BACKEND_SETUP.md)**. Summary:

1. Create an Airtable base with a table named **`Applications`** and the 11 fields listed in `BACKEND_SETUP.md`.
2. Create a **personal access token** scoped `data.records:write` on that base.
3. Put `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID` in `.env.local`.
4. Run `node test-api.js` against `npm run dev` and confirm two test rows appear.

### Storage shape

**One row per applicant, 11 fields that never change between semesters.** An applicant
picks up to two committees; each choice’s answers are written into
`Committee 1 Responses` / `Committee 2 Responses` as a formatted `Q: … / A: …` block,
with the prompts stored alongside the answers. Committee reviewers get a view filtered
on `Committees` **has any of** their committee.

This is deliberate: one field per question would mean 43 fields to hand-maintain every
semester, of which any single applicant fills at most 8. See `BACKEND_SETUP.md`.

### Payload shape

The browser sends nested JSON, mapped to Airtable fields by `buildFields()` in `src/lib/airtable.ts`:

- `basicInfo` — `firstName`, `lastName`, `email`, `graduatingYear`, `coreValue`
- `selectedCommittees` — array of committee **IDs** (strings)
- `committeeResponses` — `{ [committeeId]: { [questionId]: string } }`
- `generalResponses` — `{ whyJoinHBSA: string }`
- `resumeUrl` — HTTPS link (e.g. Google Doc)

`validateFormSubmission()` checks this server-side against `committees.ts`, so unknown
committee IDs and missing required answers are rejected before anything is written.

---

## Updating questions & committees for a new cycle

Questions live in **one place**. Airtable needs no schema change.

### 1. Frontend: `src/data/committees.ts`

- Each **committee** has `id`, `label`, `description`, and `questions[]`.
- Each **question** has `id`, `label`, `required`, optional `wordLimit`, and `type` (`text` | `textarea` | `url` | `select` | `multiselect`).

The form renders from this file (`src/app/form/committees`, `src/app/form/questions/[committee]`).

### 2. Client state (if you add general questions)

- **`src/store/formStore.ts`** — extend `GeneralResponses` and `initialState` if you add fields beyond `whyJoinHBSA`.
- **`src/app/form/general/page.tsx`** — add inputs and validation.
- **`src/lib/airtable.ts`** — extend `FormSubmission`, `validateFormSubmission`, and `buildFields` (a new general question needs a new Airtable field).

### 3. Airtable

Nothing to change for committee/question edits — `committees.ts` is the only source of
truth, and the response blocks are generated from it at submit time.

Per semester, duplicate the `Applications` table (or the base) so cohorts don’t mix, and
point `AIRTABLE_TABLE_NAME` / `AIRTABLE_BASE_ID` at the new one.

### Copy & branding in the UI

Search the repo for semester strings (e.g. **“Spring 2026”**) in:

- `src/app/page.tsx`
- `src/app/form/**/page.tsx`
- `src/components/FormWrapper.tsx` (if used)

Update deadlines and messaging on the home page CTA.

### Closing / reopening applications

**`src/lib/config.ts`**

```ts
export const APPLICATION_CLOSED = true  // false when applications open
```

When `true`:

- Home page shows “applications closed.”
- `/form/basic-info` and `/form/submit` show a closed message (no new starts / no submits).
- **`POST /api/submit`** returns **410** and does not call Airtable.

Set to `false` when you’re ready to accept applications again.

---

## Deployment (e.g. Vercel)

Typical setup for Next.js:

1. **Repository** — Push this repo to GitHub (or GitLab) under the org/account HBSA controls.
2. **Vercel** — Import project, framework **Next.js**, root directory default, build `npm run build`, output default.
3. **Environment variables** — In Vercel project settings → Environment Variables, add **`AIRTABLE_TOKEN`** and **`AIRTABLE_BASE_ID`** for *Production* (point *Preview* at a separate test base if you want staging submissions).
4. **Redeploy** after changing env vars.

**Airtable:** tokens don’t expire, but revoking or rescoping one breaks submissions immediately — rotate during a closed window.

**Custom domain** (optional): Configure in Vercel → Domains; add DNS records as instructed.

---

## Operating & managing the portal

| Task | What to do |
|------|------------|
| **Monitor submissions** | Open the Airtable base; one view per committee, filtered on `Committees`. |
| **Export / share with committees** | Share a filtered view (read-only), or download CSV from the view menu. |
| **Debug failed submits** | Vercel (or local) **function logs** for `/api/submit` — the Airtable status code and response body are logged there. |
| **Record limits** | Airtable’s free plan caps at **1,000 records per base**. At ~400 applicants a semester that’s roughly two cycles — archive or move to a new base before you hit it. |
| **Security** | Scope the token to the one base with `data.records:write` only. Keep base access limited to board/tech. Never prefix the token with `NEXT_PUBLIC_`. |
| **Dependencies** | Run `npm audit` periodically; bump Next/React after testing (`npm run build`). |

---

## Project map

```
src/app/
  page.tsx                 # Landing / start application (respects APPLICATION_CLOSED)
  form/
    basic-info/            # Step 1
    general/               # Step 2 (general questions)
    committees/            # Step 3 (committee selection)
    questions/[committee]/ # Dynamic per-committee questions
    submit/                # Review + resume link + submit
  api/submit/route.ts      # Server handler → Airtable
src/data/committees.ts     # Committees + questions (primary content config)
src/store/formStore.ts     # Applicant progress in browser (lost if they clear site data)
src/lib/
  airtable.ts              # Submit + validation + Airtable field mapping
  config.ts                # APPLICATION_CLOSED flag
test-api.js                # Live smoke test against the real base
BACKEND_SETUP.md           # Airtable setup walkthrough
```

---

## Handoff checklist for the next tech lead

- [ ] Access to **GitHub** (or host) repo and **Vercel** (or host) project  
- [ ] **Airtable account** that owns the applications base, and who can issue tokens  
- [ ] `.env.local` / Vercel: **`AIRTABLE_TOKEN`** + **`AIRTABLE_BASE_ID`** documented  
- [ ] Read **`BACKEND_SETUP.md`** and run a **test submission** after any backend change  
- [ ] Know how to flip **`APPLICATION_CLOSED`** in `src/lib/config.ts`  
- [ ] For each new cycle: update **`committees.ts`** and UI copy, and point at a fresh Airtable table  

---

## License / usage

Private repository for HBSA. Adjust this section if the org adds a formal license.
