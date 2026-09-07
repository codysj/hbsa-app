'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckIcon, ArrowLeftIcon, DocumentArrowUpIcon, UserGroupIcon, ChatBubbleLeftRightIcon, XCircleIcon } from '@heroicons/react/24/outline'
import ResumeLinkInput from '@/components/ResumeLinkInput'
import { useFormStore } from '@/store/formStore'
import { committees } from '@/data/committees'
import { APPLICATION_CLOSED, SEMESTER } from '@/lib/config'

export default function SubmitPage() {
  const router = useRouter()
  const { 
    basicInfo, 
    selectedCommittees, 
    committeeResponses, 
    generalResponses, 
    resumeUrl, 
    setResumeUrl
  } = useFormStore()
  
  // Debug logging
  console.log('Form Store Data:', {
    basicInfo,
    selectedCommittees,
    committeeResponses,
    generalResponses,
    resumeUrl
  })
  
  console.log('Basic Info Details:', {
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email,
    graduatingYear: basicInfo.graduatingYear,
    coreValue: basicInfo.coreValue
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [resumeLinkError, setResumeLinkError] = useState('')

  const handleResumeLinkChange = (url: string) => {
    setResumeUrl(url)
    setResumeLinkError('')
  }

  const handleSubmit = async () => {
    if (APPLICATION_CLOSED) return
    // Accept any valid link
    try {
      new URL(resumeUrl)
    } catch {
      setResumeLinkError('Please provide a valid link to your resume')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const formData = {
        basicInfo,
        selectedCommittees,
        committeeResponses,
        generalResponses,
        resumeUrl,
        submittedAt: new Date().toISOString()
      }

      console.log('Submitting form data:', formData)

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Submit response:', result)

      if (response.ok && result.success) {
        // Add 5 second delay before showing success page
        await new Promise(resolve => setTimeout(resolve, 1000))
        setSubmitSuccess(true)
      } else {
        setSubmitError(result.error || 'Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (selectedCommittees.length > 0) {
      router.push(`/form/questions/${selectedCommittees[selectedCommittees.length - 1]}`)
    } else {
      router.push('/form/committees')
    }
  }

  const stepNumber = 4 + selectedCommittees.length // After basic info, general, committees, and committee questions
  const totalSteps = 4 + selectedCommittees.length

  if (APPLICATION_CLOSED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircleIcon className="w-10 h-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Applications Are Closed</h1>
          <p className="text-gray-600 mb-6">
            The deadline has passed. Submissions are no longer accepted. Thank you for your interest in HBSA.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckIcon className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Thank you for your interest in HBSA. Your application has been recorded, and we&apos;ll be in touch about next steps.<br /><br />
              <span className="font-semibold text-primary-700">We don&apos;t send a confirmation email, so this screen is your confirmation.</span> You can safely close this page.
            </p>
            
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-large hover:shadow-glow transition-all duration-300"
            >
              Return Home
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">HBSA {SEMESTER} Associate Application</h1>
              <p className="text-sm text-gray-600">Step {stepNumber} of {totalSteps}</p>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                {selectedCommittees.length > 0 && (
                  <>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {4 + selectedCommittees.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Page Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
              Submit Application
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Review & Submit Your Application
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please review your application and upload your resume before submitting.
            </p>
          </div>

          {/* Resume Upload (now Google Drive Link) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-large border border-gray-100 p-8"
          >
            <ResumeLinkInput
              value={resumeUrl}
              onChange={handleResumeLinkChange}
              error={resumeLinkError}
            />
          </motion.div>

          {/* Form Review */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center">Application Review</h3>
            {/* Basic Info */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-2">
              <div className="flex flex-col sm:flex-row sm:space-x-8">
                <div className="flex-1">
                  <span className="block text-gray-500 text-sm font-medium">Full Name</span>
                  <span className="block text-lg font-semibold text-gray-900">
                    {basicInfo.firstName && basicInfo.lastName 
                      ? `${basicInfo.firstName} ${basicInfo.lastName}` 
                      : `Debug: firstName="${basicInfo.firstName}", lastName="${basicInfo.lastName}"`}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="block text-gray-500 text-sm font-medium">Email</span>
                  <span className="block text-lg font-semibold text-gray-900">{basicInfo.email || `Debug: email="${basicInfo.email}"`}</span>
                </div>
                <div className="flex-1">
                  <span className="block text-gray-500 text-sm font-medium">Graduating Year</span>
                  <span className="block text-lg font-semibold text-gray-900">{basicInfo.graduatingYear || `Debug: graduatingYear="${basicInfo.graduatingYear}"`}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-gray-500 text-sm font-medium">Haas Core Value</span>
                <span className="block text-base text-gray-900">{basicInfo.coreValue || `Debug: coreValue="${basicInfo.coreValue}"`}</span>
              </div>
            </div>

            {/* General Questions */}
            <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-success-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">General Questions</h4>
              </div>
              
              <div>
                <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Why do you want to join HBSA?</p>
                <p className="text-gray-700 leading-relaxed">{generalResponses.whyJoinHBSA || 'Not provided'}</p>
              </div>
            </div>

            {/* Selected Committees */}
            <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                  <UserGroupIcon className="w-5 h-5 text-accent-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Selected Committees</h4>
              </div>
              
              <div className="space-y-4">
                {selectedCommittees.length === 0 ? (
                  <p className="text-gray-500 italic">No committees selected</p>
                ) : (
                  selectedCommittees.map((committeeId) => {
                    const committee = committees.find(c => c.id === committeeId)
                    return (
                      <div key={committeeId} className="border-l-4 border-accent-500 pl-6 py-3 bg-accent-50 rounded-r-xl">
                        <p className="font-bold text-lg text-gray-900">{committee?.label}</p>
                        <p className="text-gray-600">{committee?.description}</p>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Committee-Specific Responses */}
            <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <UserGroupIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Committee-Specific Responses</h4>
              </div>
              <div className="space-y-8">
                {selectedCommittees.length === 0 ? (
                  <p className="text-gray-500 italic">No committee responses to display</p>
                ) : (
                  selectedCommittees.map((committeeId) => {
                    const committee = committees.find(c => c.id === committeeId)
                    if (!committee) return null
                    const responses = committeeResponses[committeeId] || {}
                    return (
                      <div key={committeeId} className="border-l-4 border-blue-500 pl-6 py-3 bg-blue-50 rounded-r-xl">
                        <p className="font-bold text-lg text-gray-900 mb-2">{committee.label}</p>
                        {committee.questions.map((q) => (
                          <div key={q.id} className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-1">{q.label}</p>
                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-gray-900">
                              {Array.isArray(responses[q.id])
                                ? (responses[q.id] as unknown as string[]).join(', ')
                                : (typeof responses[q.id] === 'string' && responses[q.id])
                                  ? responses[q.id]
                                  : <span className="text-gray-400 italic">No response</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !resumeUrl}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-large hover:shadow-glow transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-error-50 border border-error-200 rounded-xl p-4 text-error-700"
            >
              <p className="font-medium">{submitError}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 