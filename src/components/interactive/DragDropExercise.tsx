'use client'

import { useState, useRef } from 'react'
import { Check, Move } from 'lucide-react'
import { DragDropExercise as DragDropExerciseType } from '@/types'

interface DragDropExerciseProps {
  exercise: DragDropExerciseType
  onSubmit: (answer: any, isCorrect: boolean, partialScore?: number) => void
  disabled?: boolean
}

export function DragDropExercise({ 
  exercise, 
  onSubmit, 
  disabled = false 
}: DragDropExerciseProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dropZoneItems, setDropZoneItems] = useState<Record<string, string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const dragCounter = useRef(0)

  // Initialize drop zones
  useState(() => {
    const initialDropZones: Record<string, string[]> = {}
    exercise.dropZones.forEach(zone => {
      initialDropZones[zone.id] = []
    })
    setDropZoneItems(initialDropZones)
  })

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (disabled) return
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', itemId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    dragCounter.current = 0
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
  }

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--
  }

  const handleDrop = (e: React.DragEvent, dropZoneId: string) => {
    e.preventDefault()
    dragCounter.current = 0
    
    if (!draggedItem || disabled) return

    const dropZone = exercise.dropZones.find(zone => zone.id === dropZoneId)
    if (!dropZone) return

    // Check if drop zone accepts this item category
    const item = exercise.items.find(i => i.id === draggedItem)
    if (dropZone.acceptsCategory && item?.category && dropZone.acceptsCategory !== item.category) {
      return
    }

    // Check if drop zone has space
    if (dropZone.maxItems && dropZoneItems[dropZoneId].length >= dropZone.maxItems) {
      return
    }

    // Remove item from other drop zones
    const newDropZoneItems = { ...dropZoneItems }
    Object.keys(newDropZoneItems).forEach(zoneId => {
      newDropZoneItems[zoneId] = newDropZoneItems[zoneId].filter(id => id !== draggedItem)
    })

    // Add item to target drop zone
    newDropZoneItems[dropZoneId] = [...newDropZoneItems[dropZoneId], draggedItem]
    setDropZoneItems(newDropZoneItems)
    setDraggedItem(null)
  }

  const removeItemFromDropZone = (itemId: string, dropZoneId: string) => {
    if (disabled) return
    
    setDropZoneItems(prev => ({
      ...prev,
      [dropZoneId]: prev[dropZoneId].filter(id => id !== itemId)
    }))
  }

  const getAvailableItems = () => {
    const placedItems = Object.values(dropZoneItems).flat()
    return exercise.items.filter(item => !placedItems.includes(item.id))
  }

  const handleSubmit = () => {
    const itemResults: Record<string, boolean> = {}
    let correctCount = 0

    // Check each item placement
    Object.entries(exercise.correctMapping).forEach(([itemId, correctDropZoneId]) => {
      const actualDropZoneId = Object.entries(dropZoneItems).find(([zoneId, items]) => 
        items.includes(itemId)
      )?.[0]
      
      const isCorrect = actualDropZoneId === correctDropZoneId
      itemResults[itemId] = isCorrect
      if (isCorrect) correctCount++
    })

    setResults(itemResults)
    setShowResults(true)

    const totalItems = Object.keys(exercise.correctMapping).length
    const isFullyCorrect = correctCount === totalItems
    const partialScore = Math.floor((correctCount / totalItems) * exercise.points)

    onSubmit(dropZoneItems, isFullyCorrect, partialScore)
  }

  const getItemStyle = (itemId: string) => {
    let baseStyle = `
      p-3 bg-white dark:bg-gray-700 border-2 rounded-lg cursor-move
      transition-all duration-200 select-none
    `

    if (showResults && results[itemId] !== undefined) {
      baseStyle += results[itemId] 
        ? ' border-green-500 bg-green-50 dark:bg-green-900/20'
        : ' border-red-500 bg-red-50 dark:bg-red-900/20'
    } else if (draggedItem === itemId) {
      baseStyle += ' border-blue-500 bg-blue-50 dark:bg-blue-900/20 opacity-50'
    } else {
      baseStyle += ' border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }

    if (disabled) {
      baseStyle += ' cursor-not-allowed opacity-50'
    }

    return baseStyle.trim()
  }

  const getDropZoneStyle = (dropZoneId: string) => {
    let baseStyle = `
      min-h-[100px] p-4 border-2 border-dashed rounded-lg
      transition-all duration-200
    `

    if (draggedItem && !disabled) {
      const dropZone = exercise.dropZones.find(zone => zone.id === dropZoneId)
      const item = exercise.items.find(i => i.id === draggedItem)
      const canAccept = !dropZone?.acceptsCategory || 
                       (item?.category && dropZone.acceptsCategory === item.category)
      const hasSpace = !dropZone?.maxItems || 
                      dropZoneItems[dropZoneId].length < dropZone.maxItems

      if (canAccept && hasSpace) {
        baseStyle += ' border-blue-400 bg-blue-50 dark:bg-blue-900/20'
      } else {
        baseStyle += ' border-red-400 bg-red-50 dark:bg-red-900/20'
      }
    } else {
      baseStyle += ' border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
    }

    return baseStyle.trim()
  }

  const allItemsPlaced = getAvailableItems().length === 0

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Instructions:
        </h4>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          {exercise.instruction}
        </p>
      </div>

      {/* Available Items */}
      {getAvailableItems().length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Available Items:
          </h4>
          <div className="flex flex-wrap gap-3">
            {getAvailableItems().map(item => (
              <div
                key={item.id}
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragEnd={handleDragEnd}
                className={getItemStyle(item.id)}
              >
                <div className="flex items-center space-x-2">
                  <Move className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {item.content}
                  </span>
                  {item.category && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drop Zones */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Drop Zones:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercise.dropZones.map(dropZone => (
            <div key={dropZone.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {dropZone.label}
                </h5>
                {dropZone.maxItems && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {dropZoneItems[dropZone.id].length}/{dropZone.maxItems}
                  </span>
                )}
              </div>
              
              <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, dropZone.id)}
                className={getDropZoneStyle(dropZone.id)}
              >
                {dropZoneItems[dropZone.id].length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    <span className="text-sm">Drop items here</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dropZoneItems[dropZone.id].map(itemId => {
                      const item = exercise.items.find(i => i.id === itemId)
                      if (!item) return null
                      
                      return (
                        <div
                          key={itemId}
                          className={`${getItemStyle(itemId)} cursor-default`}
                          onClick={() => removeItemFromDropZone(itemId, dropZone.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {item.content}
                            </span>
                            {!disabled && !showResults && (
                              <button className="text-red-500 hover:text-red-700 text-xs">
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Results:
          </h4>
          <div className="space-y-2">
            {Object.entries(exercise.correctMapping).map(([itemId, correctDropZoneId]) => {
              const item = exercise.items.find(i => i.id === itemId)
              const correctDropZone = exercise.dropZones.find(z => z.id === correctDropZoneId)
              const isCorrect = results[itemId]
              
              return (
                <div key={itemId} className="flex items-center space-x-2 text-sm">
                  <div className={`w-4 h-4 rounded-full ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">
                    "{item?.content}" should be in "{correctDropZone?.label}"
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!showResults && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allItemsPlaced || disabled}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Submit Answer</span>
          </button>
        </div>
      )}
    </div>
  )
}