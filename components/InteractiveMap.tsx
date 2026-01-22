'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Property, propertiesAndHotels } from '@/lib/data'
import { Coordinates } from '@/lib/gpsService'

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-200 flex items-center justify-center">Loading map...</div> }
)

interface InteractiveMapProps {
  filter: 'all' | 'properties' | 'hotels' | 'land'
}

export function InteractiveMap({ filter }: InteractiveMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-96 bg-gray-200 flex items-center justify-center">Loading map...</div>
  }

  const filteredItems = propertiesAndHotels.filter((item) => {
    if (filter === 'all') return true
    return item.type === filter
  })

  return <MapComponent items={filteredItems} />
}
