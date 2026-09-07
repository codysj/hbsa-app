/**
 * Smoke test for the HBSA application API against a real Airtable base.
 * Field-name mismatches are the only thing that reliably breaks here, and
 * only a live call catches them.
 *
 *   1. npm run dev
 *   2. set APPLICATION_CLOSED = false in src/lib/config.ts
 *   3. node test-api.js
 *   4. delete the test rows from Airtable (the script prints their record ids)
 *
 * Question ids come from src/data/committees.ts — update this fixture whenever
 * the questions for marketing or student-affairs change.
 */

const assert = require('node:assert')

const API_URL = 'http://localhost:3000/api/submit'

const base = {
  basicInfo: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@berkeley.edu',
    graduatingYear: '2028',
    coreValue: 'I embody Question the Status Quo by challenging conventional thinking.'
  },
  generalResponses: { whyJoinHBSA: 'I want to help build a stronger Haas community.' },
  resumeUrl: 'https://drive.google.com/file/d/test123/view'
}

// All four Marketing questions, including the optional url field.
const marketingFull = {
  platform: 'Instagram — I ran a 12k-follower account and grew it with short-form video.',
  workload: 'I batch content on Sundays and keep a shared calendar with deadlines.',
  initiative: 'A "Day in the Life at Haas" series following one student per week.',
  portfolio: 'https://example.com/portfolio'
}

const cases = [
  {
    // covers: two committees, the url question type, and the select question type
    name: 'two committees (url + select)',
    payload: {
      ...base,
      selectedCommittees: ['marketing', 'student-affairs'],
      committeeResponses: {
        marketing: marketingFull,
        'student-affairs': {
          'build-fix': 'Better signage and a live map for Haas study spaces.',
          motivation: 'I want Haas to feel smaller and warmer than it looks from outside.',
          subcommittee: 'Student Life'
        }
      }
    }
  },
  {
    // covers: single committee (empty "Committee 2 Responses") and an omitted optional question
    name: 'one committee, optional question skipped',
    payload: {
      ...base,
      selectedCommittees: ['marketing'],
      committeeResponses: {
        marketing: { ...marketingFull, portfolio: undefined }
      }
    }
  }
]

async function main() {
  const created = []

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
    created.push(result.submissionId)
    console.log(`ok  ${name} -> ${result.submissionId}`)
  }

  console.log('\nDelete these test rows from Airtable:\n  ' + created.join('\n  '))
}

main().catch(error => {
  console.error('\nFAILED:', error.message)
  console.error('Check: dev server running, AIRTABLE_TOKEN / AIRTABLE_BASE_ID set in .env.local,')
  console.error('and the base has an "Applications" table with the 11 documented fields.')
  process.exit(1)
})
