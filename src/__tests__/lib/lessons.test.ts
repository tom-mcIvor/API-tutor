import { getLessonBySlug, getLessonsByCategory, getTutorialBySlug, lessons, tutorials } from '@/lib/lessons'

describe('Lesson Utility Functions', () => {
  describe('getLessonBySlug', () => {
    it('should return lesson when slug exists', () => {
      const lesson = getLessonBySlug('introduction')
      
      expect(lesson).toBeDefined()
      expect(lesson?.id).toBe('intro-to-apis')
      expect(lesson?.title).toBe('What are APIs?')
      expect(lesson?.slug).toBe('introduction')
    })

    it('should return undefined when slug does not exist', () => {
      const lesson = getLessonBySlug('non-existent-slug')
      
      expect(lesson).toBeUndefined()
    })

    it('should be case sensitive', () => {
      const lesson = getLessonBySlug('INTRODUCTION')
      
      expect(lesson).toBeUndefined()
    })
  })

  describe('getLessonsByCategory', () => {
    it('should return lessons matching category', () => {
      const lessons = getLessonsByCategory('Introduction')
      
      expect(lessons).toHaveLength(1)
      expect(lessons[0].category).toBe('Introduction')
      expect(lessons[0].id).toBe('intro-to-apis')
    })

    it('should return empty array for non-existent category', () => {
      const lessons = getLessonsByCategory('NonExistent')
      
      expect(lessons).toHaveLength(0)
    })

    it('should be case insensitive', () => {
      const lessonsLower = getLessonsByCategory('introduction')
      const lessonsUpper = getLessonsByCategory('INTRODUCTION')
      const lessonsMixed = getLessonsByCategory('InTrOdUcTiOn')
      
      expect(lessonsLower).toHaveLength(1)
      expect(lessonsUpper).toHaveLength(1)
      expect(lessonsMixed).toHaveLength(1)
      expect(lessonsLower[0].id).toBe(lessonsUpper[0].id)
    })

    it('should return multiple lessons for same category', () => {
      // First, let's check what categories we have
      const restLessons = getLessonsByCategory('REST')
      expect(restLessons).toHaveLength(1)
      expect(restLessons[0].category).toBe('REST')
    })
  })

  describe('getTutorialBySlug', () => {
    it('should return tutorial when slug exists', () => {
      const tutorial = getTutorialBySlug('api-basics')
      
      expect(tutorial).toBeDefined()
      expect(tutorial?.id).toBe('api-basics')
      expect(tutorial?.title).toBe('API Fundamentals')
      expect(tutorial?.slug).toBe('api-basics')
    })

    it('should return undefined when slug does not exist', () => {
      const tutorial = getTutorialBySlug('non-existent-slug')
      
      expect(tutorial).toBeUndefined()
    })
  })

  describe('lessons data structure', () => {
    it('should have all lessons with required properties', () => {
      lessons.forEach(lesson => {
        expect(lesson).toHaveProperty('id')
        expect(lesson).toHaveProperty('title')
        expect(lesson).toHaveProperty('description')
        expect(lesson).toHaveProperty('category')
        expect(lesson).toHaveProperty('level')
        expect(lesson).toHaveProperty('duration')
        expect(lesson).toHaveProperty('content')
        expect(lesson).toHaveProperty('objectives')
        expect(lesson).toHaveProperty('tags')
        expect(lesson).toHaveProperty('slug')
        expect(lesson).toHaveProperty('order')
        
        expect(typeof lesson.id).toBe('string')
        expect(typeof lesson.title).toBe('string')
        expect(typeof lesson.description).toBe('string')
        expect(['beginner', 'intermediate', 'advanced']).toContain(lesson.level)
        expect(typeof lesson.duration).toBe('number')
        expect(lesson.duration).toBeGreaterThan(0)
        expect(Array.isArray(lesson.objectives)).toBe(true)
        expect(Array.isArray(lesson.tags)).toBe(true)
        expect(typeof lesson.slug).toBe('string')
        expect(typeof lesson.order).toBe('number')
      })
    })

    it('should have unique lesson IDs', () => {
      const ids = lessons.map(lesson => lesson.id)
      const uniqueIds = [...new Set(ids)]
      
      expect(ids).toHaveLength(uniqueIds.length)
    })

    it('should have unique lesson slugs', () => {
      const slugs = lessons.map(lesson => lesson.slug)
      const uniqueSlugs = [...new Set(slugs)]
      
      expect(slugs).toHaveLength(uniqueSlugs.length)
    })

    it('should have valid code examples structure', () => {
      lessons.forEach(lesson => {
        if (lesson.codeExamples) {
          lesson.codeExamples.forEach(example => {
            expect(example).toHaveProperty('id')
            expect(example).toHaveProperty('language')
            expect(example).toHaveProperty('code')
            expect(typeof example.id).toBe('string')
            expect(typeof example.language).toBe('string')
            expect(typeof example.code).toBe('string')
            
            if (example.title) {
              expect(typeof example.title).toBe('string')
            }
            if (example.description) {
              expect(typeof example.description).toBe('string')
            }
            if (example.output) {
              expect(typeof example.output).toBe('string')
            }
          })
        }
      })
    })

    it('should have valid prerequisites references', () => {
      const allLessonIds = lessons.map(lesson => lesson.id)
      
      lessons.forEach(lesson => {
        if (lesson.prerequisites) {
          lesson.prerequisites.forEach(prerequisiteId => {
            expect(allLessonIds).toContain(prerequisiteId)
          })
        }
      })
    })

    it('should be ordered correctly', () => {
      const orders = lessons.map(lesson => lesson.order)
      const sortedOrders = [...orders].sort((a, b) => a - b)
      
      expect(orders).toEqual(sortedOrders)
    })
  })

  describe('tutorials data structure', () => {
    it('should have all tutorials with required properties', () => {
      tutorials.forEach(tutorial => {
        expect(tutorial).toHaveProperty('id')
        expect(tutorial).toHaveProperty('title')
        expect(tutorial).toHaveProperty('description')
        expect(tutorial).toHaveProperty('lessons')
        expect(tutorial).toHaveProperty('estimatedTime')
        expect(tutorial).toHaveProperty('level')
        expect(tutorial).toHaveProperty('slug')
        expect(tutorial).toHaveProperty('tags')
        
        expect(typeof tutorial.id).toBe('string')
        expect(typeof tutorial.title).toBe('string')
        expect(typeof tutorial.description).toBe('string')
        expect(Array.isArray(tutorial.lessons)).toBe(true)
        expect(typeof tutorial.estimatedTime).toBe('number')
        expect(['beginner', 'intermediate', 'advanced']).toContain(tutorial.level)
        expect(typeof tutorial.slug).toBe('string')
        expect(Array.isArray(tutorial.tags)).toBe(true)
      })
    })

    it('should reference valid lesson IDs', () => {
      const allLessonIds = lessons.map(lesson => lesson.id)
      
      tutorials.forEach(tutorial => {
        tutorial.lessons.forEach(lessonId => {
          expect(allLessonIds).toContain(lessonId)
        })
      })
    })
  })
})