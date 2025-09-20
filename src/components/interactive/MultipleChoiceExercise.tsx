'use client'

import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { MultipleChoiceExercise as MultipleChoiceExerciseType } from '@/types'

interface MultipleChoiceExerciseProps {
  exercise: MultipleChoiceExerciseType
  onSubmit: (answer: any, isCorrect: boolean, partialScore?: number) => void
  disabled?: boolean
}

export function MultipleChoiceExercise({ 
  exercise, 
  onSubmit, 
  disabled = false 
}: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (disabled || showResults) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    const selectedOptionData = exercise.options.find(opt => opt.id === selectedOption)
    const isCorrect = selectedOptionData?.isCorrect || false

    setShowResults(true)
    onSubmit(selectedOption, isCorrect)
  }

  const getOptionStyle = (option: any) => {
    let baseStyle = `
      w-full text-left p-4 border-2 rounded-lg transition-all duration-200
      hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20
      focus:outline-none focus:ring-2 focus:ring-blue-500
    `

    if (showResults) {
      if (option.isCorrect) {
        baseStyle += ' border-green-500 bg-green-50 dark:bg-green-900/20'
      } else if (option.id === selectedOption && !option.isCorrect) {
        baseStyle += ' border-red-500 bg-red-50 dark:bg-red-900/20'
      } else {
        baseStyle += ' border-gray-200 dark:border-gray-600 opacity-60'
      }
    } else if (option.id === selectedOption) {
      baseStyle += ' border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    } else {
      baseStyle += ' border-gray-200 dark:border-gray-600'
    }

    if (disabled) {
      baseStyle += ' cursor-not-allowed opacity-50'
    } else if (!showResults) {
      baseStyle += ' cursor-pointer'
    }

    return baseStyle.trim()
  }

  const getOptionIcon = (option: any) => {
    if (!showResults) {
      return (
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${option.id === selectedOption 
            ? 'border-blue-500 bg-blue-500' 
            : 'border-gray-300 dark:border-gray-600'
          }
        `}>
          {option.id === selectedOption && (
            <div className="w-2 h-2 bg-white rounded-full" />
          )}
        </div>
      )
    }

    if (option.isCorrect) {
      return <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
    } else if (option.id === selectedOption && !option.isCorrect) {
      return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
    }

    return (
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Question:
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          {exercise.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={disabled || showResults}
            className={getOptionStyle(option)}
          >
            <div className="flex items-start space-x-3">
              {getOptionIcon(option)}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {option.text}
                  </span>
                </div>
                
                {/* Show explanation after submission */}
                {showResults && option.explanation && (
                  <p className={`text-sm mt-2 ${
                    option.isCorrect 
                      ? 'text-green-700 dark:text-green-300' 
                      : option.id === selectedOption
                        ? 'text-red-700 dark:text-red-300'
                        : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {option.explanation}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Submit Button */}
      {!showResults && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || disabled}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Submit Answer</span>
          </button>
        </div>
      )}

      {/* Overall Explanation */}
      {showResults && exercise.explanation && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Explanation:
          </h5>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {exercise.explanation}
          </p>
        </div>
      )}
    </div>
  )
}