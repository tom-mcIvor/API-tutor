import { PrismaClient } from '@prisma/client'
import { lessons } from '../src/lib/lessons'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.userProgress.deleteMany()
  await prisma.exerciseAttempt.deleteMany()
  await prisma.exerciseComponent.deleteMany()
  await prisma.interactiveExercise.deleteMany()
  await prisma.codeExample.deleteMany()
  await prisma.lesson.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Seed lessons
  for (const lesson of lessons) {
    console.log(`📚 Creating lesson: ${lesson.title}`)
    
    const createdLesson = await prisma.lesson.create({
      data: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category || 'General',
        level: lesson.level as 'beginner' | 'intermediate' | 'advanced',
        duration: lesson.duration,
        content: lesson.content,
        prerequisites: lesson.prerequisites || [],
        objectives: lesson.objectives || [],
        tags: lesson.tags || [],
        slug: lesson.slug,
        orderIndex: lesson.order || 0
      }
    })

    // Seed code examples for this lesson
    if (lesson.codeExamples && lesson.codeExamples.length > 0) {
      for (let i = 0; i < lesson.codeExamples.length; i++) {
        const example = lesson.codeExamples[i]
        await prisma.codeExample.create({
          data: {
            id: example.id,
            lessonId: createdLesson.id,
            language: example.language,
            title: example.title || 'Code Example',
            description: example.description || '',
            code: example.code,
            output: example.output || '',
            editable: false,
            orderIndex: i
          }
        })
      }
      console.log(`  ✅ Added ${lesson.codeExamples.length} code examples`)
    }
  }

  // Create some sample navigation items
  const navigationItems = [
    {
      id: 'introduction',
      title: 'Introduction to APIs',
      href: '/lessons/introduction',
      icon: 'BookOpen',
      orderIndex: 1
    },
    {
      id: 'rest-fundamentals',
      title: 'REST Fundamentals',
      href: '/lessons/rest-fundamentals',
      icon: 'Globe',
      orderIndex: 2
    },
    {
      id: 'http-methods',
      title: 'HTTP Methods',
      href: '/lessons/http-methods',
      icon: 'Send',
      orderIndex: 3
    },
    {
      id: 'authentication',
      title: 'Authentication',
      href: '/lessons/authentication',
      icon: 'Shield',
      orderIndex: 4
    },
    {
      id: 'testing',
      title: 'API Testing',
      href: '/lessons/testing',
      icon: 'TestTube',
      orderIndex: 5
    },
    {
      id: 'design-patterns',
      title: 'Design Patterns',
      href: '/lessons/design-patterns',
      icon: 'Layers',
      orderIndex: 6
    },
    {
      id: 'playground',
      title: 'API Playground',
      href: '/playground',
      icon: 'Play',
      orderIndex: 7
    },
    {
      id: 'profile',
      title: 'Profile',
      href: '/profile',
      icon: 'User',
      orderIndex: 8
    }
  ]

  for (const item of navigationItems) {
    await prisma.navigationItem.upsert({
      where: { id: item.id },
      update: item,
      create: item
    })
  }

  console.log('🧭 Created navigation items')
  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })