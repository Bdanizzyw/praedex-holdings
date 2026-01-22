'use client'

import { useState, useEffect } from 'react'
import { propertiesAndHotels, Property } from '@/lib/data'
import { calculateDistance, Coordinates } from '@/lib/gpsService'

export default function MapPage() {
  const [filter, setFilter] = useState<'all' | 'property' | 'hotel' | 'land' | 'shortlet'>('all')
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude: 40.7128,
    longitude: -74.006,
  })
  const [nearbyItems, setNearbyItems] = useState<(Property & { distance?: number })[]>([])
  const [selectedItem, setSelectedItem] = useState<Property | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate nearby items on mount
  useEffect(() => {
    const itemsWithDistance = propertiesAndHotels.map((item) => ({
      ...item,
      distance: calculateDistance(userLocation, item.location),
    }))

    // Sort by distance
    itemsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    setNearbyItems(itemsWithDistance)
  }, [userLocation])

  const filteredItems = nearbyItems.filter((item) => {
    const matchesType = filter === 'all' || item.type === filter
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <main className="h-screen w-screen flex overflow-hidden">
      {/* LEFT SIDE - Listings Panel (Like Uber) */}
      <div className="w-full md:w-96 bg-white shadow-lg z-10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold mb-4">Praedex Holdings</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search properties, hotels, land..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
          />

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All', icon: '📍' },
              { id: 'property', label: '🏠 Apt', icon: '🏠' },
              { id: 'hotel', label: '🏨 Hotel', icon: '🏨' },
              { id: 'shortlet', label: '🏢 Short', icon: '🏢' },
              { id: 'land', label: '🏞️ Land', icon: '🏞️' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  filter === btn.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 border-b cursor-pointer transition hover:bg-gray-50 ${
                  selectedItem?.id === item.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm flex-1">{item.title}</h3>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {item.distance?.toFixed(1)}km
                  </span>
                </div>

                <p className="text-gray-600 text-xs mb-2">{item.location.address}</p>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-blue-600">
                    ${item.price.toLocaleString()}
                    {item.type === 'hotel' || item.type === 'shortlet' ? '/night' : ''}
                  </p>
                  {item.rating && (
                    <span className="text-xs text-yellow-500">⭐ {item.rating}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Map Placeholder */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center relative">
        {/* Map Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-gray-600 text-lg">Interactive Map</p>
            <p className="text-gray-500 text-sm mt-2">Leaflet map loads here</p>
          </div>
        </div>

        {/* Selected Item Info Card */}
        {selectedItem && (
          <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 w-80">
            <h3 className="font-bold text-lg mb-2">{selectedItem.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{selectedItem.location.address}</p>
            <p className="text-blue-600 font-bold mb-2">
              ${selectedItem.price.toLocaleString()}
              {selectedItem.type === 'hotel' || selectedItem.type === 'shortlet' ? '/night' : ''}
            </p>
            <p className="text-gray-700 text-sm mb-3">{selectedItem.description}</p>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                📍 Directions
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">
                📞 Call
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
