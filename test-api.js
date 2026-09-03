/**
 * Smoke test for the HBSA application API against a real Airtable base.
 * Field-name mismatches are the only thing that reliably breaks here, and
 * only a live call catches them.
 *
 *   1. npm run dev
 *   2. set APPLICATION_CLOSED = false in src/lib/config.ts
 *   3. node test-api.js
 *   4. delete the two test rows from Airtable
 */

const assert = require('node:assert')

const API_URL = 'http://localhost:3000/api/submit'

const base = {
  basicInfo: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@berkeley.edu',
    graduatingYear: '2027',
    coreValue: 'I embody Question the Status Quo by challenging conventional thinking.'
  },
  generalResponses: { whyJoinHBSA: 'I want to help build a stronger Haas community.' },
  resumeUrl: 'https://drive.google.com/file/d/test123/view'
}

const marketing = {
  workload: 'I prioritize with the Eisenhower Matrix and set clear deadlines.',
  initiative: 'A TikTok series featuring day-in-the-life content.',
  portfolio: 'https://example.com/portfolio'
}

const cases = [
  {
    name: 'two committees',
    payload: {
      ...base,
      selectedCommittees: ['marketing', 'dei'],
      committeeResponses: {
        marketing,
        dei: {
          meaning: 'Creating spaces where everyone feels valued and can thrive.',
          'inclusive-space': 'I organized a cultural celebration at my community college.',
          contribution: 'New perspectives, and a willingness to learn from others.'
        }
      }
    }
  },
  {
    // exercises the empty "Committee 2 Responses" branch
    name: 'one committee',
    payload: { ...base, selectedCommittees: ['marketing'], committeeResponses: { marketing } }
  }
]

async function main() {
  for (const { name, payload } of cases) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await response.json()

    if (response.status === 410) {
      console.log('Applications are closed — set APPLICATION_CLOSED = false to run this.')
      return
    }

    assert.strictEqual(response.status, 200, `${name}: ${result.error ?? response.status}`)
    assert.match(result.submissionId ?? '', /^rec/, `${name}: no Airtable record id returned`)
    console.log(`ok  ${name} -> ${result.submissionId}`)
  }
  console.log('\nAll good. Delete the test rows from Airtable.')
}

main().catch(error => {
  console.error('\nFAILED:', error.message)
  console.error('Check: dev server running, AIRTABLE_TOKEN / AIRTABLE_BASE_ID set in .env.local,')
  console.error('and the base has an "Applications" table with the 11 documented fields.')
  process.exit(1)
})
