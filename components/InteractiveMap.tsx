'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression, icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Property, propertiesAndHotels } from '@/lib/data'
import { getUserLocation, Coordinates } from '@/lib/gpsService'

const propertyIcon = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const hotelIcon = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-purple.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const landIcon = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapProps {
  filter: 'all' | 'properties' | 'hotels' | 'land'
}

export function InteractiveMap({ filter }: MapProps) {
  const [userLocation, setUserLocation] = useState<LatLngExpression>([40.7128, -74.006])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Try to get user's real location
    const getLocation = async () => {
      try {
        const location = await getUserLocation()
        setUserLocation([location.latitude, location.longitude])
      } catch (err) {
        // Fallback to NYC coordinates
        console.log('Using default NYC coordinates')
        setUserLocation([40.7128, -74.006])
      } finally {
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return hotelIcon
      case 'land':
        return landIcon
      default:
        return propertyIcon
    }
  }

  const filteredItems = propertiesAndHotels.filter((item) => {
    if (filter === 'all') return true
    return item.type === filter
  })

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-600">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location Marker */}
        <Marker position={userLocation} icon={propertyIcon}>
          <Popup>
            <div className="font-bold">📍 Your Location</div>
          </Popup>
        </Marker>

        {/* Property/Hotel/Land Markers */}
        {filteredItems.map((item) => (
          <Marker
            key={item.id}
            position={[item.location.lat, item.location.lng]}
            icon={getIcon(item.type)}
          >
            <Popup>
              <div className="w-56">
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{item.location.address}</p>
                <p className="font-bold text-blue-600 mb-2">
                  ${item.price.toLocaleString()}
                </p>
                {item.rating && (
                  <p className="text-xs text-yellow-500 mb-2">
                    ⭐ {item.rating} ({item.reviews} reviews)
                  </p>
                )}
                <p className="text-xs text-gray-700">{item.description}</p>
                <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-xs font-semibold hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
