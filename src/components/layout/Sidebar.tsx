'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, 
  Code, 
  Globe, 
  Shield, 
  Layers, 
  TestTube, 
  User, 
  Menu,
  X,
  Home,
  Search
} from 'lucide-react'
import { SearchBox } from '@/components/ui/SearchBox'
import { NavigationItem } from '@/types'
import clsx from 'clsx'

const navigationItems: NavigationItem[] = [
  { id: 'home', title: 'Home', href: '/', icon: 'Home' },
  { id: 'intro', title: 'Introduction to APIs', href: '/lessons/introduction', icon: 'BookOpen' },
  { id: 'rest', title: 'REST Fundamentals', href: '/lessons/rest-fundamentals', icon: 'Globe' },
  { id: 'http', title: 'HTTP Methods', href: '/lessons/http-methods', icon: 'Code' },
  { id: 'auth', title: 'Authentication', href: '/lessons/authentication', icon: 'Shield' },
  { id: 'patterns', title: 'Design Patterns', href: '/lessons/design-patterns', icon: 'Layers' },
  { id: 'testing', title: 'Testing APIs', href: '/lessons/testing', icon: 'TestTube' },
  { id: 'playground', title: 'API Playground', href: '/playground', icon: 'Code' },
  { id: 'profile', title: 'Profile', href: '/profile', icon: 'User' },
]

const iconMap = {
  Home,
  BookOpen,
  Globe,
  Code,
  Shield,
  Layers,
  TestTube,
  User,
  Search,
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed lg:relative z-40 lg:z-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700',
        'w-64 flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">API Tutor</span>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <SearchBox placeholder="Search lessons..." showRecent={true} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              const isActive = pathname === item.href
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                      isActive 
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-400' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 text-center dark:text-gray-400">
            Built with Next.js & TypeScript
          </div>
        </div>
      </div>
    </>
  )
}