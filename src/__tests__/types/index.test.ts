import {
  Lesson,
  CodeExample,
  Tutorial,
  UserProgress,
  NavigationItem,
  APIPlaygroundRequest,
  APIPlaygroundResponse,
  SearchResult
} from '@/types'

// These tests validate TypeScript types at compile time
// If the code compiles, the types are correct

describe('Type Definitions', () => {
  describe('Lesson interface', () => {
    it('should accept valid lesson objects', () => {
      const lesson: Lesson = {
        id: 'test-lesson',
        title: 'Test Lesson',
        description: 'A test lesson description',
        category: 'Testing',
        level: 'beginner',
        duration: 30,
        content: '# Test Content',
        objectives: ['Learn testing', 'Understand types'],
        tags: ['test', 'typescript'],
        slug: 'test-lesson',
        order: 1
      }

      expect(lesson.id).toBe('test-lesson')
      expect(lesson.level).toBe('beginner')
      expect(lesson.duration).toBe(30)
      expect(Array.isArray(lesson.objectives)).toBe(true)
      expect(Array.isArray(lesson.tags)).toBe(true)
    })

    it('should accept lesson with optional properties', () => {
      const lessonWithOptionals: Lesson = {
        id: 'test-lesson-2',
        title: 'Test Lesson 2',
        description: 'Another test lesson',
        category: 'Testing',
        level: 'intermediate',
        duration: 45,
        content: '# More Test Content',
        objectives: ['Advanced testing'],
        tags: ['advanced'],
        slug: 'test-lesson-2',
        order: 2,
        codeExamples: [{
          id: 'example-1',
          language: 'typescript',
          code: 'const test = "example";'
        }],
        prerequisites: ['test-lesson']
      }

      expect(lessonWithOptionals.codeExamples).toHaveLength(1)
      expect(lessonWithOptionals.prerequisites).toContain('test-lesson')
    })

    it('should enforce level enum values', () => {
      const beginnerLesson: Lesson = {
        id: 'beginner-lesson',
        title: 'Beginner Lesson',
        description: 'For beginners',
        category: 'Basics',
        level: 'beginner' as const,
        duration: 15,
        content: '# Beginner Content',
        objectives: ['Learn basics'],
        tags: ['beginner'],
        slug: 'beginner-lesson',
        order: 1
      }

      const intermediateLesson: Lesson = {
        ...beginnerLesson,
        id: 'intermediate-lesson',
        level: 'intermediate' as const
      }

      const advancedLesson: Lesson = {
        ...beginnerLesson,
        id: 'advanced-lesson',
        level: 'advanced' as const
      }

      expect(beginnerLesson.level).toBe('beginner')
      expect(intermediateLesson.level).toBe('intermediate')
      expect(advancedLesson.level).toBe('advanced')
    })
  })

  describe('CodeExample interface', () => {
    it('should accept minimal code example', () => {
      const example: CodeExample = {
        id: 'simple-example',
        language: 'javascript',
        code: 'console.log("Hello");'
      }

      expect(example.id).toBe('simple-example')
      expect(example.language).toBe('javascript')
      expect(typeof example.code).toBe('string')
    })

    it('should accept code example with all optional properties', () => {
      const fullExample: CodeExample = {
        id: 'full-example',
        language: 'typescript',
        title: 'Full Example',
        description: 'Complete example with all properties',
        code: 'const message: string = "Hello, TypeScript!";',
        output: 'Hello, TypeScript!',
        editable: true
      }

      expect(fullExample.title).toBe('Full Example')
      expect(fullExample.description).toBeTruthy()
      expect(fullExample.output).toBe('Hello, TypeScript!')
      expect(fullExample.editable).toBe(true)
    })
  })

  describe('Tutorial interface', () => {
    it('should accept valid tutorial object', () => {
      const tutorial: Tutorial = {
        id: 'test-tutorial',
        title: 'Test Tutorial',
        description: 'A tutorial for testing',
        lessons: ['lesson-1', 'lesson-2'],
        estimatedTime: 90,
        level: 'beginner',
        slug: 'test-tutorial',
        tags: ['test', 'tutorial']
      }

      expect(tutorial.lessons).toHaveLength(2)
      expect(tutorial.estimatedTime).toBe(90)
      expect(Array.isArray(tutorial.lessons)).toBe(true)
      expect(Array.isArray(tutorial.tags)).toBe(true)
    })

    it('should accept tutorial with thumbnail', () => {
      const tutorialWithThumbnail: Tutorial = {
        id: 'tutorial-with-image',
        title: 'Tutorial with Image',
        description: 'Has a thumbnail',
        lessons: ['lesson-1'],
        estimatedTime: 30,
        level: 'intermediate',
        slug: 'tutorial-with-image',
        tags: ['visual'],
        thumbnail: '/images/tutorial-thumb.jpg'
      }

      expect(tutorialWithThumbnail.thumbnail).toBe('/images/tutorial-thumb.jpg')
    })
  })

  describe('UserProgress interface', () => {
    it('should accept valid user progress object', () => {
      const progress: UserProgress = {
        userId: 'user-123',
        completedLessons: ['lesson-1', 'lesson-2'],
        timeSpent: 3600,
        lastAccessed: new Date('2023-01-01'),
        bookmarkedLessons: ['lesson-3']
      }

      expect(progress.userId).toBe('user-123')
      expect(progress.completedLessons).toHaveLength(2)
      expect(progress.timeSpent).toBe(3600)
      expect(progress.lastAccessed).toBeInstanceOf(Date)
      expect(Array.isArray(progress.bookmarkedLessons)).toBe(true)
    })

    it('should accept user progress with current lesson', () => {
      const progressWithCurrent: UserProgress = {
        userId: 'user-456',
        completedLessons: [],
        timeSpent: 0,
        lastAccessed: new Date(),
        bookmarkedLessons: [],
        currentLesson: 'intro-lesson'
      }

      expect(progressWithCurrent.currentLesson).toBe('intro-lesson')
    })
  })

  describe('NavigationItem interface', () => {
    it('should accept simple navigation item', () => {
      const navItem: NavigationItem = {
        id: 'nav-1',
        title: 'Home',
        href: '/'
      }

      expect(navItem.id).toBe('nav-1')
      expect(navItem.title).toBe('Home')
      expect(navItem.href).toBe('/')
    })

    it('should accept navigation item with all optional properties', () => {
      const fullNavItem: NavigationItem = {
        id: 'nav-2',
        title: 'Lessons',
        href: '/lessons',
        icon: 'book',
        badge: 5,
        children: [
          {
            id: 'nav-2-1',
            title: 'Beginner',
            href: '/lessons/beginner'
          }
        ]
      }

      expect(fullNavItem.icon).toBe('book')
      expect(fullNavItem.badge).toBe(5)
      expect(fullNavItem.children).toHaveLength(1)
      expect(fullNavItem.children![0].title).toBe('Beginner')
    })

    it('should accept badge as string or number', () => {
      const stringBadge: NavigationItem = {
        id: 'nav-string',
        title: 'New',
        href: '/new',
        badge: 'NEW'
      }

      const numberBadge: NavigationItem = {
        id: 'nav-number',
        title: 'Notifications',
        href: '/notifications',
        badge: 3
      }

      expect(typeof stringBadge.badge).toBe('string')
      expect(typeof numberBadge.badge).toBe('number')
    })
  })

  describe('APIPlaygroundRequest interface', () => {
    it('should accept minimal request object', () => {
      const request: APIPlaygroundRequest = {
        method: 'GET',
        url: 'https://api.example.com/users'
      }

      expect(request.method).toBe('GET')
      expect(request.url).toBe('https://api.example.com/users')
    })

    it('should accept request with all optional properties', () => {
      const fullRequest: APIPlaygroundRequest = {
        method: 'POST',
        url: 'https://api.example.com/users',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        },
        body: JSON.stringify({ name: 'John Doe' }),
        description: 'Create a new user'
      }

      expect(fullRequest.headers).toHaveProperty('Content-Type')
      expect(fullRequest.headers).toHaveProperty('Authorization')
      expect(fullRequest.body).toContain('John Doe')
      expect(fullRequest.description).toBe('Create a new user')
    })

    it('should enforce HTTP method enum', () => {
      const methods: APIPlaygroundRequest['method'][] = [
        'GET', 'POST', 'PUT', 'DELETE', 'PATCH'
      ]

      methods.forEach(method => {
        const request: APIPlaygroundRequest = {
          method,
          url: 'https://api.example.com/test'
        }
        expect(request.method).toBe(method)
      })
    })
  })

  describe('APIPlaygroundResponse interface', () => {
    it('should accept valid response object', () => {
      const response: APIPlaygroundResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { message: 'Success' },
        responseTime: 150
      }

      expect(response.status).toBe(200)
      expect(response.statusText).toBe('OK')
      expect(response.headers).toHaveProperty('Content-Type')
      expect(response.data).toHaveProperty('message')
      expect(response.responseTime).toBe(150)
    })
  })

  describe('SearchResult interface', () => {
    it('should accept search result with required properties', () => {
      const result: SearchResult = {
        type: 'lesson',
        id: 'lesson-123',
        title: 'Test Lesson',
        description: 'A lesson about testing',
        url: '/lessons/test-lesson',
        relevanceScore: 0.95
      }

      expect(result.type).toBe('lesson')
      expect(result.relevanceScore).toBe(0.95)
    })

    it('should accept search result with category', () => {
      const resultWithCategory: SearchResult = {
        type: 'tutorial',
        id: 'tutorial-456',
        title: 'Advanced Tutorial',
        description: 'An advanced tutorial',
        url: '/tutorials/advanced',
        relevanceScore: 0.87,
        category: 'Advanced'
      }

      expect(resultWithCategory.category).toBe('Advanced')
    })

    it('should enforce search result type enum', () => {
      const types: SearchResult['type'][] = ['lesson', 'tutorial', 'code-example']

      types.forEach(type => {
        const result: SearchResult = {
          type,
          id: `${type}-test`,
          title: `Test ${type}`,
          description: `A test ${type}`,
          url: `/test-${type}`,
          relevanceScore: 1.0
        }
        expect(result.type).toBe(type)
      })
    })
  })

  describe('Type safety validation', () => {
    it('should ensure required properties are enforced', () => {
      // This test validates that TypeScript will catch missing required properties
      // The actual validation happens at compile time
      
      const hasRequiredProperties = (obj: any): boolean => {
        return !!(obj.id && obj.title && obj.description && 
               obj.category && obj.level && obj.duration &&
               obj.content && obj.objectives && obj.tags && 
               obj.slug && typeof obj.order === 'number')
      }

      const validLesson = {
        id: 'test',
        title: 'Test',
        description: 'Test desc',
        category: 'Test Cat',
        level: 'beginner' as const,
        duration: 30,
        content: 'Content',
        objectives: ['obj1'],
        tags: ['tag1'],
        slug: 'test',
        order: 1
      }

      const invalidLesson = {
        id: 'test',
        title: 'Test'
        // Missing other required properties
      }

      expect(hasRequiredProperties(validLesson)).toBe(true)
      expect(hasRequiredProperties(invalidLesson)).toBe(false)
    })
  })
})