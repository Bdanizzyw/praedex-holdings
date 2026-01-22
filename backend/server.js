const express = require('express');
const cors = require('cors');
require('dotenv').config();

const properties = require('./data/properties');
const calculateDistance = require('./utils/distanceCalculator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Get all properties (optional: sorted by distance if userLat & userLng provided)
app.get('/api/properties', (req, res) => {
  const { userLat, userLng } = req.query;

  let propertiesWithDistance = properties.map((property) => ({
    ...property,
    distanceFromUser: userLat && userLng
      ? calculateDistance(parseFloat(userLat), parseFloat(userLng), property.lat, property.lng)
      : null,
  }));

  // Sort by distance if user location provided
  if (userLat && userLng) {
    propertiesWithDistance.sort((a, b) => a.distanceFromUser - b.distanceFromUser);
  }

  res.json(propertiesWithDistance);
});

// Get single property by ID
app.get('/api/properties/:id', (req, res) => {
  const property = properties.find((p) => p.id === req.params.id);

  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }

  res.json(property);
});

// Get nearest properties to user location
app.get('/api/properties/nearest/:limit', (req, res) => {
  const { userLat, userLng } = req.query;
  const limit = parseInt(req.params.limit) || 5;

  if (!userLat || !userLng) {
    return res.status(400).json({ error: 'userLat and userLng query parameters required' });
  }

  const propertiesWithDistance = properties.map((property) => ({
    ...property,
    distanceFromUser: calculateDistance(
      parseFloat(userLat),
      parseFloat(userLng),
      property.lat,
      property.lng
    ),
  }));

  propertiesWithDistance.sort((a, b) => a.distanceFromUser - b.distanceFromUser);

  res.json(propertiesWithDistance.slice(0, limit));
});

// Add new property (placeholder for future database integration)
app.post('/api/properties', (req, res) => {
  const { title, price, type, location, lat, lng } = req.body;

  if (!title || !price || !lat || !lng) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newProperty = {
    id: String(properties.length + 1),
    title,
    price,
    distance: location || 'Location pending',
    lat,
    lng,
    description: 'New property listing',
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
  };

  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   GET  /api/properties`);
  console.log(`   GET  /api/properties/:id`);
  console.log(`   GET  /api/properties/nearest/:limit?userLat=40&userLng=-73`);
  console.log(`   POST /api/properties`);
});
