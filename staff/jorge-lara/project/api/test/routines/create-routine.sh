curl -X POST http://localhost:8080/routines \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODJlMzFlNzk3Zjc1M2ZjM2QzZDIyYjYiLCJpYXQiOjE3NDg1NDE0NTAsImV4cCI6MTc0ODU0NTA1MH0.mGKfYZ5BZx0Bcuox9yEZuWRb0l2wot0bGwwLwaYQsHg" \
    -d '{
        "title": "Strenght routine",
        "description": "test routine",
        "duration": 60,
        "difficulty": "easy",
        "category": "strength",
        "type": "Full-body",
        "exercises": ["682e31e797f753fc3d3d22b9"],
        "startDate": "2025-06-01",
        "endDate": "2025-06-30"
    }' -v
