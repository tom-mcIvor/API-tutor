import { NotFound } from '@/components/ui/NotFound'

export default function NotFoundPage() {
  return (
    <NotFound 
      title="Lesson Not Found"
      message="The lesson you're looking for doesn't exist or may have been moved to a different section."
      showSearch={true}
    />
  )
}