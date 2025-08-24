'use client'

import { useState } from 'react'
import { Copy, Check, Play } from 'lucide-react'
import { CodeExample } from '@/types'

interface CodeBlockProps {
  example: CodeExample
  showOutput?: boolean
}

export function CodeBlock({ example, showOutput = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(example.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const runCode = () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => setIsRunning(false), 1000)
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {(example.title || example.description) && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          {example.title && (
            <h4 className="font-semibold text-gray-900 mb-1">{example.title}</h4>
          )}
          {example.description && (
            <p className="text-sm text-gray-600">{example.description}</p>
          )}
        </div>
      )}
      
      <div className="relative">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
          <span className="text-sm text-gray-300 font-mono">{example.language}</span>
          <div className="flex items-center space-x-2">
            {example.editable && (
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center space-x-1 text-green-400 hover:text-green-300 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span className="text-xs">{isRunning ? 'Running...' : 'Run'}</span>
              </button>
            )}
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
          <code>{example.code}</code>
        </pre>
      </div>

      {showOutput && example.output && (
        <div className="bg-gray-100 px-4 py-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Output</span>
          </div>
          <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
            {example.output}
          </pre>
        </div>
      )}
    </div>
  )
}