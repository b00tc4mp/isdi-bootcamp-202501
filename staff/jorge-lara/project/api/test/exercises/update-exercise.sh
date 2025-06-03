curl -X PATCH http://localhost:8080/exercises/68387cddfbbf537abf584d22/edit \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODJlMzFlNzk3Zjc1M2ZjM2QzZDIyYjYiLCJpYXQiOjE3NDg1MzI0MjksImV4cCI6MTc0ODUzNjAyOX0.HEo_9XF1LGbrVBGplo-xRZfcQqUH8x4TlCU0RuIoMNE" \
    -d '{
        "updateFields": {
            "sets": 5,
            "reps": 8
        }
    }' -v
