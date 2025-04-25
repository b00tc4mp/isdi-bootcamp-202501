curl -X POST \
  http://localhost:3000/api/properties \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGI2ZjBlMWY2Njc4OGNiYjAxODAxMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTU3OTc5NSwiZXhwIjoxNzQ1NTgzMzk1fQ.LxYtLrbuw5M-0BdhatXUfXbgfOsYXBcw7yUv06roKes" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "loft",
    "description": "loft departamento en el centro de Rosario",
    "price": 150000,
    "location": "loft, Argentina",
    "type": "house",
    "bedrooms": 3,
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "airbnbUrl": "https://airbnb.com/example"
  }' -v