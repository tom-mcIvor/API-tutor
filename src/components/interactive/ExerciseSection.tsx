'use client'

import { useState } from 'react'
import { Trophy, Clock, Target, ChevronDown, ChevronUp } from 'lucide-react'
import { InteractiveExercise } from './InteractiveExercise'
import { getExercisesForLesson } from '@/data/exercises'
import type { ExerciseAttempt } from '@/types'

interface ExerciseSectionProps {
  lessonSlug: string
  onExerciseComplete?: (attempt: ExerciseAttempt) => void
}

export function ExerciseSection({ lessonSlug, onExerciseComplete }: ExerciseSectionProps) {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [exerciseScores, setExerciseScores] = useState<Record<string, number>>({})

  const exercises = getExercisesForLesson(lessonSlug)

  if (!exercises || exercises.length === 0) {
    return null
  }

  const handleExerciseComplete = (attempt: ExerciseAttempt) => {
    setCompletedExercises(prev => new Set([...prev, attempt.exerciseId]))
    setExerciseScores(prev => ({
      ...prev,
      [attempt.exerciseId]: attempt.score
    }))
    onExerciseComplete?.(attempt)
  }

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId)
  }

  const getTotalScore = () => {
    return Object.values(exerciseScores).reduce((sum, score) => sum + score, 0)
  }

  const getMaxScore = () => {
    return exercises.reduce((sum, exercise) => sum + exercise.points, 0)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Section Header */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Interactive Exercises
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge and practice what you've learned
            </p>
          </div>
          
          {completedExercises.size > 0 && (
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Trophy className="w-4 h-4" />
                <span>Progress: {completedExercises.size}/{exercises.length}</span>
              </div>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {getTotalScore()}/{getMaxScore()} points
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedExercises.size / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        {exercises.map((exercise, index) => {
          const isCompleted = completedExercises.has(exercise.id)
          const isExpanded = expandedExercise === exercise.id
          const score = exerciseScores[exercise.id] || 0

          return (
            <div 
              key={exercise.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Exercise Header */}
              <button
                onClick={() => toggleExercise(exercise.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        #{index + 1}
                      </span>
                      {isCompleted && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {exercise.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exercise.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Trophy className="w-4 h-4 mr-1" />
                      {isCompleted ? `${score}/${exercise.points}` : exercise.points}
                    </div>
                    
                    {exercise.timeLimit && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {Math.floor(exercise.timeLimit / 60)}m
                      </div>
                    )}

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Exercise Content */}
              {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <InteractiveExercise
                    exercise={exercise}
                    onComplete={handleExerciseComplete}
                    showHints={true}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      {completedExercises.size === exercises.length && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                Congratulations! 🎉
              </h3>
              <p className="text-green-800 dark:text-green-200">
                You've completed all exercises for this lesson and earned {getTotalScore()} points!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}