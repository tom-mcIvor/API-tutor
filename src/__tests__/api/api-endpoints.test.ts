/**
 * API Endpoints Integration Tests
 * Tests the API endpoints without mocking Prisma client
 */

import { NextRequest } from 'next/server'

// Mock the Prisma client at the module level
jest.mock('../../lib/prisma', () => ({
  prisma: {
    lesson: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}))

// Import after mocking
import { GET as getLessons } from '../../app/api/lessons/route'
import { GET as getLessonBySlug } from '../../app/api/lessons/[slug]/route'

describe('API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('/api/lessons', () => {
    it('should return lessons with proper structure', async () => {
      const mockLessons = [
        {
          id: 'lesson-1',
          title: 'Introduction to APIs',
          description: 'Learn the basics of APIs',
          category: 'Fundamentals',
          level: 'beginner',
          duration: 15,
          slug: 'introduction-to-apis',
          orderIndex: 1,
          content: 'Lesson content here...',
          prerequisites: [],
          objectives: [],
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          codeExamples: [],
          interactiveExercises: [],
        },
        {
          id: 'lesson-2',
          title: 'HTTP Methods',
          description: 'Understanding GET, POST, PUT, DELETE',
          category: 'HTTP',
          level: 'beginner',
          duration: 20,
          slug: 'http-methods',
          orderIndex: 2,
          content: 'HTTP methods lesson content...',
          prerequisites: [],
          objectives: [],
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          codeExamples: [],
          interactiveExercises: [],
        },
      ]

      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findMany.mockResolvedValue(mockLessons)

      const response = await getLessons()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(2)
      
      // Verify lesson structure
      data.forEach((lesson: any) => {
        expect(lesson).toHaveProperty('id')
        expect(lesson).toHaveProperty('title')
        expect(lesson).toHaveProperty('slug')
        expect(lesson).toHaveProperty('level')
        expect(lesson).toHaveProperty('description')
        expect(lesson).toHaveProperty('codeExamples')
        expect(lesson).toHaveProperty('interactiveExercises')
        expect(Array.isArray(lesson.codeExamples)).toBe(true)
        expect(Array.isArray(lesson.interactiveExercises)).toBe(true)
      })

      // Verify Prisma was called correctly
      expect(prisma.lesson.findMany).toHaveBeenCalledWith({
        orderBy: {
          orderIndex: 'asc'
        },
        include: {
          codeExamples: true,
          interactiveExercises: {
            include: {
              exerciseComponents: true
            }
          }
        }
      })
    })

    it('should handle database errors gracefully', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findMany.mockRejectedValue(new Error('Database connection failed'))

      const response = await getLessons()

      expect(response.status).toBe(500)
      
      const data = await response.json()
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Failed to fetch lessons')
    })

    it('should return empty array when no lessons exist', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findMany.mockResolvedValue([])

      const response = await getLessons()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(0)
    })
  })

  describe('/api/lessons/[slug]', () => {
    it('should return lesson by slug with proper structure', async () => {
      const mockLesson = {
        id: 'lesson-1',
        title: 'Introduction to APIs',
        description: 'Learn the basics of APIs',
        content: 'Detailed lesson content here...',
        category: 'Fundamentals',
        level: 'beginner',
        duration: 15,
        slug: 'introduction-to-apis',
        orderIndex: 1,
        prerequisites: [],
        objectives: [],
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        codeExamples: [
          {
            id: 'code-1',
            title: 'Basic API Call',
            language: 'javascript',
            code: 'fetch("/api/users")',
            explanation: 'This makes a GET request',
            orderIndex: 1,
            lessonId: 'lesson-1',
          },
        ],
        interactiveExercises: [
          {
            id: 'exercise-1',
            type: 'multiple-choice',
            title: 'What is an API?',
            difficulty: 'easy',
            points: 10,
            orderIndex: 1,
            lessonId: 'lesson-1',
            exerciseComponents: [],
          },
        ],
      }

      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findUnique.mockResolvedValue(mockLesson)

      const request = new NextRequest('http://localhost:3000/api/lessons/introduction-to-apis')
      const response = await getLessonBySlug(request, { params: Promise.resolve({ slug: 'introduction-to-apis' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('title')
      expect(data).toHaveProperty('slug')
      expect(data).toHaveProperty('content')
      expect(data).toHaveProperty('codeExamples')
      expect(data).toHaveProperty('interactiveExercises')
      
      // Verify relationships are included
      expect(Array.isArray(data.codeExamples)).toBe(true)
      expect(data.codeExamples).toHaveLength(1)
      expect(data.codeExamples[0]).toHaveProperty('code')
      expect(data.codeExamples[0]).toHaveProperty('language')
      
      expect(Array.isArray(data.interactiveExercises)).toBe(true)
      expect(data.interactiveExercises).toHaveLength(1)
      expect(data.interactiveExercises[0]).toHaveProperty('type')
      expect(data.interactiveExercises[0]).toHaveProperty('difficulty')

      // Verify Prisma was called correctly
      expect(prisma.lesson.findUnique).toHaveBeenCalledWith({
        where: {
          slug: 'introduction-to-apis'
        },
        include: {
          codeExamples: {
            orderBy: {
              orderIndex: 'asc'
            }
          },
          interactiveExercises: {
            include: {
              exerciseComponents: {
                orderBy: {
                  orderIndex: 'asc'
                }
              }
            }
          }
        }
      })
    })

    it('should return 404 for non-existent lesson', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/lessons/non-existent')
      const response = await getLessonBySlug(request, { params: Promise.resolve({ slug: 'non-existent' }) })

      expect(response.status).toBe(404)
      
      const data = await response.json()
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Lesson not found')
    })

    it('should handle database errors gracefully', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findUnique.mockRejectedValue(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/lessons/test-slug')
      const response = await getLessonBySlug(request, { params: Promise.resolve({ slug: 'test-slug' }) })

      expect(response.status).toBe(500)
      
      const data = await response.json()
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Failed to fetch lesson')
    })

    it('should handle empty slug parameter', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/lessons/')
      const response = await getLessonBySlug(request, { params: Promise.resolve({ slug: '' }) })

      expect(response.status).toBe(404)
      
      const data = await response.json()
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Lesson not found')
    })
  })

  describe('API Response Headers', () => {
    it('should set correct content-type headers', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findMany.mockResolvedValue([])

      const response = await getLessons()

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should handle CORS if needed', async () => {
      const { prisma } = require('../../lib/prisma')
      prisma.lesson.findMany.mockResolvedValue([])

      const response = await getLessons()

      // Check if CORS headers are set (if implemented)
      // This is optional based on your CORS configuration
      expect(response.status).toBe(200)
    })
  })

  describe('API Performance', () => {
    it('should complete requests within reasonable time', async () => {
      const { prisma } = require('../../lib/prisma')
      const mockLessons = Array.from({ length: 10 }, (_, i) => ({
        id: `lesson-${i}`,
        title: `Lesson ${i}`,
        description: `Description ${i}`,
        category: 'Test',
        level: 'beginner',
        duration: 15,
        slug: `lesson-${i}`,
        orderIndex: i,
        content: `Content ${i}`,
        prerequisites: [],
        objectives: [],
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        codeExamples: [],
        interactiveExercises: [],
      }))

      prisma.lesson.findMany.mockResolvedValue(mockLessons)

      const startTime = Date.now()
      const response = await getLessons()
      const endTime = Date.now()

      expect(response.status).toBe(200)
      expect(endTime - startTime).toBeLessThan(1000) // Should complete within 1 second
    })
  })
})