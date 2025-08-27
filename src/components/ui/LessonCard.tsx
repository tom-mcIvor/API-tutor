'use client'

import Link from 'next/link'
import { Clock, ArrowRight, CheckCircle, PlayCircle } from 'lucide-react'
import { useState } from 'react'

interface LessonCardProps {
  title: string
  href: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  description?: string
  progress?: number // 0-100
  isCompleted?: boolean
  isNew?: boolean
}

export function LessonCard({ 
  title, 
  href, 
  duration, 
  level, 
  description, 
  progress = 0, 
  isCompleted = false,
  isNew = false 
}: LessonCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const levelColors = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <Link
      href={href}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-primary-400 relative overflow-hidden">
        
        {/* Status indicators */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            {isCompleted && (
              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
            {isNew && !isCompleted && (
              <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                New
              </span>
            )}
          </div>
          <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-all duration-300 ${
            isHovered ? 'translate-x-1' : ''
          } dark:text-gray-500 dark:group-hover:text-primary-400`} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 dark:text-white dark:group-hover:text-primary-400">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500 ease-out dark:bg-primary-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[level]}`}>
              {level}
            </span>
          </div>
          
          {!isCompleted && (
            <PlayCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}