curl -X PATCH \
  http://localhost:3000/api/properties/681b085250d0315bdabcd10f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTlkM2U0Yjc4NzNhNjUyNWU1NmQ0NSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NjYwNDU1OSwiZXhwIjoxNzQ2NjA4MTU5fQ.3_wkNUhoqjQCIEtPOfPJzy1X2FVQ-m_evbO-3Eb1noA" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Casa actualizada en Rosario",
    "description": "Hermosa casa con jardín y pileta actualizada",
    "location": "Rosario, Argentina",
    "type": "house",
    "bedrooms": 4,
    "images": ["https://a0.muscache.com/im/pictures/hosting/Hosting-1322066881196464817/original/41e8637a-c237-4677-82b6-8c9df2c9e18c.jpeg?im_w=960"],
    "airbnbUrl": "https://www.airbnb.es/"
  }'
