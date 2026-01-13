curl -X PATCH http://localhost:8080/posts/67e17413437a0ec724f5e262/text \
    -H 'Authorization: Basic 67e04f98d9f076ef37e6a143' \
    -H 'Content-type: application/json' \
    -d '{"text":"Hello, World!"}' \
    -v