curl -X POST http://localhost:8080/posts \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2RkM2FhY2FlNmVlYmQyOWRkZjU1YzciLCJpYXQiOjE3NDI5MDE5MDZ9.wZUBy7NQJr2aXigiX9KohcW8A_MfDerCBbQeBp55evI' -H 'Content-type: application/json' \
 -d '{
        "image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWl4dmRudTRlY3Vnb281emp0bG1ldnhsY3l0bWxxb2Zhb3Y5ODdmaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mz1kJeDVueKC4/giphy.gif","text":"Searching my wand"
    }' -v