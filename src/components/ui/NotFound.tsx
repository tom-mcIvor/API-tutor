'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileQuestion, Home, ArrowLeft, Search } from 'lucide-react'

interface NotFoundProps {
  title?: string
  message?: string
  showSearch?: boolean
}

export function NotFound({ 
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  showSearch = true
}: NotFoundProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800">
            <FileQuestion className="w-12 h-12 text-gray-400" />
          </div>
          
          <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
            {title}
          </h1>
          
          <p className="text-gray-600 mb-8 dark:text-gray-400">
            {message}
          </p>
        </div>

        {showSearch && (
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for lessons..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          
          <Link
            href="/"
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Popular lessons:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Link href="/lessons/introduction" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Introduction to APIs
            </Link>
            <span>•</span>
            <Link href="/lessons/rest-fundamentals" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              REST Fundamentals  
            </Link>
            <span>•</span>
            <Link href="/lessons/authentication" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Authentication
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}