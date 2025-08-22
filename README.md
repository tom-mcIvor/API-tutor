# API Tutor — Learn APIs with Next.js

🌐 **Live Demo:** Coming Soon

---

## 🚀 MVP (First Release Goals)

The **API Tutor App** is a learning platform built with **Next.js** and **TypeScript**.
It delivers interactive, structured content to help users understand APIs, REST principles, and modern web development practices.

**The MVP includes:**

- [ ] **Structured Side Navigation** — Persistent left-hand side nav with 7 clickable tabs covering Introduction to APIs, REST Fundamentals, HTTP Methods, Authentication, Design Patterns, Testing, and Profile management.

- [ ] **Interactive Content Display** — Each tab loads dedicated pages with rich content, code snippets, and examples featuring VS Code-style syntax highlighting.

- [ ] **Rich Content System** — Comprehensive lesson content with markdown support, JSON metadata, and organized content management for individual lesson pages.

- [ ] **Interactive UI Components** — Animated lesson cards with hover effects, smooth transitions, progress indicators, and mobile-first responsive design.

- [ ] **Comprehensive Learning Material** — Detailed educational content covering API fundamentals, REST principles, HTTP methods & status codes, authentication methods, design patterns, and testing approaches.

- [ ] **Responsive Design** — Fully optimized for desktop, tablet, and mobile viewing with collapsible sidebar navigation for smaller devices.

- [ ] **Advanced Search Functionality** — Interactive search bar with real-time feedback, search suggestions, and topic discovery capabilities.

- [ ] **Error & Loading States** — Comprehensive error handling for missing content or API failures with loading spinners and graceful fallbacks.

- [ ] **Individual Lesson System** — Dedicated lesson pages with detailed content, lesson navigation, progress tracking, and JSON-based metadata management.

- [ ] **Interactive API Playground** — Built-in interface to make actual API calls and see responses with example APIs for practice and request/response visualization.

---

## 🌟 Stretch Goals

- [ ] **Vercel Deployment** — Public cloud hosting with CI/CD pipeline for automated deployments.
- [ ] **Stripe Integration** — Payment flow for unlocking premium content (test mode during development).
- [ ] **Interactive Code Playground** — Run JavaScript/TypeScript code snippets for API calls in the browser.
- [ ] **Progress Tracking** — Track completed lessons and topics with persistent storage.
- [ ] **User Authentication System** — Complete sign up, log in, and log out with email/password using NextAuth.js.
- [ ] **Interactive Quizzes & Challenges** — Multiple choice quizzes and coding challenges with instant feedback.
- [ ] **Dark Mode** — Theme toggle for user comfort with system preference detection.
- [ ] **User Profiles** — Dedicated profile page with progress tracking and time spent analytics.
- [ ] **Feedback System** — User feedback collection and submission system.
- [ ] **Admin Dashboard** — Manage content, metrics, and user analytics.
- [ ] **Offline Mode** — Cache lessons for offline reading.
- [ ] **Multi-language Support** — Tutorials in multiple languages.
- [ ] **API Collection Builder** — Let users create and share custom API collections.
- [ ] **Real API Integration** — Connect to real APIs with proper authentication.
- [ ] **GraphQL Section** — Additional content covering GraphQL APIs.

---

## 📌 Why This Project

- Learn **API fundamentals** with hands-on practice, not just theory.
- Understand REST principles, HTTP methods, authentication, and best practices.
- Practice making real API calls and handling responses.
- See how modern web applications consume APIs.
- Build confidence in API design and testing.

---

## 🛠 Tech Stack

**Frontend (Next.js)**  
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Syntax highlighting for code examples
- Interactive components for API testing

**Potential Backend (Future)**  
- Next.js API Routes for user management
- Database integration (SQLite/PostgreSQL)
- Authentication with NextAuth.js

---

## 📂 Project Structure

```
api-tutor/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── lessons/           # Lesson pages
│   └── api/               # API routes (future)
├── components/            # Reusable components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── LessonCard.tsx    # Lesson cards
│   └── ApiPlayground.tsx # Interactive API testing
├── content/              # Lesson content (JSON/Markdown)
├── lib/                  # Utilities and helpers
└── public/              # Static assets
```

---

## 🎯 Development Phases

### Phase 1: Foundation (MVP)
- [ ] Set up Next.js project with TypeScript
- [ ] Create basic navigation structure
- [ ] Implement lesson content system
- [ ] Add responsive design

### Phase 2: Content & Interactivity
- [ ] Create comprehensive lesson content
- [ ] Add syntax highlighting
- [ ] Implement API playground
- [ ] Add search functionality

### Phase 3: Enhanced Features
- [ ] User authentication
- [ ] Progress tracking
- [ ] Interactive quizzes
- [ ] Dark mode

### Phase 4: Advanced Features
- [ ] Real API integrations
- [ ] Advanced testing tools
- [ ] Community features
- [ ] Analytics and insights

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/tom-mcIvor/API-tutor.git
   cd API-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).