import { Lesson, Tutorial } from '@/types'

// Sample lesson data - in a real app this would come from a database or CMS
export const lessons: Lesson[] = [
  {
    id: 'intro-to-apis',
    title: 'What are APIs?',
    description: 'Learn the fundamentals of APIs and why they\'re essential in modern web development.',
    category: 'Introduction',
    level: 'beginner',
    duration: 15,
    content: `# What are APIs?

An **API (Application Programming Interface)** is a set of rules and protocols that allows different software applications to communicate with each other. Think of it as a waiter in a restaurant - it takes your order (request) to the kitchen (server) and brings back your food (response).

## Key Concepts

### 1. Request and Response
- **Request**: What you ask for from the API
- **Response**: What the API sends back to you

### 2. Endpoints
An endpoint is a specific URL where an API can be accessed. For example:
\`\`\`
https://api.example.com/users
https://api.example.com/posts
\`\`\`

### 3. HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

## Why Use APIs?

1. **Separation of Concerns**: Frontend and backend can be developed independently
2. **Reusability**: One API can serve multiple applications
3. **Scalability**: Easy to scale different parts of your system
4. **Integration**: Connect with third-party services

## Real-World Examples

- Weather apps use weather APIs to get current conditions
- Social media apps use APIs to post updates
- E-commerce sites use payment APIs to process transactions
- Maps applications use location APIs to show directions

## Next Steps

Now that you understand what APIs are, let's explore REST principles and how they make APIs predictable and easy to use.`,
    codeExamples: [
      {
        id: 'basic-api-call',
        language: 'javascript',
        title: 'Basic API Call Example',
        description: 'A simple fetch request to get data from an API',
        code: `// Making a GET request to fetch user data
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(user => {
    console.log('User data:', user);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
  })
  .catch(error => {
    console.error('Error fetching user:', error);
  });`,
        output: `User data: {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  ...
}`
      }
    ],
    objectives: [
      'Understand what an API is and its purpose',
      'Learn about requests and responses',
      'Identify different types of API endpoints',
      'Recognize common HTTP methods'
    ],
    tags: ['basics', 'introduction', 'fundamentals'],
    slug: 'introduction',
    order: 1
  },
  {
    id: 'rest-fundamentals',
    title: 'REST API Principles',
    description: 'Master RESTful architecture and design principles for building robust APIs.',
    category: 'REST',
    level: 'beginner',
    duration: 25,
    content: `# REST API Principles

**REST (Representational State Transfer)** is an architectural style that defines how web services should work. RESTful APIs follow specific principles that make them predictable and easy to use.

## The 6 REST Principles

### 1. Stateless
Each request must contain all the information needed to understand it. The server doesn't store any client context between requests.

### 2. Client-Server Architecture
Clear separation between client (frontend) and server (backend) responsibilities.

### 3. Cacheable
Responses should indicate whether they can be cached to improve performance.

### 4. Uniform Interface
Consistent naming conventions and resource identification.

### 5. Layered System
Architecture can have multiple layers (proxy servers, gateways, etc.).

### 6. Code on Demand (Optional)
Server can extend client functionality by sending executable code.

## Resource-Based URLs

REST APIs organize data around resources, identified by URLs:

\`\`\`
GET    /api/users          # Get all users
GET    /api/users/123      # Get user with ID 123
POST   /api/users          # Create a new user
PUT    /api/users/123      # Update user 123
DELETE /api/users/123      # Delete user 123
\`\`\`

## HTTP Status Codes

RESTful APIs use standard HTTP status codes:

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server error

## Best Practices

1. Use nouns for resource names (not verbs)
2. Use HTTP methods to indicate actions
3. Return consistent JSON responses
4. Include proper error messages
5. Version your APIs (/api/v1/users)`,
    codeExamples: [
      {
        id: 'rest-examples',
        language: 'javascript',
        title: 'RESTful API Operations',
        description: 'Examples of different REST operations',
        code: `// GET - Retrieve all users
fetch('/api/users')
  .then(res => res.json())
  .then(users => console.log(users));

// POST - Create a new user
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
.then(res => res.json())
.then(user => console.log('Created user:', user));

// PUT - Update a user
fetch('/api/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Smith',
    email: 'johnsmith@example.com'
  })
})
.then(res => res.json())
.then(user => console.log('Updated user:', user));

// DELETE - Remove a user
fetch('/api/users/123', {
  method: 'DELETE'
})
.then(res => {
  if (res.ok) {
    console.log('User deleted successfully');
  }
});`
      }
    ],
    prerequisites: ['intro-to-apis'],
    objectives: [
      'Understand REST architectural principles',
      'Learn resource-based URL design',
      'Master HTTP status codes',
      'Apply REST best practices'
    ],
    tags: ['rest', 'architecture', 'design', 'principles'],
    slug: 'rest-fundamentals',
    order: 2
  }
]

export const tutorials: Tutorial[] = [
  {
    id: 'api-basics',
    title: 'API Fundamentals',
    description: 'Complete introduction to APIs and REST principles',
    lessons: ['intro-to-apis', 'rest-fundamentals'],
    estimatedTime: 40,
    level: 'beginner',
    slug: 'api-basics',
    tags: ['beginner', 'fundamentals']
  }
]

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug)
}

export function getLessonsByCategory(category: string): Lesson[] {
  return lessons.filter(lesson => lesson.category.toLowerCase() === category.toLowerCase())
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find(tutorial => tutorial.slug === slug)
}