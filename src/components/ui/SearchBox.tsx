'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, Hash, BookOpen, Code } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  title: string
  type: 'lesson' | 'topic' | 'concept'
  href: string
  description: string
  keywords: string[]
  category: string
}

interface SearchBoxProps {
  onClose?: () => void
  placeholder?: string
  showRecent?: boolean
}

// Mock search data - in real app this would come from API
const searchData: SearchResult[] = [
  {
    id: 'intro-apis',
    title: 'Introduction to APIs',
    type: 'lesson',
    href: '/lessons/introduction',
    description: 'Learn the fundamentals of APIs and how they work',
    keywords: ['api', 'introduction', 'basics', 'fundamentals'],
    category: 'Basics'
  },
  {
    id: 'rest-fundamentals',
    title: 'REST Fundamentals',
    type: 'lesson',
    href: '/lessons/rest-fundamentals',
    description: 'Understand RESTful architecture principles',
    keywords: ['rest', 'restful', 'architecture', 'principles'],
    category: 'Architecture'
  },
  {
    id: 'http-methods',
    title: 'HTTP Methods',
    type: 'lesson',
    href: '/lessons/http-methods',
    description: 'Master GET, POST, PUT, DELETE and other HTTP methods',
    keywords: ['http', 'methods', 'get', 'post', 'put', 'delete'],
    category: 'HTTP'
  },
  {
    id: 'authentication',
    title: 'API Authentication',
    type: 'lesson',
    href: '/lessons/authentication',
    description: 'Learn various authentication strategies',
    keywords: ['authentication', 'auth', 'jwt', 'oauth', 'api key'],
    category: 'Security'
  },
  {
    id: 'status-codes',
    title: 'HTTP Status Codes',
    type: 'concept',
    href: '/lessons/rest-fundamentals#status-codes',
    description: '200, 404, 500 - Understanding response codes',
    keywords: ['status', 'codes', '200', '404', '500', 'response'],
    category: 'HTTP'
  },
  {
    id: 'json',
    title: 'JSON Data Format',
    type: 'concept',
    href: '/lessons/introduction#json',
    description: 'Working with JSON in API requests and responses',
    keywords: ['json', 'data', 'format', 'parsing'],
    category: 'Data'
  }
]

export function SearchBox({ onClose, placeholder = "Search lessons, topics, concepts...", showRecent = true }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (query.length === 0) {
      setResults([])
      setSelectedIndex(-1)
      return
    }

    // Real-time search with debouncing
    const timeoutId = setTimeout(() => {
      const filtered = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6) // Limit to 6 results

      setResults(filtered)
      setSelectedIndex(-1)
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSearch = (searchQuery: string, href?: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedRecent)
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent))
    }

    if (href) {
      router.push(href)
    }
    
    setQuery('')
    setIsOpen(false)
    onClose?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSearch(results[selectedIndex].title, results[selectedIndex].href)
      } else if (query.trim()) {
        handleSearch(query)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      onClose?.()
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen
      case 'concept': return Hash
      default: return Code
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 dark:text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (query || showRecent) && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto dark:bg-gray-800 dark:border-gray-600"
        >
          {/* Search Results */}
          {results.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100 dark:text-gray-400 dark:border-gray-700">
                Search Results
              </div>
              {results.map((result, index) => {
                const Icon = getIconForType(result.type)
                return (
                  <Link
                    key={result.id}
                    href={result.href}
                    onClick={() => handleSearch(result.title, result.href)}
                    className={`flex items-center px-3 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors dark:hover:bg-gray-700 dark:border-gray-700 ${
                      selectedIndex === index ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.description}
                      </div>
                      <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                        {result.category} • {result.type}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Recent Searches */}
          {query === '' && showRecent && recentSearches.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100 dark:text-gray-400 dark:border-gray-700">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left border-b border-gray-50 last:border-b-0 transition-colors dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <Clock className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 truncate">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div className="px-3 py-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try different keywords or browse lessons</p>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}