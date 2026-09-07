'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRightIcon, ArrowLeftIcon, UserIcon, CalendarIcon, SparklesIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useFormStore } from '@/store/formStore'
import { APPLICATION_CLOSED, SEMESTER, GRADUATING_YEARS } from '@/lib/config'

export default function BasicInfoPage() {
  const router = useRouter()
  const { basicInfo, setBasicInfo } = useFormStore()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  if (APPLICATION_CLOSED) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircleIcon className="w-10 h-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Applications Are Closed</h1>
          <p className="text-gray-600 mb-6">
            The deadline has passed. {SEMESTER} applications are no longer accepted. Thank you for your interest in HBSA.
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

  const graduatingYears = GRADUATING_YEARS

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!basicInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!basicInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!basicInfo.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(basicInfo.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!basicInfo.graduatingYear) {
      newErrors.graduatingYear = 'Graduating year is required'
    }

    if (!basicInfo.coreValue.trim()) {
      newErrors.coreValue = 'Core value response is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push('/form/general')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">HBSA {SEMESTER} Associate Application</h1>
              <p className="text-sm text-gray-600">Step 1 of 4</p>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full">
                  <div className="w-0 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-yellow-100 text-gray-700 rounded-full text-sm font-medium">
              <UserIcon className="w-4 h-4 mr-2" />
              Basic Information
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900">
              Tell us about yourself
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let&apos;s start with some basic information to get to know you better and understand your background.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name Field */}
                <div className="space-y-3">
                  <label className="block text-gray-900 font-semibold text-lg">
                    First Name <span className="text-error-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={basicInfo.firstName}
                      onChange={(e) => setBasicInfo({ firstName: e.target.value })}
                      className={`
                        w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg
                        focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                        ${errors.firstName ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                      `}
                      placeholder="Enter your first name"
                    />
                    <UserIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.firstName && (
                    <p className="text-error-600 text-sm font-medium flex items-center">
                      <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="space-y-3">
                  <label className="block text-gray-900 font-semibold text-lg">
                    Last Name <span className="text-error-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={basicInfo.lastName}
                      onChange={(e) => setBasicInfo({ lastName: e.target.value })}
                      className={`
                        w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg
                        focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                        ${errors.lastName ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                      `}
                      placeholder="Enter your last name"
                    />
                    <UserIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.lastName && (
                    <p className="text-error-600 text-sm font-medium flex items-center">
                      <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label className="block text-gray-900 font-semibold text-lg">
                  Email Address <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => setBasicInfo({ email: e.target.value })}
                    className={`
                      w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg
                      focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                      ${errors.email ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                    `}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-error-600 text-sm font-medium flex items-center">
                    <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Graduating Year Field */}
              <div className="space-y-3">
                <label className="block text-gray-900 font-semibold text-lg">
                  Graduating Year <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={basicInfo.graduatingYear}
                    onChange={(e) => setBasicInfo({ graduatingYear: e.target.value })}
                    className={`
                      w-full px-6 py-4 border-2 rounded-xl text-gray-900 bg-white text-lg appearance-none
                      focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                      ${errors.graduatingYear ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                    `}
                  >
                    <option value="">Select your graduating year</option>
                    {graduatingYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.graduatingYear && (
                  <p className="text-error-600 text-sm font-medium flex items-center">
                    <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                    {errors.graduatingYear}
                  </p>
                )}
              </div>

              {/* Core Value Field */}
              <div className="space-y-3">
                <label className="block text-gray-900 font-semibold text-lg">
                  Which Haas core value do you most embody and why? <span className="text-error-500">*</span>
                </label>
                {/* Help Text - moved above textarea and with strong contrast */}
                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                  <h4 className="font-semibold text-primary-900 mb-2">Haas Core Values:</h4>
                  <ul className="text-sm text-gray-900 space-y-1">
                    <li>• <strong>Question the Status Quo</strong> - Challenge conventional thinking</li>
                    <li>• <strong>Confidence Without Attitude</strong> - Lead with humility</li>
                    <li>• <strong>Students Always</strong> - Embrace lifelong learning</li>
                    <li>• <strong>Beyond Yourself</strong> - Consider the greater good</li>
                  </ul>
                </div>
                <div className="relative">
                  <textarea
                    value={basicInfo.coreValue}
                    onChange={(e) => setBasicInfo({ coreValue: e.target.value })}
                    rows={6}
                    className={`
                      w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg resize-vertical
                      focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                      ${errors.coreValue ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                    `}
                    placeholder="Tell us about the Haas core value that resonates most with you and how you embody it in your daily life..."
                  />
                  <SparklesIcon className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                </div>
                {errors.coreValue && (
                  <p className="text-error-600 text-sm font-medium flex items-center">
                    <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                    {errors.coreValue}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-yellow-400 transition-all duration-200 flex items-center"
            >
              Continue
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 