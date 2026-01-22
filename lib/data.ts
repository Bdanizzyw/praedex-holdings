// Combined data file with properties AND hotels with GPS coordinates

export interface Property {
  id: string
  type: 'property' | 'hotel'
  title: string
  price: number
  location: {
    lat: number
    lng: number
    address: string
  }
  description: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  amenities?: string[]
  rating?: number
  reviews?: number
}

export const propertiesAndHotels: Property[] = [
  // PROPERTIES
  {
    id: 'prop-1',
    type: 'property',
    title: 'Luxury Downtown Apartment',
    price: 850000,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: '123 Main St, Downtown',
    },
    description:
      'Stunning 3-bedroom luxury apartment in the heart of downtown. Features floor-to-ceiling windows, high-end finishes.',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    amenities: ['Pool', 'Gym', 'Rooftop', 'Concierge'],
  },
  {
    id: 'prop-2',
    type: 'property',
    title: 'Suburban Family Home',
    price: 620000,
    location: {
      lat: 40.758,
      lng: -73.9855,
      address: '456 Park Ave, Midtown',
    },
    description:
      'Beautiful 4-bedroom family home in a peaceful suburban community with modern kitchen.',
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2200,
    amenities: ['Garden', 'Garage', 'Playground'],
  },
  {
    id: 'prop-3',
    type: 'property',
    title: 'Modern Studio',
    price: 420000,
    location: {
      lat: 40.7489,
      lng: -73.968,
      address: '789 5th Ave, Upper East Side',
    },
    description:
      'Sleek studio apartment ideal for young professionals. Contemporary design, in-unit washer/dryer.',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    amenities: ['Gym', 'WiFi', 'Laundry'],
  },
  {
    id: 'prop-4',
    type: 'property',
    title: 'Executive Penthouse',
    price: 1200000,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '1000 Park Ave South, Flatiron',
    },
    description:
      'Ultra-premium penthouse with panoramic city views and private rooftop terrace.',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3500,
    amenities: ['Rooftop', 'Smart Home', 'Private Elevator'],
  },
  {
    id: 'prop-5',
    type: 'property',
    title: 'Cozy Townhouse',
    price: 550000,
    location: {
      lat: 40.7282,
      lng: -73.7949,
      address: '234 Queens Blvd, Forest Hills',
    },
    description:
      'Charming 2-bedroom townhouse with modern updates. Includes garage and small garden.',
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: 1200,
    amenities: ['Garage', 'Garden', 'Parking'],
  },
  {
    id: 'prop-6',
    type: 'property',
    title: 'Beachfront Villa',
    price: 1500000,
    location: {
      lat: 40.5731,
      lng: -73.9712,
      address: '567 Beach Road, Coney Island',
    },
    description:
      'Exclusive beachfront villa with direct ocean access and luxury finishes.',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4000,
    amenities: ['Beach Access', 'Pool', 'Private Dock'],
  },

  // HOTELS
  {
    id: 'hotel-1',
    type: 'hotel',
    title: '⭐ The Plaza Hotel',
    price: 450,
    location: {
      lat: 40.7647,
      lng: -73.9776,
      address: '768 5th Avenue, Manhattan',
    },
    description:
      'Iconic luxury hotel with world-class service, premium rooms, and fine dining.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Spa', 'Restaurant', 'Room Service', 'WiFi'],
    rating: 4.8,
    reviews: 2350,
  },
  {
    id: 'hotel-2',
    type: 'hotel',
    title: '⭐⭐ Modern Times Hotel',
    price: 280,
    location: {
      lat: 40.7549,
      lng: -73.9841,
      address: '42 W 44th St, Times Square',
    },
    description:
      'Contemporary boutique hotel in the heart of Times Square with rooftop views.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Rooftop Bar', 'Gym', 'Lounge'],
    rating: 4.6,
    reviews: 1890,
  },
  {
    id: 'hotel-3',
    type: 'hotel',
    title: '⭐ Riverside Luxury Inn',
    price: 520,
    location: {
      lat: 40.7505,
      lng: -74.0072,
      address: '1 Riverside Drive, Upper West Side',
    },
    description:
      'Premium waterfront hotel with Hudson River views, spa, and fine dining.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Spa', 'Restaurant', 'River Views', 'Concierge'],
    rating: 4.9,
    reviews: 3100,
  },
  {
    id: 'hotel-4',
    type: 'hotel',
    title: '⭐⭐ Budget Comfort Stay',
    price: 120,
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '200 Lexington Ave, Gramercy',
    },
    description:
      'Affordable, clean, and comfortable hotel perfect for budget travelers.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Breakfast', 'TV'],
    rating: 4.2,
    reviews: 1540,
  },
  {
    id: 'hotel-5',
    type: 'hotel',
    title: '⭐⭐ Downtown Boutique',
    price: 380,
    location: {
      lat: 40.7165,
      lng: -74.0043,
      address: '100 Chambers St, Tribeca',
    },
    description:
      'Trendy boutique hotel in Tribeca with modern design and vibrant atmosphere.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Bar', 'Lounge', 'Modern Design'],
    rating: 4.7,
    reviews: 2100,
  },
  {
    id: 'hotel-6',
    type: 'hotel',
    title: '⭐ Sunset Beach Resort',
    price: 650,
    location: {
      lat: 40.5731,
      lng: -73.9712,
      address: '888 Beach Boulevard, Coney Island',
    },
    description:
      'All-inclusive beach resort with water sports, restaurants, and ocean views.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Beach', 'Water Sports', 'Restaurant', 'Pool'],
    rating: 4.8,
    reviews: 2750,
  },
]
