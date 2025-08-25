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
  },
  {
    id: 'http-methods',
    title: 'HTTP Methods Deep Dive',
    description: 'Master HTTP methods (GET, POST, PUT, DELETE, PATCH) and understand when to use each one.',
    category: 'HTTP',
    level: 'intermediate',
    duration: 30,
    content: `# HTTP Methods Deep Dive

HTTP methods (also called HTTP verbs) define the type of operation you want to perform on a resource. Each method has a specific purpose and semantic meaning.

## The Main HTTP Methods

### GET - Retrieve Data
The GET method requests data from a server. It should be safe and idempotent (multiple calls produce the same result).

**Characteristics:**
- Safe: Doesn't modify data
- Idempotent: Multiple calls have same effect
- Cacheable: Responses can be cached
- Data sent in URL query parameters

### POST - Create New Resources
POST submits data to create a new resource. It's neither safe nor idempotent.

**Characteristics:**
- Not safe: Modifies server state
- Not idempotent: Multiple calls may create multiple resources
- Data sent in request body
- Can trigger side effects

### PUT - Update/Replace Resources
PUT replaces an entire resource or creates it if it doesn't exist. It's idempotent but not safe.

**Characteristics:**
- Not safe: Modifies server state
- Idempotent: Multiple calls have same effect
- Replaces entire resource
- Data sent in request body

### DELETE - Remove Resources
DELETE removes a resource from the server. It's idempotent but not safe.

**Characteristics:**
- Not safe: Modifies server state
- Idempotent: Multiple calls have same effect
- No request body typically needed

### PATCH - Partial Updates
PATCH applies partial modifications to a resource. It's not idempotent by default.

**Characteristics:**
- Not safe: Modifies server state
- Not necessarily idempotent
- Updates specific fields only
- Data sent in request body

## When to Use Each Method

| Method | Use Case | Example URL | Example Body |
|--------|----------|-------------|--------------|
| GET | Retrieve user profile | \`GET /api/users/123\` | None |
| POST | Create new user | \`POST /api/users\` | User data |
| PUT | Replace user profile | \`PUT /api/users/123\` | Complete user data |
| PATCH | Update user email | \`PATCH /api/users/123\` | \`{"email": "new@email.com"}\` |
| DELETE | Remove user | \`DELETE /api/users/123\` | None |

## Status Code Responses

Different methods typically return different status codes:

- **GET**: 200 OK, 404 Not Found
- **POST**: 201 Created, 400 Bad Request
- **PUT**: 200 OK (update), 201 Created (create)
- **PATCH**: 200 OK, 204 No Content
- **DELETE**: 200 OK, 204 No Content, 404 Not Found

## Best Practices

1. **Use the right method for the right operation**
2. **Make GET requests safe and cacheable**
3. **Use PUT for complete replacements**
4. **Use PATCH for partial updates**
5. **Include proper status codes in responses**
6. **Handle idempotency correctly**`,
    codeExamples: [
      {
        id: 'http-methods-examples',
        language: 'javascript',
        title: 'HTTP Methods in Practice',
        description: 'Real examples of using different HTTP methods',
        code: `// GET - Retrieve user data
const getUser = async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};

// POST - Create new user
const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  
  if (response.status === 201) {
    return response.json();
  }
  throw new Error('Failed to create user');
};

// PUT - Replace entire user profile
const replaceUser = async (userId, userData) => {
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};

// PATCH - Update user email only
const updateUserEmail = async (userId, newEmail) => {
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: newEmail })
  });
  
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to update email');
};

// DELETE - Remove user
const deleteUser = async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    console.log('User deleted successfully');
  } else {
    throw new Error('Failed to delete user');
  }
};`
      }
    ],
    prerequisites: ['rest-fundamentals'],
    objectives: [
      'Understand the purpose of each HTTP method',
      'Learn when to use GET, POST, PUT, PATCH, and DELETE',
      'Master idempotency and safety concepts',
      'Apply correct status codes for each method'
    ],
    tags: ['http', 'methods', 'verbs', 'rest'],
    slug: 'http-methods',
    order: 3
  },
  {
    id: 'authentication',
    title: 'API Authentication',
    description: 'Learn different authentication methods including API keys, JWT tokens, and OAuth.',
    category: 'Security',
    level: 'intermediate',
    duration: 35,
    content: `# API Authentication

Authentication is the process of verifying who is making a request to your API. It's essential for protecting your API from unauthorized access and ensuring data security.

## Why Authentication Matters

1. **Security**: Protect sensitive data and operations
2. **Rate Limiting**: Control how many requests users can make
3. **User Context**: Know who is making each request
4. **Billing**: Track usage for paid APIs

## Common Authentication Methods

### 1. API Keys
Simple authentication using a unique key for each user.

**How it works:**
- User gets a unique API key
- Key is sent with each request
- Server validates the key

**Example:**
\`\`\`
GET /api/users
Authorization: Bearer your-api-key-here
\`\`\`

### 2. Basic Authentication
Uses username and password encoded in Base64.

**How it works:**
- Username:password is Base64 encoded
- Sent in Authorization header
- Simple but requires HTTPS

**Example:**
\`\`\`
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
\`\`\`

### 3. JWT (JSON Web Tokens)
Self-contained tokens that carry user information.

**How it works:**
- User logs in and receives a JWT
- Token contains encoded user data
- Server verifies token signature

**Example:**
\`\`\`
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 4. OAuth 2.0
Industry standard for authorization, used by Google, Facebook, etc.

**How it works:**
- User authorizes your app with third-party service
- You receive an access token
- Use token to access user data

## Security Best Practices

1. **Always use HTTPS** for authentication
2. **Store tokens securely** (not in localStorage for sensitive apps)
3. **Implement token expiration** and refresh mechanisms
4. **Use strong, random API keys**
5. **Rate limit** authenticated requests
6. **Log authentication attempts** for security monitoring

## Authentication vs Authorization

- **Authentication**: "Who are you?" (Identity verification)
- **Authorization**: "What can you do?" (Permission checking)

Both are usually needed for secure APIs.

## Handling Authentication Errors

Common authentication error status codes:

- **401 Unauthorized**: Invalid or missing credentials
- **403 Forbidden**: Valid credentials but insufficient permissions
- **429 Too Many Requests**: Rate limit exceeded

## Token Storage Best Practices

### For Web Applications:
- **Sensitive apps**: HttpOnly cookies
- **Less sensitive**: localStorage with proper sanitization
- **Never**: Plain text or unencrypted storage

### For Mobile Apps:
- **iOS**: Keychain Services
- **Android**: Android Keystore System
- **Cross-platform**: Secure storage libraries`,
    codeExamples: [
      {
        id: 'authentication-examples',
        language: 'javascript',
        title: 'Authentication Methods in Practice',
        description: 'Examples of implementing different authentication methods',
        code: `// 1. API Key Authentication
const fetchWithApiKey = async (endpoint, apiKey) => {
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    }
  });
  
  if (response.status === 401) {
    throw new Error('Invalid API key');
  }
  
  return response.json();
};

// 2. Basic Authentication
const fetchWithBasicAuth = async (endpoint, username, password) => {
  const credentials = btoa(\`\${username}:\${password}\`);
  
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': \`Basic \${credentials}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
};

// 3. JWT Authentication
class JWTAuth {
  constructor() {
    this.token = localStorage.getItem('jwt_token');
  }
  
  async login(username, password) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      this.token = data.token;
      localStorage.setItem('jwt_token', this.token);
      return data;
    }
    
    throw new Error('Login failed');
  }
  
  async authenticatedRequest(endpoint, options = {}) {
    if (!this.token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': \`Bearer \${this.token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 401) {
      // Token might be expired
      this.logout();
      throw new Error('Authentication expired');
    }
    
    return response.json();
  }
  
  logout() {
    this.token = null;
    localStorage.removeItem('jwt_token');
  }
}

// Usage example
const auth = new JWTAuth();

// Login and make authenticated requests
auth.login('user@example.com', 'password')
  .then(() => {
    return auth.authenticatedRequest('/api/user/profile');
  })
  .then(profile => {
    console.log('User profile:', profile);
  })
  .catch(error => {
    console.error('Authentication error:', error);
  });`
      }
    ],
    prerequisites: ['http-methods'],
    objectives: [
      'Understand different authentication methods',
      'Learn when to use API keys vs JWT vs OAuth',
      'Implement secure authentication in applications',
      'Handle authentication errors properly'
    ],
    tags: ['security', 'authentication', 'jwt', 'oauth', 'api-keys'],
    slug: 'authentication',
    order: 4
  },
  {
    id: 'testing',
    title: 'API Testing Strategies',
    description: 'Learn how to test APIs effectively using various tools and techniques.',
    category: 'Testing',
    level: 'intermediate',
    duration: 40,
    content: `# API Testing Strategies

API testing ensures your APIs work correctly, perform well, and handle edge cases gracefully. It's a critical part of API development.

## Types of API Testing

### 1. Unit Testing
Testing individual API endpoints in isolation.

### 2. Integration Testing
Testing how different parts of your API work together.

### 3. End-to-End Testing
Testing complete user workflows through the API.

### 4. Performance Testing
Testing API response times and throughput under load.

### 5. Security Testing
Testing for vulnerabilities and proper authentication.

## Testing Tools

- **Postman**: Popular GUI tool for API testing
- **Jest/Mocha**: JavaScript testing frameworks
- **Supertest**: HTTP testing library for Node.js
- **Artillery**: Load testing tool
- **Newman**: Command-line Postman runner

## Best Practices

1. Test all HTTP methods and status codes
2. Validate response schemas
3. Test error conditions
4. Use automated testing in CI/CD
5. Test with realistic data volumes`,
    codeExamples: [
      {
        id: 'api-testing-examples',
        language: 'javascript',
        title: 'API Testing with Jest and Supertest',
        description: 'Complete API testing examples',
        code: `const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  test('GET /api/users should return all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('POST /api/users should create new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
    
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.id).toBeDefined();
  });
});`
      }
    ],
    prerequisites: ['authentication'],
    objectives: [
      'Learn different types of API testing',
      'Understand testing tools and frameworks',
      'Write effective API tests',
      'Implement automated testing'
    ],
    tags: ['testing', 'quality', 'automation'],
    slug: 'testing',
    order: 5
  },
  {
    id: 'design-patterns',
    title: 'API Design Patterns',
    description: 'Explore common API design patterns and architectural decisions.',
    category: 'Architecture',
    level: 'advanced',
    duration: 45,
    content: `# API Design Patterns

Learn common patterns that solve recurring problems in API design.

## Resource Design Patterns

### 1. Collection Pattern
\`\`\`
GET /api/users          # Get all users
POST /api/users         # Create user
GET /api/users/123      # Get specific user
PUT /api/users/123      # Update user
DELETE /api/users/123   # Delete user
\`\`\`

### 2. Nested Resources
\`\`\`
GET /api/users/123/posts     # Get posts by user 123
POST /api/users/123/posts    # Create post for user 123
\`\`\`

## Response Patterns

### 1. Envelope Pattern
Wrap responses in a consistent structure:
\`\`\`json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1
  }
}
\`\`\`

### 2. HATEOAS
Include links to related resources in responses.

## Error Handling Patterns

Always return consistent error formats with proper status codes.

## Versioning Patterns

1. URL versioning: \`/api/v1/users\`
2. Header versioning: \`Accept: application/vnd.api+json;version=1\`
3. Parameter versioning: \`/api/users?version=1\``,
    codeExamples: [
      {
        id: 'design-patterns-examples',
        language: 'javascript',
        title: 'API Design Pattern Examples',
        description: 'Examples of common API design patterns',
        code: `// Envelope pattern response
const envelope = (data, meta = {}) => ({
  data,
  meta: {
    timestamp: new Date().toISOString(),
    ...meta
  }
});

// HATEOAS example
const userWithLinks = (user) => ({
  ...user,
  _links: {
    self: { href: \`/api/users/\${user.id}\` },
    posts: { href: \`/api/users/\${user.id}/posts\` },
    edit: { href: \`/api/users/\${user.id}\`, method: 'PUT' }
  }
});`
      }
    ],
    prerequisites: ['testing'],
    objectives: [
      'Learn common API design patterns',
      'Understand when to use each pattern',
      'Apply patterns to real APIs',
      'Design consistent API interfaces'
    ],
    tags: ['design', 'patterns', 'architecture'],
    slug: 'design-patterns',
    order: 6
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