import { ApiPlayground } from '@/components/playground/ApiPlayground'

export default function PlaygroundPage() {
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">API Playground</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test real API endpoints, explore responses, and learn by doing. Try the preset APIs or make your own requests.
          </p>
        </div>
      </div>
      
      <div className="flex-1 bg-white dark:bg-gray-800">
        <ApiPlayground />
      </div>
    </div>
  )
}