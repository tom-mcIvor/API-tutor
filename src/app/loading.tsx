import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner 
        size="lg" 
        text="Loading lesson content..."
        color="primary"
      />
    </div>
  )
}