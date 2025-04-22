curl -X PATCH \
  http://localhost:3000/api/properties/6807c39eae7c098758e86e7c \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDdjMWM2YWU3YzA5ODc1OGU4NmU3MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTMzOTk4OSwiZXhwIjoxNzQ1MzQzNTg5fQ.OxkMJK0vlomxNkvQyBUNkfLsR87eHBpDU3G4p6FYDTc" \
  -H "Content-Type: application/json" \
  -d '{
    "property": {
      "title": "Casa actualizada en Rosario",
      "description": "Hermosa casa con jardín y pileta actualizada",
      "price": 200000,
      "location": "Rosario, Argentina",
      "type": "house",
      "bedrooms": 4,
      "images": ["https://example.com/image1-updated.jpg", "https://example.com/image2-updated.jpg"],
      "airbnbUrl": "https://airbnb.com/example-updated"
    }
  }'
