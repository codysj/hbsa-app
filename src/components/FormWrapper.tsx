'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import { SEMESTER } from '@/lib/config'
import AnimatedProgress from './AnimatedProgress'

interface FormWrapperProps {
  children: ReactNode
  currentStep: string
  totalSteps: number
  stepNumber: number
}

export default function FormWrapper({ 
  children, 
  currentStep, 
  totalSteps, 
  stepNumber 
}: FormWrapperProps) {
  return (
    <div className="min-h-screen bg-haasGray">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-haasBlue mb-2">
            HBSA {SEMESTER} Associate Application
          </h1>
          <p className="text-haasText text-lg">
            Step {stepNumber} of {totalSteps}: {currentStep}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <AnimatedProgress
            current={stepNumber}
            total={totalSteps}
            animated={true}
          />
        </div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 border border-gray-100"
        >
          {children}
        </motion.div>

        {/* Navigation */}
        <Navigation currentStep={stepNumber} totalSteps={totalSteps} />
      </div>
    </div>
  )
} 