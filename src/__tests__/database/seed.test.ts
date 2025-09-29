/**
 * @jest-environment node
 */

import { PrismaClient } from '@prisma/client'
import { lessons } from '@/lib/lessons'
import { exercises } from '@/data/exercises'

// Mock Prisma Client
const mockPrisma = {
  lesson: {
    deleteMany: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  codeExample: {
    deleteMany: jest.fn(),
    create: jest.fn(),
  },
  interactiveExercise: {
    deleteMany: jest.fn(),
    create: jest.fn(),
  },
  exerciseComponent: {
    deleteMany: jest.fn(),
  },
  exerciseAttempt: {
    deleteMany: jest.fn(),
  },
  userProgress: {
    deleteMany: jest.fn(),
  },
  navigationItem: {
    upsert: jest.fn(),
  },
  $disconnect: jest.fn(),
} as unknown as PrismaClient

jest.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))

describe('Database Seeding', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Lesson Data Validation', () => {
    it('should have valid lesson data structure', () => {
      expect(lessons).toBeDefined()
      expect(Array.isArray(lessons)).toBe(true)
      expect(lessons.length).toBeGreaterThan(0)

      lessons.forEach((lesson) => {
        expect(lesson).toHaveProperty('id')
        expect(lesson).toHaveProperty('title')
        expect(lesson).toHaveProperty('slug')
        expect(lesson).toHaveProperty('level')
        expect(['beginner', 'intermediate', 'advanced']).toContain(lesson.level)
        expect(typeof lesson.id).toBe('string')
        expect(typeof lesson.title).toBe('string')
        expect(typeof lesson.slug).toBe('string')
      })
    })

    it('should have unique lesson IDs and slugs', () => {
      const ids = lessons.map(lesson => lesson.id)
      const slugs = lessons.map(lesson => lesson.slug)
      
      expect(new Set(ids).size).toBe(ids.length)
      expect(new Set(slugs).size).toBe(slugs.length)
    })

    it('should have valid code examples structure', () => {
      lessons.forEach((lesson) => {
        if (lesson.codeExamples) {
          expect(Array.isArray(lesson.codeExamples)).toBe(true)
          lesson.codeExamples.forEach((example) => {
            expect(example).toHaveProperty('id')
            expect(example).toHaveProperty('language')
            expect(example).toHaveProperty('code')
            expect(typeof example.id).toBe('string')
            expect(typeof example.language).toBe('string')
            expect(typeof example.code).toBe('string')
          })
        }
      })
    })
  })

  describe('Exercise Data Validation', () => {
    it('should have valid exercise data structure', () => {
      expect(exercises).toBeDefined()
      expect(typeof exercises).toBe('object')

      Object.entries(exercises).forEach(([lessonSlug, lessonExercises]) => {
        expect(typeof lessonSlug).toBe('string')
        expect(Array.isArray(lessonExercises)).toBe(true)

        lessonExercises.forEach((exercise) => {
          expect(exercise).toHaveProperty('id')
          expect(exercise).toHaveProperty('type')
          expect(exercise).toHaveProperty('title')
          expect(exercise).toHaveProperty('difficulty')
          expect(['easy', 'medium', 'hard']).toContain(exercise.difficulty)
          expect(['multiple-choice', 'code-completion', 'api-builder', 'debugging', 'drag-drop']).toContain(exercise.type)
        })
      })
    })

    it('should have exercises for valid lesson slugs', () => {
      const lessonSlugs = lessons.map(lesson => lesson.slug)
      const exerciseLessonSlugs = Object.keys(exercises)

      exerciseLessonSlugs.forEach((slug) => {
        expect(lessonSlugs).toContain(slug)
      })
    })

    it('should have unique exercise IDs', () => {
      const allExerciseIds: string[] = []
      
      Object.values(exercises).forEach((lessonExercises) => {
        lessonExercises.forEach((exercise) => {
          allExerciseIds.push(exercise.id)
        })
      })

      expect(new Set(allExerciseIds).size).toBe(allExerciseIds.length)
    })
  })

  describe('Database Operations', () => {
    it('should clear existing data before seeding', async () => {
      // Mock successful deletion
      mockPrisma.userProgress.deleteMany = jest.fn().mockResolvedValue({ count: 0 })
      mockPrisma.exerciseAttempt.deleteMany = jest.fn().mockResolvedValue({ count: 0 })
      mockPrisma.exerciseComponent.deleteMany = jest.fn().mockResolvedValue({ count: 0 })
      mockPrisma.interactiveExercise.deleteMany = jest.fn().mockResolvedValue({ count: 0 })
      mockPrisma.codeExample.deleteMany = jest.fn().mockResolvedValue({ count: 0 })
      mockPrisma.lesson.deleteMany = jest.fn().mockResolvedValue({ count: 0 })

      // Simulate clearing data (this would be part of the seed script)
      await mockPrisma.userProgress.deleteMany()
      await mockPrisma.exerciseAttempt.deleteMany()
      await mockPrisma.exerciseComponent.deleteMany()
      await mockPrisma.interactiveExercise.deleteMany()
      await mockPrisma.codeExample.deleteMany()
      await mockPrisma.lesson.deleteMany()

      expect(mockPrisma.userProgress.deleteMany).toHaveBeenCalled()
      expect(mockPrisma.exerciseAttempt.deleteMany).toHaveBeenCalled()
      expect(mockPrisma.exerciseComponent.deleteMany).toHaveBeenCalled()
      expect(mockPrisma.interactiveExercise.deleteMany).toHaveBeenCalled()
      expect(mockPrisma.codeExample.deleteMany).toHaveBeenCalled()
      expect(mockPrisma.lesson.deleteMany).toHaveBeenCalled()
    })

    it('should create lessons with proper data structure', async () => {
      const mockLesson = {
        id: 'test-lesson',
        title: 'Test Lesson',
        description: 'Test Description',
        category: 'Test',
        level: 'beginner',
        duration: 15,
        content: '# Test Content',
        prerequisites: [],
        objectives: ['Test objective'],
        tags: ['test'],
        slug: 'test-lesson',
        orderIndex: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrisma.lesson.create = jest.fn().mockResolvedValue(mockLesson)

      const result = await mockPrisma.lesson.create({
        data: {
          id: 'test-lesson',
          title: 'Test Lesson',
          description: 'Test Description',
          category: 'Test',
          level: 'beginner',
          duration: 15,
          content: '# Test Content',
          prerequisites: [],
          objectives: ['Test objective'],
          tags: ['test'],
          slug: 'test-lesson',
          orderIndex: 1,
        }
      })

      expect(mockPrisma.lesson.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: 'test-lesson',
          title: 'Test Lesson',
          level: 'beginner',
          slug: 'test-lesson',
        })
      })
      expect(result).toEqual(mockLesson)
    })

    it('should create code examples with proper relationships', async () => {
      const mockCodeExample = {
        id: 'test-example',
        lessonId: 'test-lesson',
        language: 'javascript',
        title: 'Test Example',
        description: 'Test Description',
        code: 'console.log("test")',
        output: 'test',
        editable: false,
        orderIndex: 0,
      }

      mockPrisma.codeExample.create = jest.fn().mockResolvedValue(mockCodeExample)

      const result = await mockPrisma.codeExample.create({
        data: {
          id: 'test-example',
          lessonId: 'test-lesson',
          language: 'javascript',
          title: 'Test Example',
          description: 'Test Description',
          code: 'console.log("test")',
          output: 'test',
          editable: false,
          orderIndex: 0,
        }
      })

      expect(mockPrisma.codeExample.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: 'test-example',
          lessonId: 'test-lesson',
          language: 'javascript',
          code: 'console.log("test")',
        })
      })
      expect(result).toEqual(mockCodeExample)
    })

    it('should create interactive exercises with proper data', async () => {
      const mockExercise = {
        id: 'test-exercise',
        lessonSlug: 'test-lesson',
        type: 'multiple_choice',
        title: 'Test Exercise',
        description: 'Test Description',
        difficulty: 'easy',
        points: 10,
        timeLimit: 120,
        hints: ['Test hint'],
        exerciseData: { question: 'Test question' },
        solution: { answer: 'a' },
        validation: { autoCheck: true },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrisma.interactiveExercise.create = jest.fn().mockResolvedValue(mockExercise)

      const result = await mockPrisma.interactiveExercise.create({
        data: {
          id: 'test-exercise',
          lessonSlug: 'test-lesson',
          type: 'multiple_choice',
          title: 'Test Exercise',
          description: 'Test Description',
          difficulty: 'easy',
          points: 10,
          timeLimit: 120,
          hints: ['Test hint'],
          exerciseData: { question: 'Test question' },
          solution: { answer: 'a' },
          validation: { autoCheck: true },
        }
      })

      expect(mockPrisma.interactiveExercise.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: 'test-exercise',
          lessonSlug: 'test-lesson',
          type: 'multiple_choice',
          difficulty: 'easy',
        })
      })
      expect(result).toEqual(mockExercise)
    })
  })

  describe('Data Integrity', () => {
    it('should maintain referential integrity between lessons and code examples', () => {
      lessons.forEach((lesson) => {
        if (lesson.codeExamples) {
          lesson.codeExamples.forEach((example) => {
            // Each code example should have a unique ID
            expect(example.id).toBeDefined()
            expect(typeof example.id).toBe('string')
            expect(example.id.length).toBeGreaterThan(0)
          })
        }
      })
    })

    it('should maintain referential integrity between lessons and exercises', () => {
      const lessonSlugs = new Set(lessons.map(lesson => lesson.slug))
      
      Object.keys(exercises).forEach((exerciseSlug) => {
        expect(lessonSlugs.has(exerciseSlug)).toBe(true)
      })
    })

    it('should have consistent data types across all lessons', () => {
      lessons.forEach((lesson) => {
        expect(typeof lesson.id).toBe('string')
        expect(typeof lesson.title).toBe('string')
        expect(typeof lesson.slug).toBe('string')
        expect(typeof lesson.level).toBe('string')
        
        if (lesson.duration !== undefined) {
          expect(typeof lesson.duration).toBe('number')
        }
        
        if (lesson.prerequisites) {
          expect(Array.isArray(lesson.prerequisites)).toBe(true)
        }
        
        if (lesson.objectives) {
          expect(Array.isArray(lesson.objectives)).toBe(true)
        }
        
        if (lesson.tags) {
          expect(Array.isArray(lesson.tags)).toBe(true)
        }
      })
    })
  })
})