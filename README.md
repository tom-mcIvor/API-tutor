# API Tutor — Learn APIs with Next.js

A modern, interactive learning platform built with Next.js and TypeScript that teaches API development, REST principles, and modern web development practices.

🌐 **Live Demo:** [View the deployed frontend here](https://api-tutor-steel.vercel.app/)

---

## ✨ Features

### 🎯 **Educational Content**
- **Structured Side Navigation** — 7 main sections covering Introduction to APIs, REST Fundamentals, HTTP Methods, Authentication, Design Patterns, Testing, and Profile management
- **Interactive Lessons** — Rich content with markdown support, code examples, and syntax highlighting
- **Progress Tracking** — Visual progress indicators and learning objectives for each lesson
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices

### 🚀 **Interactive Components**
- **API Playground** — Test real API endpoints and explore responses (placeholder implementation)
- **Code Examples** — Syntax-highlighted code blocks with copy functionality
- **User Profile** — Track learning progress, achievements, and statistics
- **Search Functionality** — Quick search through lessons and topics

### 🎨 **Modern UI/UX**
- **Clean Design** — Professional, modern interface with Tailwind CSS
- **Dark Mode Support** — Toggle between light and dark themes
- **Smooth Animations** — Subtle transitions and hover effects
- **Mobile-First** — Collapsible sidebar and responsive layouts

---
## 🚀 MVP (First Release Goals)

The **API Tutor App** is a learning platform built with **Next.js** and **TypeScript**.
It delivers interactive, structured content to help users understand APIs, REST principles, and modern web development practices.

**The MVP includes:**

- [x] **Structured Side Navigation** — Persistent left-hand side nav with 7 clickable tabs covering Introduction to APIs, REST Fundamentals, HTTP Methods, Authentication, Design Patterns, Testing, and Profile management.

- [x] **Interactive Content Display** — Each tab loads dedicated pages with rich content, code snippets, and examples featuring VS Code-style syntax highlighting.

- [x] **Rich Content System** — Comprehensive lesson content with markdown support, JSON metadata, and organized content management for individual lesson pages.

- [ ] **Interactive UI Components** — Animated lesson cards with hover effects, smooth transitions, progress indicators, and mobile-first responsive design.

- [x] **Comprehensive Learning Material** — Detailed educational content covering API fundamentals, REST principles, HTTP methods & status codes, authentication methods, design patterns, and testing approaches.

- [x] **Responsive Design** — Fully optimized for desktop, tablet, and mobile viewing with collapsible sidebar navigation for smaller devices.

- [ ] **Advanced Search Functionality** — Interactive search bar with real-time feedback, search suggestions, and topic discovery capabilities.

- [ ] **Error & Loading States** — Comprehensive error handling for missing content or API failures with loading spinners and graceful fallbacks.

- [x] **Individual Lesson System** — Dedicated lesson pages with detailed content, lesson navigation, progress tracking, and JSON-based metadata management.

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

**Frontend**
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- React hooks for state management
- Syntax highlighting for code examples
- Interactive components for API testing

**Development Tools**
- ESLint for code quality
- PostCSS and Autoprefixer
- TypeScript strict mode

**Potential Backend (Future)**  
- Next.js API Routes for user management
- Database integration (SQLite/PostgreSQL)
- Authentication with NextAuth.js

---

## 📂 Project Structure

```
api-tutor/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with sidebar
│   │   ├── page.tsx           # Home page
│   │   ├── lessons/           # Dynamic lesson pages
│   │   │   └── [slug]/        # Individual lesson routes
│   │   ├── playground/        # API testing playground
│   │   └── profile/           # User profile page
│   ├── components/            # Reusable components
│   │   ├── layout/           # Layout components
│   │   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   │   └── Header.tsx    # Top header
│   │   └── ui/               # UI components
│   │       └── CodeBlock.tsx # Code syntax highlighting
│   ├── lib/                  # Utilities and data
│   │   └── lessons.ts        # Lesson content and data
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared interfaces
│   └── data/                 # Static data files
├── content/              # Lesson content (JSON/Markdown)
├── public/                   # Static assets
└── Configuration files...
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

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/tom-mcIvor/API-tutor.git
   cd API-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

---

## 📚 Available Lessons

### 1. Introduction to APIs
- What are APIs?
- Request and Response concepts
- Real-world examples
- Basic API call demonstration

### 2. REST Fundamentals
- REST architectural principles
- Resource-based URLs
- HTTP status codes
- Best practices

### More lessons coming soon...

---

## 🎯 Learning Path

1. **Start with Basics** — Introduction to APIs
2. **Understand Architecture** — REST Fundamentals  
3. **Practice HTTP Methods** — GET, POST, PUT, DELETE
4. **Learn Security** — Authentication methods
5. **Explore Patterns** — API design patterns
6. **Master Testing** — API testing strategies
7. **Build Projects** — Apply knowledge in practice

---

## 🔧 Customization

### Adding New Lessons

1. Add lesson data to `src/lib/lessons.ts`
2. Include content, code examples, and metadata
3. The lesson will automatically appear in navigation

### Styling Changes

- Modify `tailwind.config.ts` for theme customization
- Update component styles in respective files
- Global styles in `src/app/globals.css`
---

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📋 Roadmap

### Phase 1: Core Features ✅
- [x] Project setup and structure
- [x] Basic navigation and layout
- [x] Lesson content system
- [x] Responsive design
- [x] TypeScript integration

### Phase 2: Enhanced Features 🔄
- [ ] Interactive API playground
- [ ] User authentication
- [ ] Progress persistence
- [ ] Search functionality
- [ ] Dark mode implementation

### Phase 3: Advanced Features 📋
- [ ] Real API integrations
- [ ] Interactive quizzes
- [ ] Community features
- [ ] Analytics dashboard
- [ ] Multi-language support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for the utility-first styling
- Lucide for the beautiful icons
- The developer community for inspiration and best practices

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
