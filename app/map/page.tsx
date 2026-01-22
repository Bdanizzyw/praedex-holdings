'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const InteractiveMap = dynamic(
  () => import('@/components/InteractiveMap').then((mod) => ({ default: mod.InteractiveMap })),
  { ssr: false, loading: () => <div className="h-96 bg-gray-200 flex items-center justify-center">Loading map...</div> }
)

export default function MapPage() {
  const [filter, setFilter] = useState<'all' | 'properties' | 'hotels' | 'land'>('all')

  return (
    <main>
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">🗺️ Live Map</h1>
          <p className="text-gray-600 mb-6">
            Discover available apartments, hotels, and land near your location in real-time
          </p>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setFilter('properties')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'properties'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏠 Apartments
            </button>
            <button
              onClick={() => setFilter('hotels')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'hotels'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏨 Hotels
            </button>
            <button
              onClick={() => setFilter('land')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'land'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏞️ Land
            </button>
          </div>

          {/* Map */}
          <InteractiveMap filter={filter} />

          {/* Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-3">📍 Map Legend</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span>🏠 Apartments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                <span>🏨 Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span>🏞️ Land</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              💡 Click on any marker to see details and available amenities
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
