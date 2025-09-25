import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: {
        orderIndex: 'asc'
      },
      include: {
        codeExamples: true,
        interactiveExercises: {
          include: {
            exerciseComponents: true
          }
        }
      }
    })

    return NextResponse.json(lessons)
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const lesson = await prisma.lesson.create({
      data: {
        id: body.id,
        title: body.title,
        description: body.description,
        category: body.category,
        level: body.level,
        duration: body.duration,
        content: body.content,
        prerequisites: body.prerequisites,
        objectives: body.objectives,
        tags: body.tags,
        slug: body.slug,
        orderIndex: body.orderIndex
      },
      include: {
        codeExamples: true,
        interactiveExercises: true
      }
    })

    return NextResponse.json(lesson, { status: 201 })
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}