// API Service for Praedex Holdings Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Property {
  id: string;
  title: string;
  price: number;
  distance: string;
  lat: number;
  lng: number;
  distanceFromUser?: number;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
}

// Get all properties (optionally sorted by distance)
export const getProperties = async (
  userLat?: number,
  userLng?: number
): Promise<Property[]> => {
  try {
    const params = new URLSearchParams();
    if (userLat !== undefined && userLng !== undefined) {
      params.append('userLat', userLat.toString());
      params.append('userLng', userLng.toString());
    }

    const response = await fetch(
      `${API_BASE_URL}/properties${params.toString() ? '?' + params.toString() : ''}`
    );
    if (!response.ok) throw new Error('Failed to fetch properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Get single property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    if (!response.ok) throw new Error('Property not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};

// Get nearest properties to user location
export const getNearestProperties = async (
  userLat: number,
  userLng: number,
  limit: number = 5
): Promise<Property[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/properties/nearest/${limit}?userLat=${userLat}&userLng=${userLng}`
    );
    if (!response.ok) throw new Error('Failed to fetch nearest properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching nearest properties:', error);
    return [];
  }
};

// Add new property
export const addProperty = async (propertyData: {
  title: string;
  price: number;
  type: string;
  location: string;
  lat: number;
  lng: number;
}): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    if (!response.ok) throw new Error('Failed to add property');
    return await response.json();
  } catch (error) {
    console.error('Error adding property:', error);
    return null;
  }
};
