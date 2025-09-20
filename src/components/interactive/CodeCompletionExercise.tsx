'use client'

import { useState, useEffect } from 'react'
import { Play, Check } from 'lucide-react'
import { CodeCompletionExercise as CodeCompletionExerciseType } from '@/types'

interface CodeCompletionExerciseProps {
  exercise: CodeCompletionExerciseType
  onSubmit: (answer: any, isCorrect: boolean, partialScore?: number) => void
  disabled?: boolean
}

export function CodeCompletionExercise({ 
  exercise, 
  onSubmit, 
  disabled = false 
}: CodeCompletionExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState<Record<string, boolean>>({})

  // Initialize answers
  useEffect(() => {
    const initialAnswers: Record<string, string> = {}
    exercise.blanks.forEach(blank => {
      initialAnswers[blank.id] = ''
    })
    setAnswers(initialAnswers)
  }, [exercise.blanks])

  const handleAnswerChange = (blankId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [blankId]: value
    }))
    
    // Clear validation when user types
    if (showValidation[blankId]) {
      setShowValidation(prev => ({
        ...prev,
        [blankId]: false
      }))
    }
  }

  const validateAnswer = (blankId: string, answer: string): boolean => {
    const blank = exercise.blanks.find(b => b.id === blankId)
    if (!blank) return false

    const normalizedAnswer = blank.caseSensitive ? answer : answer.toLowerCase()
    return blank.correctAnswers.some(correct => 
      blank.caseSensitive ? correct === normalizedAnswer : correct.toLowerCase() === normalizedAnswer
    )
  }

  const handleSubmit = () => {
    const validationResults: Record<string, boolean> = {}
    let correctCount = 0

    exercise.blanks.forEach(blank => {
      const isCorrect = validateAnswer(blank.id, answers[blank.id])
      validationResults[blank.id] = isCorrect
      if (isCorrect) correctCount++
    })

    setShowValidation(validationResults)

    const isFullyCorrect = correctCount === exercise.blanks.length
    const partialScore = Math.floor((correctCount / exercise.blanks.length) * exercise.points)

    onSubmit(answers, isFullyCorrect, partialScore)
  }

  const renderCodeWithBlanks = () => {
    let codeTemplate = exercise.template
    
    exercise.blanks.forEach(blank => {
      const placeholder = `{{${blank.id}}}`
      const isValidated = showValidation[blank.id] !== undefined
      const isCorrect = showValidation[blank.id]
      
      const inputClass = `
        inline-block min-w-[100px] px-2 py-1 mx-1 text-sm border-b-2 bg-transparent
        focus:outline-none focus:border-blue-500
        ${isValidated 
          ? isCorrect 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600'
        }
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `.trim()

      const input = `<input 
        type="text" 
        value="${answers[blank.id] || ''}"
        placeholder="${blank.placeholder}"
        class="${inputClass}"
        data-blank-id="${blank.id}"
        ${disabled ? 'disabled' : ''}
      />`

      codeTemplate = codeTemplate.replace(placeholder, input)
    })

    return codeTemplate
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const blankId = e.target.getAttribute('data-blank-id')
    if (blankId) {
      handleAnswerChange(blankId, e.target.value)
    }
  }

  const allAnswered = exercise.blanks.every(blank => answers[blank.id]?.trim())

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-green-400 text-sm font-mono leading-relaxed">
          <code 
            dangerouslySetInnerHTML={{ __html: renderCodeWithBlanks() }}
            onChange={handleInputChange}
          />
        </pre>
      </div>

      {/* Blanks with hints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercise.blanks.map(blank => (
          <div key={blank.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {blank.placeholder}
            </label>
            <input
              type="text"
              value={answers[blank.id] || ''}
              onChange={(e) => handleAnswerChange(blank.id, e.target.value)}
              placeholder={`Enter ${blank.placeholder.toLowerCase()}`}
              disabled={disabled}
              className={`
                w-full px-3 py-2 border rounded-lg text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${showValidation[blank.id] !== undefined
                  ? showValidation[blank.id]
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                dark:bg-gray-700 dark:text-white
              `}
            />
            {blank.hint && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 {blank.hint}
              </p>
            )}
            {showValidation[blank.id] !== undefined && !showValidation[blank.id] && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Expected: {blank.correctAnswers.join(' or ')}
              </p>
            )}
          </div>
        ))}
      </div>

      {exercise.expectedOutput && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Expected Output:
          </h4>
          <pre className="text-sm text-blue-800 dark:text-blue-200 font-mono">
            {exercise.expectedOutput}
          </pre>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || disabled}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Submit Answer</span>
        </button>
      </div>
    </div>
  )
}