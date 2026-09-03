# HBSA Backend Setup (Airtable)

> For a full project overview, start with the root **[README.md](./README.md)**.

Submissions go straight from `POST /api/submit` to the Airtable REST API. There is
no Apps Script, no deployment step, and no spreadsheet to keep in sync.

## Setup (5 minutes)

### 1. Create the base and table

Create an Airtable base, name a table **`Applications`**, and give it these 11 fields.
Names must match **exactly** — that is the only thing that can silently break.

| Field | Type |
|---|---|
| Submitted At | Date (include time) |
| First Name | Single line text |
| Last Name | Single line text |
| Email | Email |
| Graduating Year | Single line text |
| Core Value | Long text |
| Committees | Multiple select (leave options empty — they fill in on first submission) |
| Why Join HBSA | Long text |
| Resume URL | URL |
| Committee 1 Responses | Long text |
| Committee 2 Responses | Long text |

Delete Airtable's default `Name` / `Notes` / `Assignee` / `Status` fields.

### 2. Create a personal access token

[airtable.com/create/tokens](https://airtable.com/create/tokens) → scope
**`data.records:write`**, access limited to this base only. Copy the token — it is
shown once.

### 3. Get the base ID

Open [airtable.com/api](https://airtable.com/api), pick the base; the ID starts with `app`.

### 4. Set environment variables

In `.env.local` (and in Vercel → Settings → Environment Variables):

```bash
AIRTABLE_TOKEN=pat...
AIRTABLE_BASE_ID=app...
# AIRTABLE_TABLE_NAME=Applications   # optional, this is the default
```

**No `NEXT_PUBLIC_` prefix.** That prefix inlines the value into the browser bundle,
which would publish the token.

### 5. Test

```bash
npm run dev
node test-api.js
```

Set `APPLICATION_CLOSED = false` in `src/lib/config.ts` first, then delete the two
test rows from Airtable when it passes.

---

## How the data is stored

One row per applicant. An applicant picks up to two committees, and each choice's
answers are written as a single formatted block:

```
Tech

Q: What excites you most about working on the tech team, ...
A: ...

Q: If you could improve one part of HBSA's digital experience, ...
A: ...
```

Question prompts are stored alongside the answers, so old records still read
correctly after a question is reworded.

**Why blocks instead of one field per question:** 14 committees × up to 4 questions
is 43 fields, of which any single applicant fills at most 8. Blocks keep the base at
11 fields that never change between semesters — `src/data/committees.ts` stays the
only place questions are defined. At ~400 applicants a semester that also keeps you
to ~400 records, which matters on Airtable's free plan (1,000 records per base).

### Reviewing

Make one view per committee, filtered on `Committees` **has any of** → that
committee. No code, no per-semester maintenance.

---

## Updating for a new semester

1. Edit committees and questions in **`src/data/committees.ts`** — that's it for the schema.
2. Duplicate the `Applications` table (or the base) so cohorts don't mix, and point
   `AIRTABLE_TABLE_NAME` / `AIRTABLE_BASE_ID` at the new one.
3. Flip `APPLICATION_CLOSED` in `src/lib/config.ts` when the window opens and closes.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| `422 UNKNOWN_FIELD_NAME` in server logs | A field name in the base doesn't match the table above |
| `403` | Token lacks `data.records:write`, or isn't scoped to this base |
| `404` | Wrong `AIRTABLE_BASE_ID`, or the table isn't named `Applications` |
| `410` from `/api/submit` | `APPLICATION_CLOSED` is `true` in `src/lib/config.ts` |
| Submissions succeed but rows don't appear | Checking the wrong base — a token can only write where it's scoped |

Server logs (Vercel → project → Logs, or your terminal) carry the Airtable status
code and response body for any failure.
