// GPS Service for getting user location and calculating distances

export interface Location {
  lat: number
  lng: number
}

export interface Coordinates {
  latitude: number
  longitude: number
}

// Haversine formula to calculate distance between two points (in km)
export function calculateDistance(
  userLoc: Coordinates,
  propertyLoc: Location
): number {
  const R = 6371 // Earth's radius in km
  const dLat = (propertyLoc.lat - userLoc.latitude) * (Math.PI / 180)
  const dLng = (propertyLoc.lng - userLoc.longitude) * (Math.PI / 180)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLoc.latitude * (Math.PI / 180)) *
      Math.cos(propertyLoc.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return parseFloat(distance.toFixed(2))
}

// Get user's current location via GPS
export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

// Generate Google Maps directions URL
export function getDirectionsUrl(
  destination: Location,
  destinationName: string
): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}&destination_place_id=${destinationName}`
}
