import Link from 'next/link'
import {
  BookOpen,
  Code,
  Globe,
  Shield,
  Layers,
  TestTube,
  ArrowRight,
  Clock,
  Users,
  Star,
} from 'lucide-react'
import { LessonCard } from '@/components/ui/LessonCard'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Lessons',
    description: 'Learn API fundamentals from basics to advanced concepts',
    color: 'text-blue-600',
  },
  {
    icon: Code,
    title: 'Interactive Playground',
    description: 'Practice API calls with real endpoints and see responses',
    color: 'text-green-600',
  },
  {
    icon: Globe,
    title: 'REST Principles',
    description: 'Master RESTful architecture and best practices',
    color: 'text-purple-600',
  },
  {
    icon: Shield,
    title: 'Authentication Methods',
    description: 'Learn various API authentication strategies',
    color: 'text-red-600',
  },
]

const quickStart = [
  {
    title: 'Introduction to APIs',
    href: '/lessons/introduction',
    duration: '15 min',
    level: 'Beginner' as const,
    description: 'Learn the fundamentals of APIs and how they work',
    progress: 0,
    isCompleted: false,
    isNew: false,
  },
  {
    title: 'REST Fundamentals',
    href: '/lessons/rest-fundamentals',
    duration: '25 min',
    level: 'Beginner' as const,
    description: 'Understand RESTful architecture principles',
    progress: 0,
    isCompleted: false,
    isNew: false,
  },
  {
    title: 'HTTP Methods',
    href: '/lessons/http-methods',
    duration: '30 min',
    level: 'Intermediate' as const,
    description: 'Master GET, POST, PUT, DELETE and other HTTP methods',
    progress: 0,
    isCompleted: false,
    isNew: true,
  },
  {
    title: 'API Authentication',
    href: '/lessons/authentication',
    duration: '35 min',
    level: 'Intermediate' as const,
    description: 'Learn various authentication strategies and security',
    progress: 0,
    isCompleted: false,
    isNew: true,
  },
]

const progressSteps = [
  { id: 'intro', title: 'Introduction', isCompleted: false, isActive: true },
  { id: 'rest', title: 'REST Basics', isCompleted: false, isActive: false },
  {
    id: 'methods',
    title: 'HTTP Methods',
    isCompleted: false,
    isActive: false,
    isLocked: false,
  },
  {
    id: 'auth',
    title: 'Authentication',
    isCompleted: false,
    isActive: false,
    isLocked: false,
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    isCompleted: false,
    isActive: false,
    isLocked: true,
  },
]


export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-blue-100 px-6 py-12 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 dark:text-white">
            Master APIs with
            <span className="text-primary-600"> Interactive Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-400">
            Learn API development, REST principles, authentication, and best
            practices through hands-on exercises and real-world examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lessons/introduction"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/playground"
              className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-800"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-16 px-6 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
              Why Choose API Tutor?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
              Our platform combines theory with practice to give you a complete
              understanding of API development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-md-dark"
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-gray-50 ${feature.color} mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="bg-gray-50 py-16 px-6 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
              Start Your Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Begin with these foundational lessons and progress at your own
              pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickStart.map((lesson, index) => (
              <LessonCard
                key={index}
                title={lesson.title}
                href={lesson.href}
                duration={lesson.duration}
                level={lesson.level}
                description={lesson.description}
                progress={lesson.progress}
                isCompleted={lesson.isCompleted}
                isNew={lesson.isNew}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 dark:text-white">
              Your Learning Path
            </h3>
            <ProgressIndicator
              steps={progressSteps}
              orientation="horizontal"
              animated={true}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16 px-6 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Become an API Expert?
          </h2>
          <p className="text-xl text-primary-100 mb-8 dark:text-primary-200">
            Join thousands of developers who have mastered API development with
            our platform.
          </p>
          <Link
            href="/lessons/introduction"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 dark:bg-gray-100 dark:text-primary-600 dark:hover:bg-gray-200"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
