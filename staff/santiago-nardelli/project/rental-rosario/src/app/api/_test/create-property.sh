curl -X POST \
  http://localhost:3000/api/properties \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDdjMWM2YWU3YzA5ODc1OGU4NmU3MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTMzODg1NSwiZXhwIjoxNzQ1MzQyNDU1fQ.dbcTg409K1QyhbsGA2xqAy-ZOOsY5KsLZyIbFfHmsTw" \
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