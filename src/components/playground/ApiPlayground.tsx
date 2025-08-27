'use client'

import { useState } from 'react'
import { Play, Copy, Download, History, BookOpen, Code2 } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers: Record<string, string>
  body?: string
}

interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  duration: number
  timestamp: string
}

interface HistoryItem {
  id: string
  request: ApiRequest
  response?: ApiResponse
  timestamp: string
}

const PRESET_APIS = [
  {
    name: 'JSONPlaceholder - Users',
    method: 'GET' as const,
    url: 'https://jsonplaceholder.typicode.com/users',
    description: 'Get list of users'
  },
  {
    name: 'JSONPlaceholder - Posts',
    method: 'GET' as const,
    url: 'https://jsonplaceholder.typicode.com/posts',
    description: 'Get list of posts'
  },
  {
    name: 'REST Countries',
    method: 'GET' as const,
    url: 'https://restcountries.com/v3.1/name/canada',
    description: 'Get country information'
  },
  {
    name: 'Cat Facts API',
    method: 'GET' as const,
    url: 'https://catfact.ninja/fact',
    description: 'Get random cat fact'
  }
]

export function ApiPlayground() {
  const [request, setRequest] = useState<ApiRequest>({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [activeTab, setActiveTab] = useState<'request' | 'response' | 'history'>('request')

  const makeRequest = async () => {
    setIsLoading(true)
    const startTime = Date.now()
    
    try {
      const requestOptions: RequestInit = {
        method: request.method,
        headers: request.headers
      }

      if (request.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        requestOptions.body = request.body
      }

      const fetchResponse = await fetch(request.url, requestOptions)
      const duration = Date.now() - startTime
      
      let data
      const contentType = fetchResponse.headers.get('content-type')
      
      if (contentType?.includes('application/json')) {
        data = await fetchResponse.json()
      } else {
        data = await fetchResponse.text()
      }

      const responseHeaders: Record<string, string> = {}
      fetchResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      const apiResponse: ApiResponse = {
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: responseHeaders,
        data,
        duration,
        timestamp: new Date().toISOString()
      }

      setResponse(apiResponse)
      setActiveTab('response')

      // Add to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        request: { ...request },
        response: apiResponse,
        timestamp: new Date().toISOString()
      }

      setHistory(prev => [historyItem, ...prev.slice(0, 9)]) // Keep last 10 requests

    } catch (error) {
      const duration = Date.now() - startTime
      const errorResponse: ApiResponse = {
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        duration,
        timestamp: new Date().toISOString()
      }
      
      setResponse(errorResponse)
      setActiveTab('response')
    } finally {
      setIsLoading(false)
    }
  }

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
    }
  }

  const loadPreset = (preset: typeof PRESET_APIS[0]) => {
    setRequest({
      ...request,
      method: preset.method,
      url: preset.url
    })
  }

  const loadFromHistory = (item: HistoryItem) => {
    setRequest(item.request)
    setResponse(item.response || null)
    setActiveTab(item.response ? 'response' : 'request')
  }

  const addHeader = () => {
    setRequest({
      ...request,
      headers: { ...request.headers, '': '' }
    })
  }

  const updateHeader = (oldKey: string, newKey: string, value: string) => {
    const newHeaders = { ...request.headers }
    if (oldKey !== newKey) {
      delete newHeaders[oldKey]
    }
    newHeaders[newKey] = value
    setRequest({ ...request, headers: newHeaders })
  }

  const removeHeader = (key: string) => {
    const newHeaders = { ...request.headers }
    delete newHeaders[key]
    setRequest({ ...request, headers: newHeaders })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={() => setActiveTab('request')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'request'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:bg-primary-900/20'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          Request
        </button>
        <button
          onClick={() => setActiveTab('response')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'response'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:bg-primary-900/20'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          Response
          {response && (
            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
              response.status >= 200 && response.status < 300
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                : response.status >= 400
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {response.status}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'history'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:bg-primary-900/20'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <History className="w-4 h-4 inline mr-1" />
          History ({history.length})
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Request Tab */}
        {activeTab === 'request' && (
          <div className="p-6 space-y-6">
            {/* Preset APIs */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 dark:text-white">Try These APIs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PRESET_APIS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => loadPreset(preset)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors dark:border-gray-600 dark:hover:border-primary-400 dark:hover:bg-primary-900/20"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{preset.name}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        preset.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {preset.method}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{preset.description}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate dark:text-gray-500">{preset.url}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Request Configuration */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={request.method}
                  onChange={(e) => setRequest({ ...request, method: e.target.value as ApiRequest['method'] })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
                <input
                  type="url"
                  value={request.url}
                  onChange={(e) => setRequest({ ...request, url: e.target.value })}
                  placeholder="https://api.example.com/endpoint"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
                <button
                  onClick={makeRequest}
                  disabled={!request.url || isLoading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isLoading ? <LoadingSpinner size="sm" color="white" /> : <Play className="w-4 h-4" />}
                  <span>Send</span>
                </button>
              </div>

              {/* Headers */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Headers</h3>
                  <button
                    onClick={addHeader}
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    Add Header
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(request.headers).map(([key, value], index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => updateHeader(key, e.target.value, value)}
                        placeholder="Header name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateHeader(key, key, e.target.value)}
                        placeholder="Header value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <button
                        onClick={() => removeHeader(key)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-red-900/20"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Body */}
              {['POST', 'PUT', 'PATCH'].includes(request.method) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 dark:text-white">Request Body</h3>
                  <textarea
                    value={request.body || ''}
                    onChange={(e) => setRequest({ ...request, body: e.target.value })}
                    placeholder='{"key": "value"}'
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Response Tab */}
        {activeTab === 'response' && (
          <div className="p-6">
            {response ? (
              <div className="space-y-6">
                {/* Response Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      response.status >= 200 && response.status < 300
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                        : response.status >= 400
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {response.status} {response.statusText}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {response.duration}ms
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyResponse}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                      title="Copy response"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Response Headers */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 dark:text-white">Response Headers</h3>
                  <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm dark:bg-gray-800">
                    {Object.entries(response.headers).map(([key, value], index) => (
                      <div key={index} className="flex">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">{key}:</span>
                        <span className="text-gray-700 dark:text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Body */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 dark:text-white">Response Body</h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                    <pre className="text-green-400 text-sm font-mono">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">No Response Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Send a request to see the API response here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="p-6">
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors dark:border-gray-600 dark:hover:border-primary-400 dark:hover:bg-primary-900/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs rounded ${
                          item.request.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.request.method}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white truncate">
                          {item.request.url}
                        </span>
                      </div>
                      {item.response && (
                        <span className={`px-2 py-1 text-xs rounded ${
                          item.response.status >= 200 && item.response.status < 300
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {item.response.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">No History Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your API request history will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}