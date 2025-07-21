curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Basic 67e04f98d9f076ef37e6a143' \
    -H 'Content-type: application/json' \
    -d '{
        "image":"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXlnbXp6eGtyMHAxbWE3NzJiYXhtbHlzdzNrbzd5dHgwbTA1c3B0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EG0Y1zJIBDPsk/giphy.gif",
        "text":"Good morning"
        }' \
    -v