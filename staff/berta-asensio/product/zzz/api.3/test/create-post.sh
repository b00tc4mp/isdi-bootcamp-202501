curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UyNTczM2QwNWIxNTk3YmE5ZWJlYzMiLCJpYXQiOjE3NDMwMTI1MTB9.u_WerqFIz8AqEy1PW-H9-zKie1tpQlnqT2ie5Z6Q9SM' \
    -H 'Content-type: application/json' \
    -d '{
        "image":"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXlnbXp6eGtyMHAxbWE3NzJiYXhtbHlzdzNrbzd5dHgwbTA1c3B0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EG0Y1zJIBDPsk/giphy.gif",
        "text":"Good morning"
        }' \
    -v