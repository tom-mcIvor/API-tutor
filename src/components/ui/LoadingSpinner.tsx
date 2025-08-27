'use client'

import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  text?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const colorClasses = {
  primary: 'text-primary-600',
  white: 'text-white',
  gray: 'text-gray-500'
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  text,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center space-y-3">
      <Loader2 
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
      />
      {text && (
        <p className={`text-sm font-medium ${
          color === 'white' ? 'text-white' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 dark:bg-gray-900/80">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  )
}

// Skeleton loading components
export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-700 dark:border-gray-600 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-gray-200 rounded w-20 dark:bg-gray-600" />
        <div className="h-4 bg-gray-200 rounded w-4 dark:bg-gray-600" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 dark:bg-gray-600" />
      <div className="h-4 bg-gray-200 rounded w-full mb-4 dark:bg-gray-600" />
      <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-600" />
    </div>
  )
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className="h-4 bg-gray-200 rounded dark:bg-gray-600"
          style={{ 
            width: index === lines - 1 ? '75%' : '100%' 
          }}
        />
      ))}
    </div>
  )
}