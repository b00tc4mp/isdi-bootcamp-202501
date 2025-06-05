curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2U2NjI2MTdiYTFmODIyZTQzNjU2ZTYiLCJpYXQiOjE3NDMxNTE3MTl9.Rzoajk0ROeI27YIJesGQwzkAqFPFyeqBDbZeSwZqHdA' \
    -H 'Content-type: application/json' \
    -d '{
        "image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHYyNmgyam1tMzJlbXdvdG1xNWQ4OTBvdmNoc281d2FtbGdkZ3Y0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVkmGyqYRt4qY/giphy.gif",
        "text":"I need to rest..."
        }' \
    -v