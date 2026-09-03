import { committees } from '@/data/committees'

export interface FormSubmission {
  basicInfo: {
    firstName: string
    lastName: string
    email: string
    graduatingYear: string
    coreValue: string
  }
  selectedCommittees: string[]
  committeeResponses: {
    [committeeId: string]: {
      [questionId: string]: string
    }
  }
  generalResponses: {
    whyJoinHBSA: string
  }
  resumeUrl: string
  submittedAt: string
}

// ponytail: committee answers go in as one text block per choice, so the base
// stays at 11 fixed fields instead of 43 that need editing every semester.
// Prompts ride along in the row, so old records still read correctly after a
// question is reworded. Split into per-question fields only if reviewers need
// to sort or filter on an individual answer.
export function formatCommittee(
  committeeId: string,
  responses: Record<string, string>
): string {
  const committee = committees.find(c => c.id === committeeId)
  if (!committee) return ''

  const qa = committee.questions.map(q =>
    `Q: ${q.label}\nA: ${responses[q.id]?.trim() || '(no response)'}`
  )
  return `${committee.label}\n\n${qa.join('\n\n')}`
}

export function buildFields(formData: FormSubmission) {
  const block = (index: number) => {
    const committeeId = formData.selectedCommittees[index]
    if (!committeeId) return ''
    return formatCommittee(committeeId, formData.committeeResponses[committeeId] ?? {})
  }

  return {
    'Submitted At': formData.submittedAt,
    'First Name': formData.basicInfo.firstName.trim(),
    'Last Name': formData.basicInfo.lastName.trim(),
    'Email': formData.basicInfo.email.trim(),
    'Graduating Year': formData.basicInfo.graduatingYear.trim(),
    'Core Value': formData.basicInfo.coreValue.trim(),
    'Committees': formData.selectedCommittees.map(
      id => committees.find(c => c.id === id)?.label ?? id
    ),
    'Why Join HBSA': formData.generalResponses.whyJoinHBSA.trim(),
    'Resume URL': formData.resumeUrl.trim(),
    'Committee 1 Responses': block(0),
    'Committee 2 Responses': block(1),
  }
}

export async function submitToAirtable(
  formData: FormSubmission
): Promise<{ success: boolean; error?: string; submissionId?: string }> {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE_NAME || 'Applications'

  if (!token || !baseId) {
    console.error('AIRTABLE_TOKEN / AIRTABLE_BASE_ID not set')
    return { success: false, error: 'Submissions are not configured. Please contact HBSA tech.' }
  }

  const validationError = validateFormSubmission(formData)
  if (validationError) {
    return { success: false, error: validationError }
  }

  try {
    // ponytail: single attempt, no retry — Airtable answers in well under a
    // second, and retrying a create risks a duplicate application row.
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          typecast: true, // lets the Committees select build its options on first use
          fields: buildFields(formData),
        }),
      }
    )

    if (!response.ok) {
      console.error('Airtable error', response.status, await response.text())
      return { success: false, error: 'Could not save your application. Please try again.' }
    }

    const record = await response.json()
    return { success: true, submissionId: record.id }
  } catch (error) {
    console.error('Airtable request failed:', error)
    return { success: false, error: 'Could not save your application. Please try again.' }
  }
}

function validateFormSubmission(formData: FormSubmission): string | null {
  if (!formData.basicInfo?.firstName?.trim()) return 'First name is required'
  if (!formData.basicInfo?.lastName?.trim()) return 'Last name is required'
  if (!formData.basicInfo?.email?.trim()) return 'Email is required'
  if (!formData.basicInfo?.graduatingYear?.trim()) return 'Graduating year is required'
  if (!formData.basicInfo?.coreValue?.trim()) return 'Core value is required'
  if (!formData.selectedCommittees?.length) return 'At least one committee must be selected'
  if (formData.selectedCommittees.length > 2) return 'At most two committees may be selected'
  if (!formData.resumeUrl?.trim()) return 'Resume link is required'
  if (!formData.generalResponses?.whyJoinHBSA?.trim()) return 'Why join HBSA response is required'

  for (const committeeId of formData.selectedCommittees) {
    const committee = committees.find(c => c.id === committeeId)
    if (!committee) return `Unknown committee: ${committeeId}`

    const responses = formData.committeeResponses[committeeId] ?? {}
    for (const question of committee.questions) {
      if (question.required && !responses[question.id]?.trim()) {
        return `A required response is missing for ${committee.label}`
      }
    }
  }

  return null
}

export function validateFileUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' && urlObj.hostname.length > 0
  } catch {
    return false
  }
}
