'use client'

import { useState, useEffect } from 'react'
import { Clock, Lightbulb, CheckCircle, XCircle, Trophy } from 'lucide-react'
import type { InteractiveExercise, ExerciseAttempt } from '@/types'
import { CodeCompletionExercise } from './CodeCompletionExercise'
import { APIBuilderExercise } from './APIBuilderExercise'
import { DebuggingExercise } from './DebuggingExercise'
import { MultipleChoiceExercise } from './MultipleChoiceExercise'
import { DragDropExercise } from './DragDropExercise'

interface InteractiveExerciseProps {
  exercise: InteractiveExercise
  onComplete?: (attempt: ExerciseAttempt) => void
  showHints?: boolean
}

export function InteractiveExercise({ 
  exercise, 
  onComplete, 
  showHints = true 
}: InteractiveExerciseProps) {
  const [startTime] = useState(Date.now())
  const [timeLeft, setTimeLeft] = useState(exercise.timeLimit || 0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [currentHint, setCurrentHint] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  // Timer effect
  useEffect(() => {
    if (!exercise.timeLimit || isCompleted) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [exercise.timeLimit, isCompleted])

  const handleTimeUp = () => {
    if (!isCompleted) {
      setIsCompleted(true)
      setFeedback("Time's up! Don't worry, you can try again.")
      handleSubmit(null, false)
    }
  }

  const handleHint = () => {
    if (!exercise.hints || hintsUsed >= exercise.hints.length) return
    
    setCurrentHint(exercise.hints[hintsUsed])
    setHintsUsed(prev => prev + 1)
    
    // Auto-hide hint after 10 seconds
    setTimeout(() => setCurrentHint(null), 10000)
  }

  const handleSubmit = (answer: any, isCorrect: boolean, partialScore?: number) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    const finalScore = partialScore ?? (isCorrect ? exercise.points : 0)
    
    // Reduce score for hints used
    const penaltyPerHint = Math.floor(exercise.points * 0.1)
    const adjustedScore = Math.max(0, finalScore - (hintsUsed * penaltyPerHint))
    
    setScore(adjustedScore)
    setIsCompleted(true)
    
    const attempt: ExerciseAttempt = {
      exerciseId: exercise.id,
      userId: 'current-user', // This would come from auth context
      answer,
      isCorrect,
      score: adjustedScore,
      timeSpent,
      hintsUsed,
      timestamp: new Date()
    }

    if (isCorrect) {
      setFeedback(exercise.validation.feedback.correct)
    } else if (partialScore !== undefined) {
      setFeedback(exercise.validation.feedback.partial || 'Partially correct!')
    } else {
      setFeedback(exercise.validation.feedback.incorrect)
    }

    onComplete?.(attempt)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const renderExerciseComponent = () => {
    const commonProps = {
      exercise,
      onSubmit: handleSubmit,
      disabled: isCompleted
    }

    switch (exercise.type) {
      case 'code-completion':
        return <CodeCompletionExercise {...commonProps} />
      case 'api-builder':
        return <APIBuilderExercise {...commonProps} />
      case 'debugging':
        return <DebuggingExercise {...commonProps} />
      case 'multiple-choice':
        return <MultipleChoiceExercise {...commonProps} />
      case 'drag-drop':
        return <DragDropExercise {...commonProps} />
      default:
        return <div>Unsupported exercise type</div>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {exercise.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {exercise.description}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Trophy className="w-4 h-4 mr-1" />
              {exercise.points} pts
            </div>
          </div>
        </div>

        {/* Timer and Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {exercise.timeLimit && (
              <div className={`flex items-center text-sm ${
                timeLeft < 60 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            )}
            
            {showHints && exercise.hints && exercise.hints.length > 0 && (
              <button
                onClick={handleHint}
                disabled={hintsUsed >= exercise.hints.length || isCompleted}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed dark:text-blue-400"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Hint ({hintsUsed}/{exercise.hints.length})
              </button>
            )}
          </div>

          {isCompleted && (
            <div className="flex items-center space-x-2">
              <div className={`flex items-center text-sm ${
                score > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {score > 0 ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                Score: {score}/{exercise.points}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hint Display */}
      {currentHint && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 p-4">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Hint:</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">{currentHint}</p>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Content */}
      <div className="p-6">
        {renderExerciseComponent()}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`p-4 border-t ${
          score > 0 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
        }`}>
          <div className="flex items-start">
            {score > 0 ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className={`text-sm font-medium mb-1 ${
                score > 0 ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
              }`}>
                {score > 0 ? 'Great job!' : 'Not quite right'}
              </p>
              <p className={`text-sm ${
                score > 0 ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              }`}>
                {feedback}
              </p>
              {exercise.solution.explanation && isCompleted && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Explanation:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{exercise.solution.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}