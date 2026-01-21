// Build a properties listing page using mock data.
// Render a grid of PropertyCard components.
// Include a simple heading "Properties Near You".

import React from 'react'
import { PropertyCard } from '@/components/PropertyCard'

const mockProperties = [
  { id: '1', title: 'Luxury Downtown Apartment', price: 850000, distance: '2.5 km from city center' },
  { id: '2', title: 'Suburban Family Home', price: 620000, distance: '15 km from city center' },
  { id: '3', title: 'Modern Studio', price: 420000, distance: '1.2 km from city center' },
  { id: '4', title: 'Executive Penthouse', price: 1200000, distance: '3 km from city center' },
  { id: '5', title: 'Cozy Townhouse', price: 550000, distance: '8 km from city center' },
  { id: '6', title: 'Beachfront Villa', price: 1500000, distance: '20 km from city center' },
]

export default function PropertiesPage() {
  return (
    <main>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Properties Near You</h1>
          <p className="text-gray-600 mb-8">
            Explore {mockProperties.length} verified investment properties
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                distance={property.distance}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
