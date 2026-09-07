'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, ArrowLeftIcon, CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useFormStore } from '@/store/formStore'
import { committees } from '@/data/committees'
import { SEMESTER } from '@/lib/config'

export default function CommitteesPage() {
  const router = useRouter()
  const { selectedCommittees, setSelectedCommittees } = useFormStore()
  const [error, setError] = useState('')

  const handleCommitteeToggle = (committeeId: string) => {
    setError('')
    
    if (selectedCommittees.includes(committeeId)) {
      setSelectedCommittees(selectedCommittees.filter(id => id !== committeeId))
    } else {
      if (selectedCommittees.length >= 2) {
        setError('You can only select up to 2 committees')
        return
      }
      setSelectedCommittees([...selectedCommittees, committeeId])
    }
  }

  const handleNext = () => {
    if (selectedCommittees.length === 0) {
      setError('Please select at least one committee')
      return
    }
    
    if (selectedCommittees.length > 2) {
      setError('You can only select up to 2 committees')
      return
    }

    router.push(`/form/questions/${selectedCommittees[0]}`)
  }

  const handleBack = () => {
    router.push('/form/general')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">HBSA {SEMESTER} Associate Application</h1>
              <p className="text-sm text-gray-600">Step 3 of 4</p>
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
              <UserGroupIcon className="w-4 h-4 mr-2" />
              Committee Selection
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Committees
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select up to <span className="font-semibold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">2 committees</span> that interest you most. 
              You&apos;ll answer questions for each selected committee later.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Committees Grid */}
          <div className="space-y-4">
            {committees.map((committee) => (
              <div
                key={committee.id}
                onClick={() => handleCommitteeToggle(committee.id)}
                className={`
                  relative cursor-pointer transition-all duration-200 rounded-lg p-6
                  ${selectedCommittees.includes(committee.id)
                    ? 'bg-primary-50 border-4 border-primary-500 shadow-sm'
                    : 'bg-white border-2 border-gray-200 hover:border-primary-200 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                      ${selectedCommittees.includes(committee.id)
                        ? 'border-black bg-black'
                        : 'border-gray-300'
                      }
                    `}>
                      {selectedCommittees.includes(committee.id) && (
                        <CheckIcon className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {committee.label}
                      </h3>
                      <span className={`
                        text-xs font-medium px-2 py-1 rounded-full
                        ${selectedCommittees.includes(committee.id)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        {committee.questions.length} question{committee.questions.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {committee.description}
                    </p>
                  </div>
                </div>

                {/* Filled Circle Indicator */}
                {selectedCommittees.includes(committee.id) && (
                  <div className="absolute top-4 right-4 w-4 h-4 bg-primary-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {selectedCommittees.length} of 2 committees selected
                </div>
                <div className="flex justify-center sm:justify-start space-x-1">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        selectedCommittees.length >= num ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={selectedCommittees.length === 0}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-yellow-400 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 