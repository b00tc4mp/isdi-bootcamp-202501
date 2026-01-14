curl -X POST http://localhost:8080/posts \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2VkNTE3OGYxYmQzNjU5YzhkY2NiZDgiLCJpYXQiOjE3NDM2MDY2NzMsImV4cCI6MTc0MzYxMDI3M30.fF_fK7t9cobOlO2tgT_TQdkC867uHVgkELLpbpQFPdo' -H 'Content-type: application/json' \
 -d '{
        "image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejhtdWp2czNtOGtyNXY1bnFiY202ZHhvM2w5ZnZ0aHRxZ2hsN3MwNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26BRzozg4TCBXv6QU/giphy.gif","text":"Uaaaaaa!"
    }' -v