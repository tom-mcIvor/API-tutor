import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const lesson = await prisma.lesson.findUnique({
      where: {
        slug: slug
      },
      include: {
        codeExamples: {
          orderBy: {
            orderIndex: 'asc'
          }
        },
        interactiveExercises: {
          include: {
            exerciseComponents: {
              orderBy: {
                orderIndex: 'asc'
              }
            }
          }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    
    const lesson = await prisma.lesson.update({
      where: {
        slug: slug
      },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        level: body.level,
        duration: body.duration,
        content: body.content,
        prerequisites: body.prerequisites,
        objectives: body.objectives,
        tags: body.tags,
        orderIndex: body.orderIndex
      },
      include: {
        codeExamples: true,
        interactiveExercises: true
      }
    })

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await prisma.lesson.delete({
      where: {
        slug: slug
      }
    })

    return NextResponse.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
}