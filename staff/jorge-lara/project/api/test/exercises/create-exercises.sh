curl -X POST http://localhost:8080/exercises -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODJlMzFlNzk3Zjc1M2ZjM2QzZDIyYjYiLCJpYXQiOjE3NDg1MzI0MjksImV4cCI6MTc0ODUzNjAyOX0.HEo_9XF1LGbrVBGplo-xRZfcQqUH8x4TlCU0RuIoMNE' -H 'Content-type: application/json' -d '{
        "name": "Press de banca",
        "muscleCategory": "Pectorales",
        "sets": 4,
        "reps": 10,
        "restTime": 60
    }' -v