'use client'

import { CheckCircle, Circle, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ProgressStep {
  id: string
  title: string
  isCompleted: boolean
  isActive: boolean
  isLocked?: boolean
}

interface ProgressIndicatorProps {
  steps: ProgressStep[]
  orientation?: 'horizontal' | 'vertical'
  showLabels?: boolean
  animated?: boolean
}

export function ProgressIndicator({ 
  steps, 
  orientation = 'horizontal', 
  showLabels = true,
  animated = true 
}: ProgressIndicatorProps) {
  const [animatedSteps, setAnimatedSteps] = useState<ProgressStep[]>(steps)

  useEffect(() => {
    if (animated) {
      // Animate steps completion with staggered delay
      steps.forEach((step, index) => {
        if (step.isCompleted) {
          setTimeout(() => {
            setAnimatedSteps(prev => prev.map(s => 
              s.id === step.id ? { ...s, isCompleted: true } : s
            ))
          }, index * 200)
        }
      })
    }
  }, [steps, animated])

  const completedCount = steps.filter(step => step.isCompleted).length
  const progressPercentage = (completedCount / steps.length) * 100

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col space-y-4">
        {/* Overall progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Overall Progress
            </span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {completedCount}/{steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-1000 ease-out dark:bg-primary-400"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {(animated ? animatedSteps : steps).map((step, index) => (
            <div key={step.id} className="flex items-start space-x-3">
              {/* Step indicator */}
              <div className="flex-shrink-0 mt-1">
                {step.isCompleted ? (
                  <CheckCircle 
                    className={`w-6 h-6 text-green-500 ${animated ? 'animate-bounce' : ''}`} 
                  />
                ) : step.isLocked ? (
                  <Lock className="w-6 h-6 text-gray-400" />
                ) : step.isActive ? (
                  <div className="w-6 h-6 border-2 border-primary-500 rounded-full bg-primary-100 dark:bg-primary-900 relative">
                    <div className="absolute inset-2 bg-primary-500 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                )}
              </div>
              
              {/* Step content */}
              {showLabels && (
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    step.isCompleted 
                      ? 'text-green-700 dark:text-green-400' 
                      : step.isActive 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : step.isLocked
                          ? 'text-gray-400 dark:text-gray-600'
                          : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {step.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Horizontal orientation
  return (
    <div className="w-full">
      {/* Overall progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Learning Progress
          </span>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out relative dark:from-primary-400 dark:to-primary-500"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 10 && (
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between">
        {(animated ? animatedSteps : steps).map((step, index) => (
          <div key={step.id} className="flex flex-col items-center space-y-2 flex-1">
            {/* Step indicator */}
            <div className="relative">
              {step.isCompleted ? (
                <CheckCircle 
                  className={`w-8 h-8 text-green-500 ${animated && step.isCompleted ? 'animate-bounce' : ''}`}
                />
              ) : step.isLocked ? (
                <Lock className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              ) : step.isActive ? (
                <div className="w-8 h-8 border-3 border-primary-500 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                </div>
              ) : (
                <Circle className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              )}
              
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute top-4 left-8 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
                  <div 
                    className="h-full bg-primary-500 transition-all duration-500 ease-out"
                    style={{ 
                      width: step.isCompleted ? '100%' : '0%' 
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Step label */}
            {showLabels && (
              <p className={`text-xs text-center font-medium max-w-20 ${
                step.isCompleted 
                  ? 'text-green-700 dark:text-green-400' 
                  : step.isActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : step.isLocked
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-600 dark:text-gray-400'
              }`}>
                {step.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}