import { NextRequest, NextResponse } from 'next/server'
import { submitToAirtable, FormSubmission, validateFileUrl } from '@/lib/airtable'
import { APPLICATION_CLOSED } from '@/lib/config'

export async function POST(request: NextRequest) {
  if (APPLICATION_CLOSED) {
    return NextResponse.json(
      { error: 'Applications are closed. The deadline has passed.' },
      { status: 410 }
    )
  }
  try {
    const formData: FormSubmission = await request.json()

    // Validate file URL
    if (!validateFileUrl(formData.resumeUrl)) {
      return NextResponse.json(
        { error: 'Invalid resume file URL' },
        { status: 400 }
      )
    }

    // Add submission timestamp
    formData.submittedAt = new Date().toISOString()

    // Submit to Airtable
    const result = await submitToAirtable(formData)

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Application submitted successfully',
          submissionId: result.submissionId
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { 
          error: result.error || 'Failed to submit application',
          details: 'Please try again or contact support if the problem persists'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in submit API:', error)
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    )
  }
} 