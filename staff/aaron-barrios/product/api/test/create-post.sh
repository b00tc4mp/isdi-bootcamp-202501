curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Basic m87fqb18ssk' \
    -H 'Content-type: application/json' \
    -d '{
            "image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJwNm1oZHJoZWRtNWQ0eWRjMzEyeGJmZ3IxMGsyNGp5NWRud3I0biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mlvseq9yvZhba/giphy.gif",
            "text":"dididi"
        }' -v