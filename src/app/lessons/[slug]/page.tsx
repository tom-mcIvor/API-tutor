import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, BookOpen, CheckCircle, Target } from 'lucide-react'
import { getLessonBySlug, lessons } from '@/lib/lessons'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { ExerciseSection } from '@/components/interactive/ExerciseSection'

interface LessonPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }))
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params
  const lesson = await getLessonBySlug(slug)

  if (!lesson) {
    notFound()
  }

  const currentIndex = lessons.findIndex((l) => l.slug === slug)
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null

  // Convert markdown-style content to JSX (simplified version)
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactElement[] = []
    let currentElement = ''
    let elementType = 'p'

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        if (currentElement) {
          elements.push(
            createElement(elementType, currentElement, elements.length)
          )
          currentElement = ''
        }
        elementType = 'h1'
        currentElement = line.substring(2)
      } else if (line.startsWith('## ')) {
        if (currentElement) {
          elements.push(
            createElement(elementType, currentElement, elements.length)
          )
          currentElement = ''
        }
        elementType = 'h2'
        currentElement = line.substring(3)
      } else if (line.startsWith('### ')) {
        if (currentElement) {
          elements.push(
            createElement(elementType, currentElement, elements.length)
          )
          currentElement = ''
        }
        elementType = 'h3'
        currentElement = line.substring(4)
      } else if (line.startsWith('```')) {
        if (currentElement) {
          elements.push(
            createElement(elementType, currentElement, elements.length)
          )
          currentElement = ''
        }
        // Skip code blocks in content rendering as they're handled separately
        elementType = 'p'
      } else if (line.trim() === '') {
        if (currentElement) {
          elements.push(
            createElement(elementType, currentElement, elements.length)
          )
          currentElement = ''
          elementType = 'p'
        }
      } else {
        if (currentElement) currentElement += '\n'
        currentElement += line
      }
    })

    if (currentElement) {
      elements.push(createElement(elementType, currentElement, elements.length))
    }

    return elements
  }

  const createElement = (
    type: string,
    content: string,
    key: number
  ): React.ReactElement => {
    const processedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono dark:bg-gray-700 dark:text-gray-300">$1</code>'
      )

    switch (type) {
      case 'h1':
        return (
          <h1
            key={key}
            className="text-3xl font-bold text-gray-900 mb-6 dark:text-white"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        )
      case 'h2':
        return (
          <h2
            key={key}
            className="text-2xl font-semibold text-gray-900 mb-4 mt-8 dark:text-white"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        )
      case 'h3':
        return (
          <h3
            key={key}
            className="text-xl font-semibold text-gray-900 mb-3 mt-6 dark:text-white"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        )
      default:
        return (
          <p
            key={key}
            className="text-gray-700 mb-4 leading-relaxed dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        )
    }
  }

  return (
    <div className="min-h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to lessons
          </Link>

          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                lesson.level === 'beginner'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                  : lesson.level === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6 dark:text-gray-400">
            {lesson.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{lesson.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>{lesson.objectives.length} objectives</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Prerequisites */}
        {lesson.prerequisites && lesson.prerequisites.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 dark:bg-blue-900 dark:border-blue-700">
            <h3 className="font-semibold text-blue-900 mb-3 dark:text-blue-200">
              Prerequisites
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 dark:text-blue-300">
              {lesson.prerequisites.map((prereq, index) => (
                <li key={index}>• {prereq}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Objectives */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 dark:bg-green-900 dark:border-green-700">
          <h3 className="font-semibold text-green-900 mb-3 flex items-center dark:text-green-200">
            <Target className="w-4 h-4 mr-2" />
            Learning Objectives
          </h3>
          <ul className="text-sm text-green-800 space-y-2 dark:text-green-300">
            {lesson.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-8">
          {renderContent(lesson.content)}
        </div>

        {/* Code Examples */}
        {lesson.codeExamples && lesson.codeExamples.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 dark:text-white">
              Code Examples
            </h2>
            <div className="space-y-6">
              {lesson.codeExamples.map((example, index) => (
                <CodeBlock key={index} example={example} />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-3 dark:text-white">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {lesson.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Exercises */}
        <ExerciseSection lessonSlug={lesson.slug} />

        {/* Navigation */}
        <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex justify-between items-center">
            {prevLesson ? (
              <Link
                href={`/lessons/${prevLesson.slug}`}
                className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    Previous
                  </div>
                  <div className="font-medium">{prevLesson.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextLesson && (
              <Link
                href={`/lessons/${nextLesson.slug}`}
                className="flex items-center text-primary-600 hover:text-primary-700 text-right dark:text-primary-400 dark:hover:text-primary-300"
              >
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    Next
                  </div>
                  <div className="font-medium">{nextLesson.title}</div>
                </div>
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
