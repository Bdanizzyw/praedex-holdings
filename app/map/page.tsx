'use client'

import { useState, useEffect } from 'react'
import { propertiesAndHotels, Property } from '@/lib/data'
import { calculateDistance, Coordinates, getUserLocation } from '@/lib/gpsService'

export default function MapPage() {
  const [filter, setFilter] = useState<'all' | 'property' | 'hotel' | 'land' | 'shortlet'>('all')
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude: 40.7128,
    longitude: -74.006,
  })
  const [nearbyItems, setNearbyItems] = useState<(Property & { distance?: number })[]>([])
  const [selectedItem, setSelectedItem] = useState<Property | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [userLocationDetected, setUserLocationDetected] = useState(false)

  // Calculate nearby items on mount
  useEffect(() => {
    const itemsWithDistance = propertiesAndHotels.map((item) => ({
      ...item,
      distance: calculateDistance(userLocation, item.location),
    }))

    // Sort by distance
    itemsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    setNearbyItems(itemsWithDistance)
    
    // Auto-select the closest item
    if (itemsWithDistance.length > 0) {
      setSelectedItem(itemsWithDistance[0])
    }
  }, [userLocation])

  // Handle Find Near Me button
  const handleFindNearMe = async () => {
    setLoading(true)
    try {
      const location = await getUserLocation()
      setUserLocation(location)
      setUserLocationDetected(true)
    } catch (error) {
      console.error('Error getting location:', error)
      alert('Could not get your location. Please enable GPS and try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = nearbyItems.filter((item) => {
    const matchesType = filter === 'all' || item.type === filter
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'property': return '🏠'
      case 'hotel': return '🏨'
      case 'land': return '🏞️'
      case 'shortlet': return '🏢'
      default: return '📍'
    }
  }

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-gray-50">
      {/* LEFT SIDE - Listings Panel (MVP Style - Like Uber) */}
      <div className="w-full md:w-96 bg-white shadow-xl z-10 flex flex-col overflow-hidden">
        {/* Header with Location Info */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold">Praedex</h1>
            {userLocationDetected && <span className="text-xs bg-green-400 px-2 py-1 rounded-full">📍 Live</span>}
          </div>
          
          <button
            onClick={handleFindNearMe}
            disabled={loading}
            className="w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-gray-100 transition disabled:opacity-50 mb-3 flex items-center justify-center gap-2"
          >
            {loading ? '🔄 Finding...' : '📍 Find Near Me'}
          </button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search apartments, hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-3 border-b flex gap-2 overflow-x-auto bg-gray-50">
          {[
            { id: 'all', label: 'All', icon: '📍' },
            { id: 'property', label: 'Apartments', icon: '🏠' },
            { id: 'hotel', label: 'Hotels', icon: '🏨' },
            { id: 'shortlet', label: 'Shortlets', icon: '🏢' },
            { id: 'land', label: 'Land', icon: '🏞️' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                filter === btn.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>

        {/* Listings Count */}
        <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b">
          {filteredItems.length} results found
        </div>

        {/* Listings */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <p className="text-2xl mb-2">🔍</p>
              <p>No properties found</p>
              <p className="text-xs mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 border-b cursor-pointer transition hover:bg-blue-50 ${
                  selectedItem?.id === item.id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-xl">{getTypeIcon(item.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-xs mt-0.5">{item.location.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">
                      {item.distance?.toFixed(1)}km
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 px-7">
                  <p className="font-bold text-blue-600 text-sm">
                    ${item.price.toLocaleString()}
                    {item.type === 'hotel' || item.type === 'shortlet' ? '/night' : ''}
                  </p>
                  {item.rating && (
                    <span className="text-xs text-yellow-500 font-semibold">⭐ {item.rating}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Map with Selected Property Card */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center relative overflow-hidden">
        {/* Map Background with User Location */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center pointer-events-none">
            <div className="text-8xl mb-4 animate-pulse">🗺️</div>
            <p className="text-gray-600 text-xl font-semibold">Property Map View</p>
            <p className="text-gray-500 text-sm mt-2">
              {userLocationDetected ? '📍 Your location detected' : 'Click Find Near Me to see nearby properties'}
            </p>
          </div>
        </div>

        {/* User Location Indicator */}
        {userLocationDetected && (
          <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Your Location
          </div>
        )}

        {/* Selected Item Info Card - MVP Style */}
        {selectedItem && (
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-200 transition-all duration-300">
            {/* Property Type Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getTypeIcon(selectedItem.type)}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold uppercase">
                {selectedItem.type}
              </span>
            </div>

            {/* Property Title */}
            <h3 className="font-bold text-xl mb-2 text-gray-900">{selectedItem.title}</h3>

            {/* Price and Rating */}
            <div className="flex justify-between items-center mb-3">
              <p className="text-blue-600 font-bold text-lg">
                ${selectedItem.price.toLocaleString()}
                <span className="text-sm text-gray-600 ml-1">
                  {selectedItem.type === 'hotel' || selectedItem.type === 'shortlet' ? '/night' : 'total'}
                </span>
              </p>
              {selectedItem.rating && (
                <span className="text-lg">⭐ {selectedItem.rating} ({selectedItem.reviews} reviews)</span>
              )}
            </div>

            {/* Address with Distance */}
            <div className="mb-3 flex items-start gap-2 text-sm text-gray-600">
              <span>📍</span>
              <div>
                <p>{selectedItem.location.address}</p>
                <p className="text-blue-600 font-semibold mt-1">
                  {selectedItem.distance?.toFixed(1)}km away
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{selectedItem.description}</p>

            {/* Amenities */}
            {selectedItem.amenities && selectedItem.amenities.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedItem.amenities.slice(0, 3).map((amenity, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(selectedItem.location.address)}/@${selectedItem.location.lat},${selectedItem.location.lng},15z`
                  window.open(mapsUrl, '_blank')
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2"
              >
                📍 Directions
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md flex items-center justify-center gap-2">
                📞 Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
