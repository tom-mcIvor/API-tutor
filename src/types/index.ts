export interface Lesson {
  id: string
  title: string
  description: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  content: string // markdown content
  codeExamples?: CodeExample[]
  exercises?: string[] // exercise IDs
  prerequisites?: string[]
  objectives: string[]
  tags: string[]
  slug: string
  order: number
}

export interface CodeExample {
  id: string
  language: string
  title?: string
  description?: string
  code: string
  output?: string
  editable?: boolean
}

export interface Tutorial {
  id: string
  title: string
  description: string
  lessons: string[] // lesson IDs
  estimatedTime: number
  level: 'beginner' | 'intermediate' | 'advanced'
  slug: string
  thumbnail?: string
  tags: string[]
}

export interface UserProgress {
  userId: string
  completedLessons: string[]
  currentLesson?: string
  timeSpent: number
  lastAccessed: Date
  bookmarkedLessons: string[]
}

export interface NavigationItem {
  id: string
  title: string
  href: string
  icon?: string
  children?: NavigationItem[]
  badge?: string | number
}

export interface APIPlaygroundRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers?: Record<string, string>
  body?: string
  description?: string
}

export interface APIPlaygroundResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  responseTime: number
}

export interface SearchResult {
  type: 'lesson' | 'tutorial' | 'code-example'
  id: string
  title: string
  description: string
  url: string
  relevanceScore: number
  category?: string
}

// Interactive Exercise Types
export interface InteractiveExercise {
  id: string
  type:
    | 'code-completion'
    | 'api-builder'
    | 'debugging'
    | 'multiple-choice'
    | 'drag-drop'
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  timeLimit?: number // in seconds
  hints?: string[]
  solution: ExerciseSolution
  validation: ExerciseValidation
}

export interface CodeCompletionExercise extends InteractiveExercise {
  type: 'code-completion'
  template: string // Code with blanks marked as {{blank1}}, {{blank2}}
  language: string
  blanks: CodeBlank[]
  expectedOutput?: string
}

export interface APIBuilderExercise extends InteractiveExercise {
  type: 'api-builder'
  scenario: string
  requirements: string[]
  startingCode?: string
  testCases: APITestCase[]
  allowedMethods: string[]
}

export interface DebuggingExercise extends InteractiveExercise {
  type: 'debugging'
  buggyCode: string
  language: string
  errorDescription: string
  expectedBehavior: string
  bugCount: number
}

export interface MultipleChoiceExercise extends InteractiveExercise {
  type: 'multiple-choice'
  question: string
  options: MultipleChoiceOption[]
  explanation: string
}

export interface DragDropExercise extends InteractiveExercise {
  type: 'drag-drop'
  instruction: string
  items: DragDropItem[]
  dropZones: DropZone[]
  correctMapping: Record<string, string> // itemId -> dropZoneId
}

// Supporting interfaces
export interface CodeBlank {
  id: string
  placeholder: string
  correctAnswers: string[]
  caseSensitive?: boolean
  hint?: string
}

export interface APITestCase {
  id: string
  method: string
  endpoint: string
  requestBody?: any
  expectedStatus: number
  expectedResponse?: any
  description: string
}

export interface MultipleChoiceOption {
  id: string
  text: string
  isCorrect: boolean
  explanation?: string
}

export interface DragDropItem {
  id: string
  content: string
  category?: string
}

export interface DropZone {
  id: string
  label: string
  acceptsCategory?: string
  maxItems?: number
}

export interface ExerciseSolution {
  type: string
  data: any
  explanation: string
  codeExample?: string
}

export interface ExerciseValidation {
  autoCheck: boolean
  customValidator?: string // Function name for custom validation
  feedback: {
    correct: string
    incorrect: string
    partial?: string
  }
}

export interface ExerciseAttempt {
  exerciseId: string
  userId: string
  answer: any
  isCorrect: boolean
  score: number
  timeSpent: number
  hintsUsed: number
  timestamp: Date
}

export interface ExerciseProgress {
  exerciseId: string
  attempts: number
  bestScore: number
  completed: boolean
  lastAttempt: Date
}
