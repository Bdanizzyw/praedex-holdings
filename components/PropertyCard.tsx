// Create a PropertyCard component that accepts props: id, title, price, distance.
// Click navigates to /properties/[id]. Use Tailwind for a card UI with hover effects.

import React from 'react'
import Link from 'next/link'

interface PropertyCardProps {
  id: string
  title: string
  price: number
  distance: string
}

export function PropertyCard({ id, title, price, distance }: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
        {/* Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-white text-4xl">🏠</span>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            ${price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            📍 {distance}
          </p>
        </div>
      </div>
    </Link>
  )
}
