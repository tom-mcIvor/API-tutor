import type { 
  CodeCompletionExercise, 
  MultipleChoiceExercise, 
  APIBuilderExercise, 
  DebuggingExercise,
  DragDropExercise 
} from '@/types'

// Interactive exercises for each lesson
export const exercises = {
  'introduction': [
    {
      id: 'api-basics-quiz',
      type: 'multiple-choice',
      title: 'API Fundamentals Quiz',
      description: 'Test your understanding of basic API concepts',
      difficulty: 'easy',
      points: 10,
      timeLimit: 120,
      hints: [
        'Think about what API stands for',
        'Consider the restaurant analogy from the lesson'
      ],
      question: 'What does API stand for and what is its primary purpose?',
      options: [
        {
          id: 'a',
          text: 'Application Programming Interface - allows different software applications to communicate',
          isCorrect: true,
          explanation: 'Correct! APIs are interfaces that enable communication between different software systems.'
        },
        {
          id: 'b',
          text: 'Advanced Programming Integration - helps integrate advanced programming features',
          isCorrect: false,
          explanation: 'This is not correct. API stands for Application Programming Interface.'
        },
        {
          id: 'c',
          text: 'Automated Process Interface - automates processes between systems',
          isCorrect: false,
          explanation: 'While APIs can automate processes, this is not what API stands for.'
        },
        {
          id: 'd',
          text: 'Application Protocol Interface - defines protocols for applications',
          isCorrect: false,
          explanation: 'Close, but API stands for Application Programming Interface, not Protocol.'
        }
      ],
      explanation: 'APIs (Application Programming Interfaces) are sets of rules and protocols that allow different software applications to communicate with each other, just like a waiter takes your order to the kitchen.',
      solution: {
        type: 'multiple-choice',
        data: 'a',
        explanation: 'APIs enable software components to communicate by defining the methods, data structures, and conventions that applications can use to request and exchange information.'
      },
      validation: {
        autoCheck: true,
        feedback: {
          correct: 'Excellent! You understand what APIs are and their purpose.',
          incorrect: 'Not quite. Review the lesson content about API definitions and purposes.'
        }
      }
    } as MultipleChoiceExercise,

    {
      id: 'api-request-code',
      type: 'code-completion',
      title: 'Complete the API Request',
      description: 'Fill in the missing parts of this JavaScript fetch request',
      difficulty: 'easy',
      points: 15,
      timeLimit: 180,
      hints: [
        'Remember the basic fetch syntax',
        'Check what method is typically used to retrieve data',
        'Consider what happens after the response is received'
      ],
      template: `// Making a {{method}} request to fetch user data
fetch('{{url}}')
  .then(response => response.{{parse_method}}())
  .then(user => {
    console.log('User data:', user);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
  })
  .catch(error => {
    console.error('Error fetching user:', {{error_param}});
  });`,
      language: 'javascript',
      blanks: [
        {
          id: 'method',
          placeholder: 'HTTP method',
          correctAnswers: ['GET', 'get'],
          caseSensitive: false,
          hint: 'What HTTP method is used to retrieve data?'
        },
        {
          id: 'url',
          placeholder: 'API URL',
          correctAnswers: ['https://jsonplaceholder.typicode.com/users/1', 'https://jsonplaceholder.typicode.com/users/1/'],
          caseSensitive: false,
          hint: 'Use the JSONPlaceholder API to get user with ID 1'
        },
        {
          id: 'parse_method',
          placeholder: 'parsing method',
          correctAnswers: ['json', 'JSON'],
          caseSensitive: false,
          hint: 'What method converts the response to JSON?'
        },
        {
          id: 'error_param',
          placeholder: 'error parameter',
          correctAnswers: ['error'],
          caseSensitive: false,
          hint: 'What parameter contains the error information?'
        }
      ],
      expectedOutput: `User data: {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  ...
}`,
      solution: {
        type: 'code-completion',
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/users/1',
          parse_method: 'json',
          error_param: 'error'
        },
        explanation: 'This code makes a GET request to fetch user data, parses the JSON response, and handles any errors that might occur.',
        codeExample: `fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(user => console.log(user))
  .catch(error => console.error('Error:', error));`
      },
      validation: {
        autoCheck: true,
        feedback: {
          correct: 'Perfect! You understand how to make basic API requests with fetch.',
          incorrect: 'Review the fetch API syntax and try again.',
          partial: 'Good progress! Check the remaining blanks.'
        }
      }
    } as CodeCompletionExercise
  ],

  'rest-fundamentals': [
    {
      id: 'rest-principles-drag-drop',
      type: 'drag-drop',
      title: 'REST Principles Matching',
      description: 'Match each REST principle with its correct description',
      difficulty: 'medium',
      points: 20,
      timeLimit: 240,
      hints: [
        'Think about what each principle means for API design',
        'Consider how each principle affects client-server communication'
      ],
      instruction: 'Drag each REST principle to its matching description',
      items: [
        { id: 'stateless', content: 'Stateless', category: 'principle' },
        { id: 'cacheable', content: 'Cacheable', category: 'principle' },
        { id: 'uniform-interface', content: 'Uniform Interface', category: 'principle' },
        { id: 'client-server', content: 'Client-Server', category: 'principle' },
        { id: 'layered-system', content: 'Layered System', category: 'principle' },
        { id: 'code-on-demand', content: 'Code on Demand', category: 'principle' }
      ],
      dropZones: [
        { 
          id: 'stateless-desc', 
          label: 'Each request contains all information needed to understand it',
          acceptsCategory: 'principle',
          maxItems: 1
        },
        { 
          id: 'cacheable-desc', 
          label: 'Responses should indicate if they can be cached',
          acceptsCategory: 'principle',
          maxItems: 1
        },
        { 
          id: 'uniform-desc', 
          label: 'Consistent naming conventions and resource identification',
          acceptsCategory: 'principle',
          maxItems: 1
        },
        { 
          id: 'client-server-desc', 
          label: 'Clear separation between frontend and backend',
          acceptsCategory: 'principle',
          maxItems: 1
        },
        { 
          id: 'layered-desc', 
          label: 'Architecture can have multiple layers like proxies',
          acceptsCategory: 'principle',
          maxItems: 1
        },
        { 
          id: 'code-demand-desc', 
          label: 'Server can send executable code to extend client functionality',
          acceptsCategory: 'principle',
          maxItems: 1
        }
      ],
      correctMapping: {
        'stateless': 'stateless-desc',
        'cacheable': 'cacheable-desc',
        'uniform-interface': 'uniform-desc',
        'client-server': 'client-server-desc',
        'layered-system': 'layered-desc',
        'code-on-demand': 'code-demand-desc'
      },
      solution: {
        type: 'drag-drop',
        data: {
          'stateless': 'stateless-desc',
          'cacheable': 'cacheable-desc',
          'uniform-interface': 'uniform-desc',
          'client-server': 'client-server-desc',
          'layered-system': 'layered-desc',
          'code-on-demand': 'code-demand-desc'
        },
        explanation: 'These six principles define RESTful architecture and help create predictable, scalable APIs.'
      },
      validation: {
        autoCheck: true,
        feedback: {
          correct: 'Excellent! You understand the REST principles and their meanings.',
          incorrect: 'Review the REST principles and their descriptions.',
          partial: 'Good start! Check the remaining matches.'
        }
      }
    } as DragDropExercise,

    {
      id: 'rest-api-builder',
      type: 'api-builder',
      title: 'Build a RESTful User API',
      description: 'Create a complete RESTful API for managing users',
      difficulty: 'medium',
      points: 25,
      timeLimit: 600,
      hints: [
        'Remember to use appropriate HTTP methods for each operation',
        'Follow RESTful URL patterns like /api/users and /api/users/:id',
        'Return appropriate status codes for each operation'
      ],
      scenario: 'You need to build a RESTful API for a user management system. The API should support creating, reading, updating, and deleting users.',
      requirements: [
        'GET /api/users - Return all users with 200 status',
        'GET /api/users/:id - Return specific user with 200 status',
        'POST /api/users - Create new user with 201 status',
        'PUT /api/users/:id - Update user with 200 status',
        'DELETE /api/users/:id - Delete user with 204 status'
      ],
      startingCode: `const express = require('express');
const app = express();

app.use(express.json());

// Your API routes go here

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      testCases: [
        {
          id: 'get-all-users',
          method: 'GET',
          endpoint: '/api/users',
          expectedStatus: 200,
          description: 'Should return all users'
        },
        {
          id: 'get-user-by-id',
          method: 'GET',
          endpoint: '/api/users/1',
          expectedStatus: 200,
          description: 'Should return user with ID 1'
        },
        {
          id: 'create-user',
          method: 'POST',
          endpoint: '/api/users',
          requestBody: { name: 'John Doe', email: 'john@example.com' },
          expectedStatus: 201,
          description: 'Should create a new user'
        },
        {
          id: 'update-user',
          method: 'PUT',
          endpoint: '/api/users/1',
          requestBody: { name: 'Jane Doe', email: 'jane@example.com' },
          expectedStatus: 200,
          description: 'Should update existing user'
        },
        {
          id: 'delete-user',
          method: 'DELETE',
          endpoint: '/api/users/1',
          expectedStatus: 204,
          description: 'Should delete user'
        }
      ],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      solution: {
        type: 'api-builder',
        data: `const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  user.name = req.body.name;
  user.email = req.body.email;
  res.status(200).json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
        explanation: 'This RESTful API follows standard conventions: GET for reading, POST for creating, PUT for updating, and DELETE for removing resources. Each endpoint returns appropriate status codes.'
      },
      validation: {
        autoCheck: true,
        feedback: {
          correct: 'Outstanding! You\'ve built a complete RESTful API following all best practices.',
          incorrect: 'Your API needs some adjustments. Check the HTTP methods, status codes, and URL patterns.',
          partial: 'Good progress! Some endpoints are working correctly.'
        }
      }
    } as APIBuilderExercise
  ],

  'http-methods': [
    {
      id: 'debug-http-methods',
      type: 'debugging',
      title: 'Fix the HTTP Methods Bug',
      description: 'This API has several issues with HTTP method usage and status codes',
      difficulty: 'medium',
      points: 20,
      timeLimit: 300,
      hints: [
        'Check if the HTTP methods match their intended operations',
        'Verify that status codes are appropriate for each operation',
        'Look for missing error handling'
      ],
      buggyCode: `app.get('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(200).json(newUser);
});

app.post('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  res.status(200).json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  users.splice(userIndex, 1);
  res.status(200).send();
});`,
      language: 'javascript',
      errorDescription: 'The API endpoints are using wrong HTTP methods and status codes. Users report that they can\'t retrieve user lists, and creating users doesn\'t work as expected.',
      expectedBehavior: 'GET should retrieve data, POST should create data with 201 status, DELETE should return 204 status, and there should be proper error handling.',
      bugCount: 4,
      solution: {
        type: 'debugging',
        data: `app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});`,
        explanation: 'Fixed: 1) GET /api/users should return users list, not create users, 2) POST /api/users should create users with 201 status, 3) GET /api/users/:id should retrieve specific user, 4) DELETE should return 204 status, 5) Added proper error handling.'
      },
      validation: {
        autoCheck: true,
        feedback: {
          correct: 'Perfect! You\'ve fixed all the HTTP method and status code issues.',
          incorrect: 'There are still some bugs to fix. Check the HTTP methods and status codes.',
          partial: 'Good progress! You\'ve fixed some of the issues.'
        }
      }
    } as DebuggingExercise
  ]
}

// Helper function to get exercises for a lesson
export function getExercisesForLesson(lessonSlug: string) {
  return exercises[lessonSlug as keyof typeof exercises] || []
}

// Helper function to get exercise by ID
export function getExerciseById(exerciseId: string) {
  for (const lessonExercises of Object.values(exercises)) {
    const exercise = lessonExercises.find(ex => ex.id === exerciseId)
    if (exercise) return exercise
  }
  return null
}