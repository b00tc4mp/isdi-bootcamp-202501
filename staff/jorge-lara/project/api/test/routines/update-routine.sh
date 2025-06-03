curl -X PATCH http://localhost:8080/routines/6838a01ffbbf537abf584d30/edit \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODJlMzFlNzk3Zjc1M2ZjM2QzZDIyYjYiLCJpYXQiOjE3NDg1NDE0NTAsImV4cCI6MTc0ODU0NTA1MH0.mGKfYZ5BZx0Bcuox9yEZuWRb0l2wot0bGwwLwaYQsHg" \
    -d '{
        "updateFields": {
            "duration": 75,
            "difficulty": "hard"
        }
    }' -v
