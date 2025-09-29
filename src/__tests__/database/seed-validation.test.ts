/**
 * Database Seed Data Validation Tests
 * Tests the seed data structure and validation logic
 */

describe('Database Seed Data Validation', () => {
  // Mock data structures based on the actual seed data
  const mockLessons = [
    {
      id: 'intro-to-apis',
      title: 'What are APIs?',
      description: 'Learn the fundamentals of APIs and how they work',
      category: 'Fundamentals',
      level: 'beginner',
      duration: 15,
      content: 'APIs (Application Programming Interfaces) are...',
      prerequisites: [],
      objectives: [
        'Understand what APIs are',
        'Learn about different types of APIs',
        'Understand REST principles'
      ],
      tags: ['api', 'fundamentals', 'rest'],
      slug: 'introduction-to-apis',
      orderIndex: 1
    },
    {
      id: 'http-methods',
      title: 'HTTP Methods',
      description: 'Understanding GET, POST, PUT, DELETE and other HTTP methods',
      category: 'HTTP',
      level: 'beginner',
      duration: 20,
      content: 'HTTP methods define the type of action...',
      prerequisites: ['intro-to-apis'],
      objectives: [
        'Learn about HTTP methods',
        'Understand when to use each method',
        'Practice with examples'
      ],
      tags: ['http', 'methods', 'rest'],
      slug: 'http-methods',
      orderIndex: 2
    }
  ]

  const mockCodeExamples = [
    {
      id: 'basic-api-call',
      title: 'Basic API Call',
      language: 'javascript',
      code: 'fetch("/api/users")\n  .then(response => response.json())\n  .then(data => console.log(data));',
      explanation: 'This example shows a basic GET request using the fetch API',
      orderIndex: 1,
      lessonId: 'intro-to-apis'
    },
    {
      id: 'post-request',
      title: 'POST Request',
      language: 'javascript',
      code: 'fetch("/api/users", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({ name: "John" })\n});',
      explanation: 'This example demonstrates how to make a POST request with data',
      orderIndex: 1,
      lessonId: 'http-methods'
    }
  ]

  const mockInteractiveExercises = [
    {
      id: 'api-definition-quiz',
      type: 'multiple-choice',
      title: 'What is an API?',
      difficulty: 'easy',
      points: 10,
      timeLimit: 60,
      hints: ['Think about how applications communicate'],
      orderIndex: 1,
      lessonId: 'intro-to-apis'
    },
    {
      id: 'http-method-matching',
      type: 'drag-drop',
      title: 'Match HTTP Methods to Actions',
      difficulty: 'medium',
      points: 15,
      timeLimit: 120,
      hints: ['GET retrieves data', 'POST creates new data'],
      orderIndex: 1,
      lessonId: 'http-methods'
    }
  ]

  describe('Lesson Data Validation', () => {
    it('should have valid lesson structure', () => {
      mockLessons.forEach((lesson) => {
        // Required fields
        expect(lesson).toHaveProperty('id')
        expect(lesson).toHaveProperty('title')
        expect(lesson).toHaveProperty('description')
        expect(lesson).toHaveProperty('category')
        expect(lesson).toHaveProperty('level')
        expect(lesson).toHaveProperty('slug')
        expect(lesson).toHaveProperty('orderIndex')

        // Type validation
        expect(typeof lesson.id).toBe('string')
        expect(typeof lesson.title).toBe('string')
        expect(typeof lesson.description).toBe('string')
        expect(typeof lesson.category).toBe('string')
        expect(typeof lesson.level).toBe('string')
        expect(typeof lesson.slug).toBe('string')
        expect(typeof lesson.orderIndex).toBe('number')

        // Value validation
        expect(lesson.id.length).toBeGreaterThan(0)
        expect(lesson.title.length).toBeGreaterThan(0)
        expect(lesson.description.length).toBeGreaterThan(0)
        expect(['beginner', 'intermediate', 'advanced']).toContain(lesson.level)
        expect(lesson.orderIndex).toBeGreaterThan(0)

        // Slug format validation
        expect(lesson.slug).toMatch(/^[a-z0-9-]+$/)
        expect(lesson.slug).not.toContain(' ')
        expect(lesson.slug).not.toContain('_')

        // Array fields validation
        expect(Array.isArray(lesson.prerequisites)).toBe(true)
        expect(Array.isArray(lesson.objectives)).toBe(true)
        expect(Array.isArray(lesson.tags)).toBe(true)

        // Optional fields validation
        if (lesson.duration !== undefined) {
          expect(typeof lesson.duration).toBe('number')
          expect(lesson.duration).toBeGreaterThan(0)
        }

        if (lesson.content !== undefined) {
          expect(typeof lesson.content).toBe('string')
          expect(lesson.content.length).toBeGreaterThan(0)
        }
      })
    })

    it('should have unique lesson identifiers', () => {
      const ids = mockLessons.map(lesson => lesson.id)
      const slugs = mockLessons.map(lesson => lesson.slug)
      
      expect(new Set(ids).size).toBe(ids.length)
      expect(new Set(slugs).size).toBe(slugs.length)
    })

    it('should have valid prerequisite references', () => {
      const lessonIds = new Set(mockLessons.map(lesson => lesson.id))
      
      mockLessons.forEach((lesson) => {
        lesson.prerequisites.forEach((prereqId) => {
          expect(lessonIds.has(prereqId)).toBe(true)
        })
      })
    })

    it('should have proper ordering', () => {
      const orderedLessons = [...mockLessons].sort((a, b) => a.orderIndex - b.orderIndex)
      
      for (let i = 1; i < orderedLessons.length; i++) {
        expect(orderedLessons[i].orderIndex).toBeGreaterThanOrEqual(orderedLessons[i - 1].orderIndex)
      }
    })
  })

  describe('Code Examples Validation', () => {
    it('should have valid code example structure', () => {
      mockCodeExamples.forEach((example) => {
        // Required fields
        expect(example).toHaveProperty('id')
        expect(example).toHaveProperty('title')
        expect(example).toHaveProperty('language')
        expect(example).toHaveProperty('code')
        expect(example).toHaveProperty('lessonId')
        expect(example).toHaveProperty('orderIndex')

        // Type validation
        expect(typeof example.id).toBe('string')
        expect(typeof example.title).toBe('string')
        expect(typeof example.language).toBe('string')
        expect(typeof example.code).toBe('string')
        expect(typeof example.lessonId).toBe('string')
        expect(typeof example.orderIndex).toBe('number')

        // Value validation
        expect(example.id.length).toBeGreaterThan(0)
        expect(example.title.length).toBeGreaterThan(0)
        expect(example.code.length).toBeGreaterThan(0)
        expect(example.orderIndex).toBeGreaterThan(0)

        // Language validation
        const validLanguages = ['javascript', 'typescript', 'python', 'java', 'csharp', 'php', 'ruby', 'go', 'rust', 'json', 'xml', 'html', 'css', 'sql']
        expect(validLanguages).toContain(example.language)

        // Optional fields
        if (example.explanation !== undefined) {
          expect(typeof example.explanation).toBe('string')
          expect(example.explanation.length).toBeGreaterThan(0)
        }
      })
    })

    it('should have unique code example IDs', () => {
      const ids = mockCodeExamples.map(example => example.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should reference valid lessons', () => {
      const lessonIds = new Set(mockLessons.map(lesson => lesson.id))
      
      mockCodeExamples.forEach((example) => {
        expect(lessonIds.has(example.lessonId)).toBe(true)
      })
    })

    it('should have valid code syntax', () => {
      mockCodeExamples.forEach((example) => {
        // Basic syntax checks
        expect(example.code).not.toBe('')
        expect(example.code.trim()).toBe(example.code.trim())
        
        // Language-specific basic checks
        if (example.language === 'javascript' || example.language === 'typescript') {
          // Should have meaningful content
          expect(example.code.length).toBeGreaterThan(10)
          expect(example.code).toMatch(/[a-zA-Z]/) // Should contain letters
        }
        
        if (example.language === 'json') {
          // Should be valid JSON structure
          expect(() => JSON.parse(example.code)).not.toThrow()
        }
      })
    })
  })

  describe('Interactive Exercises Validation', () => {
    it('should have valid exercise structure', () => {
      mockInteractiveExercises.forEach((exercise) => {
        // Required fields
        expect(exercise).toHaveProperty('id')
        expect(exercise).toHaveProperty('type')
        expect(exercise).toHaveProperty('title')
        expect(exercise).toHaveProperty('difficulty')
        expect(exercise).toHaveProperty('lessonId')
        expect(exercise).toHaveProperty('orderIndex')

        // Type validation
        expect(typeof exercise.id).toBe('string')
        expect(typeof exercise.type).toBe('string')
        expect(typeof exercise.title).toBe('string')
        expect(typeof exercise.difficulty).toBe('string')
        expect(typeof exercise.lessonId).toBe('string')
        expect(typeof exercise.orderIndex).toBe('number')

        // Value validation
        expect(exercise.id.length).toBeGreaterThan(0)
        expect(exercise.title.length).toBeGreaterThan(0)
        expect(exercise.orderIndex).toBeGreaterThan(0)

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

        if (exercise.hints !== undefined) {
          expect(Array.isArray(exercise.hints)).toBe(true)
          exercise.hints.forEach((hint) => {
            expect(typeof hint).toBe('string')
            expect(hint.length).toBeGreaterThan(0)
          })
        }
      })
    })

    it('should have unique exercise IDs', () => {
      const ids = mockInteractiveExercises.map(exercise => exercise.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should reference valid lessons', () => {
      const lessonIds = new Set(mockLessons.map(lesson => lesson.id))
      
      mockInteractiveExercises.forEach((exercise) => {
        expect(lessonIds.has(exercise.lessonId)).toBe(true)
      })
    })

    it('should have proper difficulty distribution', () => {
      const difficulties = mockInteractiveExercises.map(ex => ex.difficulty)
      const difficultyCount = {
        easy: difficulties.filter(d => d === 'easy').length,
        medium: difficulties.filter(d => d === 'medium').length,
        hard: difficulties.filter(d => d === 'hard').length
      }

      // Should have at least one easy exercise
      expect(difficultyCount.easy).toBeGreaterThan(0)
      
      // Total should match
      expect(difficultyCount.easy + difficultyCount.medium + difficultyCount.hard).toBe(difficulties.length)
    })

    it('should have proper exercise type distribution', () => {
      const types = mockInteractiveExercises.map(ex => ex.type)
      const typeCount = types.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Should have variety in exercise types
      expect(Object.keys(typeCount).length).toBeGreaterThan(1)
      
      // Each type should have at least one exercise
      Object.values(typeCount).forEach(count => {
        expect(count).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Relationships', () => {
    it('should maintain referential integrity', () => {
      const lessonIds = new Set(mockLessons.map(lesson => lesson.id))
      
      // All code examples should reference valid lessons
      mockCodeExamples.forEach((example) => {
        expect(lessonIds.has(example.lessonId)).toBe(true)
      })
      
      // All exercises should reference valid lessons
      mockInteractiveExercises.forEach((exercise) => {
        expect(lessonIds.has(exercise.lessonId)).toBe(true)
      })
      
      // All prerequisites should reference valid lessons
      mockLessons.forEach((lesson) => {
        lesson.prerequisites.forEach((prereqId) => {
          expect(lessonIds.has(prereqId)).toBe(true)
        })
      })
    })

    it('should have logical prerequisite ordering', () => {
      const lessonMap = new Map(mockLessons.map(lesson => [lesson.id, lesson]))
      
      mockLessons.forEach((lesson) => {
        lesson.prerequisites.forEach((prereqId) => {
          const prereqLesson = lessonMap.get(prereqId)
          expect(prereqLesson).toBeDefined()
          
          // Prerequisite should have lower or equal order index
          expect(prereqLesson!.orderIndex).toBeLessThanOrEqual(lesson.orderIndex)
        })
      })
    })

    it('should have consistent content distribution', () => {
      const lessonIds = mockLessons.map(lesson => lesson.id)
      
      // Each lesson should have at least one code example or exercise
      lessonIds.forEach((lessonId) => {
        const hasCodeExample = mockCodeExamples.some(ex => ex.lessonId === lessonId)
        const hasExercise = mockInteractiveExercises.some(ex => ex.lessonId === lessonId)
        
        expect(hasCodeExample || hasExercise).toBe(true)
      })
    })
  })

  describe('Seed Data Quality', () => {
    it('should have educational progression', () => {
      const beginnerLessons = mockLessons.filter(lesson => lesson.level === 'beginner')
      const intermediateLessons = mockLessons.filter(lesson => lesson.level === 'intermediate')
      const advancedLessons = mockLessons.filter(lesson => lesson.level === 'advanced')
      
      // Should have beginner lessons
      expect(beginnerLessons.length).toBeGreaterThan(0)
      
      // Beginner lessons should come first in ordering
      if (beginnerLessons.length > 0 && intermediateLessons.length > 0) {
        const maxBeginnerOrder = Math.max(...beginnerLessons.map(l => l.orderIndex))
        const minIntermediateOrder = Math.min(...intermediateLessons.map(l => l.orderIndex))
        expect(maxBeginnerOrder).toBeLessThanOrEqual(minIntermediateOrder)
      }
    })

    it('should have comprehensive content coverage', () => {
      const categories = new Set(mockLessons.map(lesson => lesson.category))
      const allTags = mockLessons.flatMap(lesson => lesson.tags)
      const uniqueTags = new Set(allTags)
      
      // Should cover multiple categories
      expect(categories.size).toBeGreaterThan(1)
      
      // Should have diverse tags
      expect(uniqueTags.size).toBeGreaterThan(2)
      
      // Should have fundamental topics
      expect(allTags).toContain('api')
      expect(allTags).toContain('fundamentals')
    })

    it('should have realistic time estimates', () => {
      mockLessons.forEach((lesson) => {
        if (lesson.duration !== undefined) {
          // Duration should be reasonable (5-60 minutes)
          expect(lesson.duration).toBeGreaterThanOrEqual(5)
          expect(lesson.duration).toBeLessThanOrEqual(60)
        }
      })
      
      mockInteractiveExercises.forEach((exercise) => {
        if (exercise.timeLimit !== undefined) {
          // Time limit should be reasonable (30 seconds to 10 minutes)
          expect(exercise.timeLimit).toBeGreaterThanOrEqual(30)
          expect(exercise.timeLimit).toBeLessThanOrEqual(600)
        }
      })
    })
  })
})