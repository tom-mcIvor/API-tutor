/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import { lessons } from '@/lib/lessons'
import { exercises } from '@/data/exercises'

// Mock fetch for API calls
global.fetch = jest.fn()

describe('Frontend API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Lesson Data Structure', () => {
    it('should have valid lesson data for frontend consumption', () => {
      expect(lessons).toBeDefined()
      expect(Array.isArray(lessons)).toBe(true)
      expect(lessons.length).toBeGreaterThan(0)

      lessons.forEach((lesson) => {
        // Required fields for frontend
        expect(lesson).toHaveProperty('id')
        expect(lesson).toHaveProperty('title')
        expect(lesson).toHaveProperty('slug')
        expect(lesson).toHaveProperty('level')
        expect(lesson).toHaveProperty('description')

        // Type validation
        expect(typeof lesson.id).toBe('string')
        expect(typeof lesson.title).toBe('string')
        expect(typeof lesson.slug).toBe('string')
        expect(typeof lesson.description).toBe('string')
        expect(['beginner', 'intermediate', 'advanced']).toContain(lesson.level)

        // Optional fields validation
        if (lesson.duration !== undefined) {
          expect(typeof lesson.duration).toBe('number')
          expect(lesson.duration).toBeGreaterThan(0)
        }

        if (lesson.codeExamples) {
          expect(Array.isArray(lesson.codeExamples)).toBe(true)
          lesson.codeExamples.forEach((example) => {
            expect(example).toHaveProperty('id')
            expect(example).toHaveProperty('language')
            expect(example).toHaveProperty('code')
            expect(typeof example.code).toBe('string')
            expect(example.code.length).toBeGreaterThan(0)
          })
        }

        if (lesson.objectives) {
          expect(Array.isArray(lesson.objectives)).toBe(true)
          lesson.objectives.forEach((objective) => {
            expect(typeof objective).toBe('string')
            expect(objective.length).toBeGreaterThan(0)
          })
        }

        if (lesson.tags) {
          expect(Array.isArray(lesson.tags)).toBe(true)
          lesson.tags.forEach((tag) => {
            expect(typeof tag).toBe('string')
            expect(tag.length).toBeGreaterThan(0)
          })
        }
      })
    })

    it('should have unique lesson identifiers', () => {
      const ids = lessons.map(lesson => lesson.id)
      const slugs = lessons.map(lesson => lesson.slug)
      
      // Check for unique IDs
      expect(new Set(ids).size).toBe(ids.length)
      
      // Check for unique slugs
      expect(new Set(slugs).size).toBe(slugs.length)
      
      // Validate slug format (URL-friendly)
      slugs.forEach((slug) => {
        expect(slug).toMatch(/^[a-z0-9-]+$/)
        expect(slug).not.toContain(' ')
        expect(slug).not.toContain('_')
      })
    })

    it('should have proper lesson ordering', () => {
      const orderedLessons = lessons.filter(lesson => lesson.order !== undefined)
      
      if (orderedLessons.length > 1) {
        for (let i = 1; i < orderedLessons.length; i++) {
          expect(orderedLessons[i].order).toBeGreaterThanOrEqual(orderedLessons[i - 1].order!)
        }
      }
    })
  })

  describe('Exercise Data Structure', () => {
    it('should have valid exercise data structure', () => {
      expect(exercises).toBeDefined()
      expect(typeof exercises).toBe('object')

      Object.entries(exercises).forEach(([lessonSlug, lessonExercises]) => {
        expect(typeof lessonSlug).toBe('string')
        expect(Array.isArray(lessonExercises)).toBe(true)

        lessonExercises.forEach((exercise) => {
          // Required fields
          expect(exercise).toHaveProperty('id')
          expect(exercise).toHaveProperty('type')
          expect(exercise).toHaveProperty('title')
          expect(exercise).toHaveProperty('difficulty')

          // Type validation
          expect(typeof exercise.id).toBe('string')
          expect(typeof exercise.type).toBe('string')
          expect(typeof exercise.title).toBe('string')
          expect(typeof exercise.difficulty).toBe('string')

          // Enum validation
          expect(['easy', 'medium', 'hard']).toContain(exercise.difficulty)
          expect(['multiple-choice', 'code-completion', 'api-builder', 'debugging', 'drag-drop']).toContain(exercise.type)

          // Optional fields
          if (exercise.points !== undefined) {
            expect(typeof exercise.points).toBe('number')
            expect(exercise.points).toBeGreaterThanOrEqual(0)
          }

          if (exercise.timeLimit !== undefined) {
            expect(typeof exercise.timeLimit).toBe('number')
            expect(exercise.timeLimit).toBeGreaterThan(0)
          }

          if (exercise.hints) {
            expect(Array.isArray(exercise.hints)).toBe(true)
            exercise.hints.forEach((hint) => {
              expect(typeof hint).toBe('string')
              expect(hint.length).toBeGreaterThan(0)
            })
          }
        })
      })
    })

    it('should have exercises linked to valid lessons', () => {
      const lessonSlugs = new Set(lessons.map(lesson => lesson.slug))
      const exerciseLessonSlugs = Object.keys(exercises)

      exerciseLessonSlugs.forEach((slug) => {
        expect(lessonSlugs.has(slug)).toBe(true)
      })
    })

    it('should have unique exercise IDs across all lessons', () => {
      const allExerciseIds: string[] = []
      
      Object.values(exercises).forEach((lessonExercises) => {
        lessonExercises.forEach((exercise) => {
          allExerciseIds.push(exercise.id)
        })
      })

      expect(new Set(allExerciseIds).size).toBe(allExerciseIds.length)
    })

    it('should have proper exercise type distribution', () => {
      const exerciseTypes: { [key: string]: number } = {}
      
      Object.values(exercises).forEach((lessonExercises) => {
        lessonExercises.forEach((exercise) => {
          exerciseTypes[exercise.type] = (exerciseTypes[exercise.type] || 0) + 1
        })
      })

      // Should have at least one of each major type
      expect(exerciseTypes['multiple-choice']).toBeGreaterThan(0)
      expect(exerciseTypes['code-completion']).toBeGreaterThan(0)
      
      // Total exercises should be reasonable
      const totalExercises = Object.values(exerciseTypes).reduce((sum, count) => sum + count, 0)
      expect(totalExercises).toBeGreaterThan(0)
      expect(totalExercises).toBeLessThan(50) // Reasonable upper bound
    })
  })

  describe('API Response Simulation', () => {
    it('should handle successful lesson API response', async () => {
      const mockLessons = [
        {
          id: 'test-lesson',
          title: 'Test Lesson',
          description: 'Test Description',
          category: 'Test',
          level: 'beginner',
          duration: 15,
          slug: 'test-lesson',
          codeExamples: [],
          interactiveExercises: [],
        },
      ]

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockLessons,
      })

      const response = await fetch('/api/lessons')
      const data = await response.json()

      expect(fetch).toHaveBeenCalledWith('/api/lessons')
      expect(data).toEqual(mockLessons)
      expect(data[0]).toHaveProperty('id')
      expect(data[0]).toHaveProperty('title')
      expect(data[0]).toHaveProperty('slug')
    })

    it('should handle lesson by slug API response', async () => {
      const mockLesson = {
        id: 'intro-to-apis',
        title: 'What are APIs?',
        description: 'Learn the fundamentals of APIs',
        slug: 'introduction',
        level: 'beginner',
        codeExamples: [
          {
            id: 'basic-api-call',
            language: 'javascript',
            title: 'Basic API Call',
            code: 'fetch("/api/users")',
          },
        ],
        interactiveExercises: [],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockLesson,
      })

      const response = await fetch('/api/lessons/introduction')
      const data = await response.json()

      expect(fetch).toHaveBeenCalledWith('/api/lessons/introduction')
      expect(data).toEqual(mockLesson)
      expect(data.codeExamples).toHaveLength(1)
      expect(data.codeExamples[0]).toHaveProperty('code')
    })

    it('should handle API error responses', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Lesson not found' }),
      })

      const response = await fetch('/api/lessons/non-existent')
      const data = await response.json()

      expect(response.ok).toBe(false)
      expect(response.status).toBe(404)
      expect(data).toEqual({ error: 'Lesson not found' })
    })

    it('should handle network errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(fetch('/api/lessons')).rejects.toThrow('Network error')
    })
  })

  describe('Data Consistency', () => {
    it('should maintain consistency between lesson slugs and exercise keys', () => {
      const lessonSlugs = new Set(lessons.map(lesson => lesson.slug))
      const exerciseKeys = new Set(Object.keys(exercises))

      // All exercise keys should correspond to valid lesson slugs
      exerciseKeys.forEach((key) => {
        expect(lessonSlugs.has(key)).toBe(true)
      })
    })

    it('should have consistent data types across all lessons', () => {
      lessons.forEach((lesson) => {
        // String fields
        expect(typeof lesson.id).toBe('string')
        expect(typeof lesson.title).toBe('string')
        expect(typeof lesson.slug).toBe('string')
        expect(typeof lesson.level).toBe('string')
        
        // Optional number fields
        if (lesson.duration !== undefined) {
          expect(typeof lesson.duration).toBe('number')
        }
        
        if (lesson.order !== undefined) {
          expect(typeof lesson.order).toBe('number')
        }
        
        // Array fields
        if (lesson.prerequisites) {
          expect(Array.isArray(lesson.prerequisites)).toBe(true)
        }
        
        if (lesson.objectives) {
          expect(Array.isArray(lesson.objectives)).toBe(true)
        }
        
        if (lesson.tags) {
          expect(Array.isArray(lesson.tags)).toBe(true)
        }
        
        if (lesson.codeExamples) {
          expect(Array.isArray(lesson.codeExamples)).toBe(true)
        }
      })
    })

    it('should have valid prerequisite references', () => {
      const lessonIds = new Set(lessons.map(lesson => lesson.id))
      
      lessons.forEach((lesson) => {
        if (lesson.prerequisites) {
          lesson.prerequisites.forEach((prereqId) => {
            expect(lessonIds.has(prereqId)).toBe(true)
          })
        }
      })
    })
  })
})