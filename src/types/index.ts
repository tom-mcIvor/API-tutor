export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  content: string; // markdown content
  codeExamples?: CodeExample[];
  prerequisites?: string[];
  objectives: string[];
  tags: string[];
  slug: string;
  order: number;
}

export interface CodeExample {
  id: string;
  language: string;
  title?: string;
  description?: string;
  code: string;
  output?: string;
  editable?: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  lessons: string[]; // lesson IDs
  estimatedTime: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  slug: string;
  thumbnail?: string;
  tags: string[];
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  currentLesson?: string;
  timeSpent: number;
  lastAccessed: Date;
  bookmarkedLessons: string[];
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  badge?: string | number;
}

export interface APIPlaygroundRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: string;
  description?: string;
}

export interface APIPlaygroundResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  responseTime: number;
}

export interface SearchResult {
  type: 'lesson' | 'tutorial' | 'code-example';
  id: string;
  title: string;
  description: string;
  url: string;
  relevanceScore: number;
  category?: string;
}