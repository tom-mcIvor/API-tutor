'use client'

import { useState } from 'react'
import { Bug, Check, AlertCircle } from 'lucide-react'
import { DebuggingExercise as DebuggingExerciseType } from '@/types'

interface DebuggingExerciseProps {
  exercise: DebuggingExerciseType
  onSubmit: (answer: any, isCorrect: boolean, partialScore?: number) => void
  disabled?: boolean
}

export function DebuggingExercise({ 
  exercise, 
  onSubmit, 
  disabled = false 
}: DebuggingExerciseProps) {
  const [fixedCode, setFixedCode] = useState(exercise.buggyCode)
  const [foundBugs, setFoundBugs] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const analyzeBugs = () => {
    // Simple bug detection (in a real app, this would be more sophisticated)
    const bugs = detectBugs(fixedCode, exercise.buggyCode)
    const bugsFixed = bugs.filter(bug => bug.fixed).length
    const isFullyCorrect = bugsFixed >= exercise.bugCount
    const partialScore = Math.floor((bugsFixed / exercise.bugCount) * exercise.points)
    
    setAnalysisResults({
      bugsFound: bugs,
      bugsFixed,
      totalBugs: exercise.bugCount,
      isComplete: isFullyCorrect
    })
    setShowResults(true)
    
    onSubmit(fixedCode, isFullyCorrect, partialScore)
  }

  // Simple bug detection logic (this would be much more sophisticated in a real app)
  const detectBugs = (fixedCode: string, originalCode: string) => {
    const bugs = []
    
    // Common API bugs to check for
    const bugPatterns = [
      {
        id: 'missing-error-handling',
        description: 'Missing error handling',
        pattern: /try\s*{[\s\S]*?}\s*catch/,
        fixed: /try\s*{[\s\S]*?}\s*catch/.test(fixedCode) && !/try\s*{[\s\S]*?}\s*catch/.test(originalCode)
      },
      {
        id: 'incorrect-status-code',
        description: 'Incorrect HTTP status code',
        pattern: /\.status\(\s*200\s*\)/,
        fixed: fixedCode.includes('.status(201)') && originalCode.includes('.status(200)')
      },
      {
        id: 'missing-validation',
        description: 'Missing input validation',
        pattern: /if\s*\(\s*!.*\)/,
        fixed: /if\s*\(\s*!.*\)/.test(fixedCode) && !/if\s*\(\s*!.*\)/.test(originalCode)
      },
      {
        id: 'async-await-issue',
        description: 'Missing await keyword',
        pattern: /await\s+/,
        fixed: fixedCode.includes('await') && !originalCode.includes('await')
      },
      {
        id: 'json-parsing',
        description: 'Missing JSON parsing',
        pattern: /JSON\.parse|\.json\(\)/,
        fixed: (/JSON\.parse|\.json\(\)/.test(fixedCode)) && !(/JSON\.parse|\.json\(\)/.test(originalCode))
      }
    ]
    
    bugPatterns.forEach(pattern => {
      bugs.push({
        id: pattern.id,
        description: pattern.description,
        fixed: pattern.fixed
      })
    })
    
    return bugs.slice(0, exercise.bugCount) // Limit to expected bug count
  }

  const getLineNumbers = (code: string) => {
    return code.split('\n').map((_, index) => index + 1)
  }

  return (
    <div className="space-y-6">
      {/* Problem Description */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
        <div className="flex items-start space-x-2">
          <Bug className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
              Bug Report:
            </h4>
            <p className="text-red-800 dark:text-red-200 text-sm mb-3">
              {exercise.errorDescription}
            </p>
            
            <h5 className="font-medium text-red-900 dark:text-red-100 mb-1">
              Expected Behavior:
            </h5>
            <p className="text-red-800 dark:text-red-200 text-sm mb-3">
              {exercise.expectedBehavior}
            </p>
            
            <div className="flex items-center text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Find and fix {exercise.bugCount} bug{exercise.bugCount > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Debug the code below:
        </label>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 rounded-l-lg flex flex-col text-xs text-gray-500 dark:text-gray-400">
            {getLineNumbers(fixedCode).map(lineNum => (
              <div key={lineNum} className="h-6 flex items-center justify-center">
                {lineNum}
              </div>
            ))}
          </div>
          <textarea
            value={fixedCode}
            onChange={(e) => setFixedCode(e.target.value)}
            disabled={disabled}
            className="w-full pl-14 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            rows={Math.max(12, fixedCode.split('\n').length)}
            style={{ lineHeight: '1.5rem' }}
          />
        </div>
      </div>

      {/* Analysis Results */}
      {showResults && analysisResults && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Bug Analysis Results:
          </h4>
          
          <div className="grid gap-3">
            {analysisResults.bugsFound.map((bug: any) => (
              <div 
                key={bug.id}
                className={`p-3 rounded-lg border ${
                  bug.fixed 
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {bug.fixed ? (
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Bug className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    bug.fixed 
                      ? 'text-green-900 dark:text-green-100' 
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {bug.description}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    bug.fixed 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {bug.fixed ? 'Fixed' : 'Not Fixed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Summary:</strong> {analysisResults.bugsFixed} of {analysisResults.totalBugs} bugs fixed
              {analysisResults.isComplete && ' - Great job! All bugs have been resolved.'}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={analyzeBugs}
          disabled={disabled || showResults}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Analyze & Submit</span>
        </button>
      </div>
    </div>
  )
}