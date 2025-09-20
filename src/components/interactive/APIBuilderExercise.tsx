'use client'

import { useState } from 'react'
import { Play, Check, AlertTriangle, CheckCircle } from 'lucide-react'
import { APIBuilderExercise as APIBuilderExerciseType } from '@/types'

interface APIBuilderExerciseProps {
  exercise: APIBuilderExerciseType
  onSubmit: (answer: any, isCorrect: boolean, partialScore?: number) => void
  disabled?: boolean
}

export function APIBuilderExercise({ 
  exercise, 
  onSubmit, 
  disabled = false 
}: APIBuilderExerciseProps) {
  const [code, setCode] = useState(exercise.startingCode || '')
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    setShowResults(false)
    
    // Simulate API testing (in a real app, this would run against a sandbox)
    const results = await Promise.all(
      exercise.testCases.map(async (testCase) => {
        try {
          // Simulate test execution
          await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
          
          // Mock test result based on code quality (simplified)
          const codeQuality = analyzeCode(code, testCase)
          const passed = codeQuality > 0.7
          
          return {
            id: testCase.id,
            description: testCase.description,
            method: testCase.method,
            endpoint: testCase.endpoint,
            expectedStatus: testCase.expectedStatus,
            actualStatus: passed ? testCase.expectedStatus : 500,
            passed,
            error: passed ? null : 'Implementation does not meet requirements',
            responseTime: Math.floor(Math.random() * 200) + 50
          }
        } catch (error) {
          return {
            id: testCase.id,
            description: testCase.description,
            method: testCase.method,
            endpoint: testCase.endpoint,
            expectedStatus: testCase.expectedStatus,
            actualStatus: 500,
            passed: false,
            error: 'Runtime error in implementation',
            responseTime: 0
          }
        }
      })
    )
    
    setTestResults(results)
    setIsRunning(false)
    setShowResults(true)
    
    const passedTests = results.filter(r => r.passed).length
    const isFullyCorrect = passedTests === results.length
    const partialScore = Math.floor((passedTests / results.length) * exercise.points)
    
    onSubmit(code, isFullyCorrect, partialScore)
  }

  // Simple code analysis (in a real app, this would be more sophisticated)
  const analyzeCode = (code: string, testCase: any): number => {
    let score = 0.5 // Base score
    
    // Check if code contains the required method
    if (code.toLowerCase().includes(testCase.method.toLowerCase())) {
      score += 0.2
    }
    
    // Check if code contains endpoint pattern
    if (code.includes(testCase.endpoint) || code.includes(testCase.endpoint.replace(/\/:\w+/g, ''))) {
      score += 0.2
    }
    
    // Check for basic API patterns
    if (code.includes('app.') || code.includes('router.') || code.includes('express')) {
      score += 0.1
    }
    
    return Math.min(score, 1)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 dark:text-green-400'
    if (status >= 400 && status < 500) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'PATCH': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Scenario:
        </h4>
        <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
          {exercise.scenario}
        </p>
        
        <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Requirements:
        </h5>
        <ul className="space-y-1">
          {exercise.requirements.map((req, index) => (
            <li key={index} className="flex items-start text-sm text-blue-800 dark:text-blue-200">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Code Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Your API Implementation:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={disabled}
          placeholder="Write your API code here..."
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
        />
      </div>

      {/* Test Cases */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Test Cases:
        </h4>
        <div className="grid gap-3">
          {exercise.testCases.map((testCase) => {
            const result = testResults.find(r => r.id === testCase.id)
            
            return (
              <div 
                key={testCase.id}
                className={`p-3 rounded-lg border ${
                  result 
                    ? result.passed 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(testCase.method)}`}>
                      {testCase.method}
                    </span>
                    <code className="text-sm text-gray-700 dark:text-gray-300">
                      {testCase.endpoint}
                    </code>
                  </div>
                  
                  {result && (
                    <div className="flex items-center space-x-2">
                      {result.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${getStatusColor(result.actualStatus)}`}>
                        {result.actualStatus}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {result.responseTime}ms
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {testCase.description}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Expected: {testCase.expectedStatus}
                </p>
                
                {result && result.error && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Error: {result.error}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {showResults && (
            <span>
              {testResults.filter(r => r.passed).length} of {testResults.length} tests passed
            </span>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={runTests}
            disabled={!code.trim() || disabled || isRunning}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Running Tests...' : 'Run Tests'}</span>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isRunning && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Testing your API implementation...
          </span>
        </div>
      )}
    </div>
  )
}