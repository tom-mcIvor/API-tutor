import { PrismaClient } from '@prisma/client'
import { lessons } from '../src/lib/lessons'
import { exercises } from '../src/data/exercises'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  try {
    console.log('🌱 Starting database seed...')
    console.log(`📊 Found ${lessons.length} lessons to seed`)

    // Clear existing data with better error handling
    console.log('🗑️  Clearing existing data...')
    
    try {
      await prisma.userProgress.deleteMany()
      console.log('  ✅ Cleared user progress')
    } catch (error) {
      console.log('  ⚠️  No user progress to clear')
    }

    try {
      await prisma.exerciseAttempt.deleteMany()
      console.log('  ✅ Cleared exercise attempts')
    } catch (error) {
      console.log('  ⚠️  No exercise attempts to clear')
    }

    try {
      await prisma.exerciseComponent.deleteMany()
      console.log('  ✅ Cleared exercise components')
    } catch (error) {
      console.log('  ⚠️  No exercise components to clear')
    }

    try {
      await prisma.interactiveExercise.deleteMany()
      console.log('  ✅ Cleared interactive exercises')
    } catch (error) {
      console.log('  ⚠️  No interactive exercises to clear')
    }

    try {
      await prisma.codeExample.deleteMany()
      console.log('  ✅ Cleared code examples')
    } catch (error) {
      console.log('  ⚠️  No code examples to clear')
    }

    try {
      await prisma.lesson.deleteMany()
      console.log('  ✅ Cleared lessons')
    } catch (error) {
      console.log('  ⚠️  No lessons to clear')
    }

    console.log('🗑️  Data clearing completed')

    // Seed lessons with detailed error handling
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i]
      console.log(`📚 [${i + 1}/${lessons.length}] Creating lesson: ${lesson.title}`)
      
      try {
        // Validate lesson data before creating
        if (!lesson.id || !lesson.title || !lesson.slug) {
          throw new Error(`Invalid lesson data: missing required fields (id: ${lesson.id}, title: ${lesson.title}, slug: ${lesson.slug})`)
        }

        const createdLesson = await prisma.lesson.create({
          data: {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description || null,
            category: lesson.category || 'General',
            level: lesson.level as 'beginner' | 'intermediate' | 'advanced',
            duration: lesson.duration || null,
            content: lesson.content || null,
            prerequisites: lesson.prerequisites || [],
            objectives: lesson.objectives || [],
            tags: lesson.tags || [],
            slug: lesson.slug,
            orderIndex: lesson.order || 0
          }
        })

        console.log(`  ✅ Created lesson: ${createdLesson.title}`)

        // Seed code examples for this lesson
        if (lesson.codeExamples && lesson.codeExamples.length > 0) {
          console.log(`  📝 Adding ${lesson.codeExamples.length} code examples...`)
          
          for (let j = 0; j < lesson.codeExamples.length; j++) {
            const example = lesson.codeExamples[j]
            
            try {
              if (!example.id || !example.code) {
                throw new Error(`Invalid code example data: missing required fields (id: ${example.id}, code length: ${example.code?.length || 0})`)
              }

              await prisma.codeExample.create({
                data: {
                  id: example.id,
                  lessonId: createdLesson.id,
                  language: example.language || 'javascript',
                  title: example.title || 'Code Example',
                  description: example.description || '',
                  code: example.code,
                  output: example.output || '',
                  editable: false,
                  orderIndex: j
                }
              })
              console.log(`    ✅ Added code example: ${example.title || example.id}`)
            } catch (exampleError) {
              console.error(`    ❌ Failed to create code example ${j + 1}:`, exampleError)
              throw exampleError
            }
          }
          console.log(`  ✅ Added ${lesson.codeExamples.length} code examples`)
        }
      } catch (lessonError) {
        console.error(`❌ Failed to create lesson "${lesson.title}":`, lessonError)
        throw lessonError
      }
    }

    console.log(`✅ Successfully seeded ${lessons.length} lessons`)

    // Seed interactive exercises
    console.log('🎮 Creating interactive exercises...')
    let totalExercises = 0
    
    for (const [lessonSlug, lessonExercises] of Object.entries(exercises)) {
      console.log(`  📝 Adding exercises for lesson: ${lessonSlug}`)
      
      for (let i = 0; i < lessonExercises.length; i++) {
        const exercise = lessonExercises[i]
        
        try {
          if (!exercise.id || !exercise.type || !exercise.title) {
            throw new Error(`Invalid exercise data: missing required fields (id: ${exercise.id}, type: ${exercise.type}, title: ${exercise.title})`)
          }

          await prisma.interactiveExercise.create({
            data: {
              id: exercise.id,
              lessonSlug: lessonSlug,
              type: exercise.type.replace('-', '_') as any, // Convert kebab-case to snake_case for enum
              title: exercise.title,
              description: exercise.description || '',
              difficulty: exercise.difficulty as 'easy' | 'medium' | 'hard',
              points: exercise.points || 0,
              timeLimit: exercise.timeLimit || null,
              hints: exercise.hints || [],
              exerciseData: exercise as any, // Store the full exercise data as JSON
              solution: exercise.solution ? JSON.parse(JSON.stringify(exercise.solution)) : null,
              validation: exercise.validation ? JSON.parse(JSON.stringify(exercise.validation)) : null,
            }
          })
          
          console.log(`    ✅ Added exercise: ${exercise.title}`)
          totalExercises++
        } catch (exerciseError) {
          console.error(`    ❌ Failed to create exercise "${exercise.title}":`, exerciseError)
          // Continue with other exercises instead of failing completely
        }
      }
    }
    
    console.log(`✅ Successfully seeded ${totalExercises} interactive exercises`)

    // Create navigation items
    console.log('🧭 Creating navigation items...')
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
      try {
        await prisma.navigationItem.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        console.log(`  ✅ Created/updated navigation item: ${item.title}`)
      } catch (navError) {
        console.error(`  ❌ Failed to create navigation item "${item.title}":`, navError)
      }
    }

    console.log('🧭 Navigation items completed')
    console.log('✅ Database seeded successfully!')
    
    // Summary
    console.log('\n📊 Seeding Summary:')
    console.log(`  • ${lessons.length} lessons created`)
    console.log(`  • ${lessons.reduce((total, lesson) => total + (lesson.codeExamples?.length || 0), 0)} code examples created`)
    console.log(`  • ${totalExercises} interactive exercises created`)
    console.log(`  • ${navigationItems.length} navigation items created`)
    
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    console.error('Stack trace:', e.stack)
    process.exit(1)
  })
  .finally(async () => {
    console.log('🔌 Disconnecting from database...')
    await prisma.$disconnect()
    console.log('👋 Seed process completed')
  })