curl -X POST http://localhost:8080/posts/new \
    -H 'Content-type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2RkOWVkMTkzMTJkOWUzMmQ4NjU5MGUiLCJpYXQiOjE3NDMwNjQ4MjF9.Q0UN5R6u5uH3DXgVCGN-3pq6tCMQpaCRkLqvogXqSis' \
    -d '{
    "image":"https://i.ibb.co/v4RTvBdq/frank.png",
    "text":"guitarrita"
    }' -v