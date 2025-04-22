curl -X POST http://localhost:8080/couples/emotions \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA2NTVjYWRhZmYwNDYxN2RlNmU4NGEiLCJpYXQiOjE3NDUyNDU5MjYsImV4cCI6MTc2MTQ4OTEyNn0.tcbTb6QotHHDpzYv8LNf5V9_O1Id7lTWqZpFqzPE7OU' \
    -H 'Content-type: application/json' \
    -d '{
    "emotion":"2"
    }' -v