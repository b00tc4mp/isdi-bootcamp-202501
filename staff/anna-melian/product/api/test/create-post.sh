curl -X POST http://localhost:8080/posts \
 -H 'Authorization: Basic m71tm7l3l5l' -H'Content-type: application/json' \
 -d '{
        "image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWl4dmRudTRlY3Vnb281emp0bG1ldnhsY3l0bWxxb2Zhb3Y5ODdmaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mz1kJeDVueKC4/giphy.gif","text":"Searching my wand"}' -v