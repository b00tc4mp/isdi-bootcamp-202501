curl -X POST \
  http://localhost:3000/api/properties \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmU2NmFjMDMzNjU1ODUyNTM0MDBmYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NjA5MTE3MiwiZXhwIjoxNzQ2MDk0NzcyfQ.k8IzO-EcUoBj3wVrcMu8uO5tnDToazff2V244dKUwRk" \
  -H "Content-Type: application/json" \
  -d ' {
    "title": "Casa antigua restaurada con encanto",
    "description": "Casa antigua completamente restaurada, conservando su encanto original.",
    "location": "Refinería, Rosario, Argentina",
    "type": "house",
    "bedrooms": 2,
    "images": ["https://a0.muscache.com/im/pictures/d6ff4252-aab5-4c82-b356-d293a464cba5.jpg?im_w=720"],
    "airbnbUrl": "https://airbnb.com/casa-antigua-refineria"
  }' -v