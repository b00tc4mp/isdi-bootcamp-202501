curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2RjMmRiMzZhNjhlZjJjMmZkNWNmMWUiLCJpYXQiOjE3NDI5OTgzMTYsImV4cCI6MTc0MzAwMTkxNn0.vYwGVcbtcd9holkjN7pY-C-rsB1PejtsYF-lOchfJaE' \
    -H 'Content-type: application/json' \
    -d '{
            "image":"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhjMHVlZ3U1N2ViaGpjeDZ0aWhmZ2c1OG4xb2J1ZGd1MWNvNmVrNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tnaysRvVNVxq7VS/giphy.gif",
            "text":"coconut"
        }' -v