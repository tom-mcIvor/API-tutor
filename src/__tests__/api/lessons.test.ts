import { NextRequest } from 'next/server'

// Mock Prisma before importing the route handlers
const mockPrisma = {
  lesson: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}

// Mock the prisma import
jest.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))

// Import route handlers after mocking
import { GET } from '@/app/api/lessons/route'
import { GET as GetBySlug } from '@/app/api/lessons/[slug]/route'

describe('/api/lessons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/lessons', () => {
    it('should return all lessons with relationships', async () => {
      const mockLessons = [
        {
          id: 'intro-to-apis',
          title: 'What are APIs?',
          description: 'Learn the fundamentals of APIs',
          category: 'Introduction',
          level: 'beginner',
          duration: 15,
          content: '# What are APIs?',
          prerequisites: [],
          objectives: ['Understand what an API is'],
          tags: ['basics'],
          slug: 'introduction',
          orderIndex: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          codeExamples: [
            {
              id: 'basic-api-call',
              lessonId: 'intro-to-apis',
              language: 'javascript',
              title: 'Basic API Call',
              description: 'A simple fetch request',
              code: 'fetch("/api/users")',
              output: 'User data',
              editable: false,
              orderIndex: 0,
            },
          ],
          interactiveExercises: [
            {
              id: 'api-basics-quiz',
              lessonSlug: 'introduction',
              type: 'multiple_choice',
              title: 'API Fundamentals Quiz',
              description: 'Test your understanding',
              difficulty: 'easy',
              points: 10,
              timeLimit: 120,
              hints: ['Think about what API stands for'],
              exerciseData: {},
              solution: {},
              validation: {},
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ]

      mockPrisma.lesson.findMany = jest.fn().mockResolvedValue(mockLessons)

      const response = await GET()
      const data = await response.json()

      expect(mockPrisma.lesson.findMany).toHaveBeenCalledWith({
        orderBy: { orderIndex: 'asc' },
        include: {
          codeExamples: { orderBy: { orderIndex: 'asc' } },
          interactiveExercises: {
            include: {
              exerciseComponents: { orderBy: { orderIndex: 'asc' } },
            },
          },
        },
      })

      expect(response.status).toBe(200)
      expect(data).toEqual(mockLessons)
      expect(data[0].codeExamples).toHaveLength(1)
      expect(data[0].interactiveExercises).toHaveLength(1)
    })

    it('should handle database errors gracefully', async () => {
      mockPrisma.lesson.findMany = jest.fn().mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to fetch lessons' })
    })

    it('should return empty array when no lessons exist', async () => {
      mockPrisma.lesson.findMany = jest.fn().mockResolvedValue([])

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual([])
    })
  })

  describe('GET /api/lessons/[slug]', () => {
    it('should return a specific lesson by slug', async () => {
      const mockLesson = {
        id: 'intro-to-apis',
        title: 'What are APIs?',
        description: 'Learn the fundamentals of APIs',
        category: 'Introduction',
        level: 'beginner',
        duration: 15,
        content: '# What are APIs?',
        prerequisites: [],
        objectives: ['Understand what an API is'],
        tags: ['basics'],
        slug: 'introduction',
        orderIndex: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        codeExamples: [
          {
            id: 'basic-api-call',
            lessonId: 'intro-to-apis',
            language: 'javascript',
            title: 'Basic API Call',
            description: 'A simple fetch request',
            code: 'fetch("/api/users")',
            output: 'User data',
            editable: false,
            orderIndex: 0,
          },
        ],
        interactiveExercises: [],
      }

      mockPrisma.lesson.findUnique = jest.fn().mockResolvedValue(mockLesson)

      const mockParams = Promise.resolve({ slug: 'introduction' })
      const response = await GetBySlug(
        new Request('http://localhost:3000/api/lessons/introduction'),
        { params: mockParams }
      )
      const data = await response.json()

      expect(mockPrisma.lesson.findUnique).toHaveBeenCalledWith({
        where: { slug: 'introduction' },
        include: {
          codeExamples: { orderBy: { orderIndex: 'asc' } },
          interactiveExercises: {
            include: {
              exerciseComponents: { orderBy: { orderIndex: 'asc' } },
            },
          },
        },
      })

      expect(response.status).toBe(200)
      expect(data).toEqual(mockLesson)
      expect(data.slug).toBe('introduction')
      expect(data.codeExamples).toHaveLength(1)
    })

    it('should return 404 when lesson not found', async () => {
      mockPrisma.lesson.findUnique = jest.fn().mockResolvedValue(null)

      const mockParams = Promise.resolve({ slug: 'non-existent' })
      const response = await GetBySlug(
        new Request('http://localhost:3000/api/lessons/non-existent'),
        { params: mockParams }
      )
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data).toEqual({ error: 'Lesson not found' })
    })

    it('should handle database errors gracefully', async () => {
      mockPrisma.lesson.findUnique = jest.fn().mockRejectedValue(new Error('Database error'))

      const mockParams = Promise.resolve({ slug: 'introduction' })
      const response = await GetBySlug(
        new Request('http://localhost:3000/api/lessons/introduction'),
        { params: mockParams }
      )
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to fetch lesson' })
    })

    it('should include all related data in response', async () => {
      const mockLesson = {
        id: 'rest-fundamentals',
        title: 'REST API Principles',
        slug: 'rest-fundamentals',
        codeExamples: [
          {
            id: 'rest-example-1',
            title: 'GET Request',
            code: 'fetch("/api/users")',
            orderIndex: 0,
          },
          {
            id: 'rest-example-2',
            title: 'POST Request',
            code: 'fetch("/api/users", { method: "POST" })',
            orderIndex: 1,
          },
        ],
        interactiveExercises: [
          {
            id: 'rest-quiz',
            type: 'multiple_choice',
            title: 'REST Principles Quiz',
            exerciseComponents: [],
          },
        ],
      }

      mockPrisma.lesson.findUnique = jest.fn().mockResolvedValue(mockLesson)

      const mockParams = Promise.resolve({ slug: 'rest-fundamentals' })
      const response = await GetBySlug(
        new Request('http://localhost:3000/api/lessons/rest-fundamentals'),
        { params: mockParams }
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.codeExamples).toHaveLength(2)
      expect(data.interactiveExercises).toHaveLength(1)
      expect(data.codeExamples[0].orderIndex).toBe(0)
      expect(data.codeExamples[1].orderIndex).toBe(1)
    })
  })
})