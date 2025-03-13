curl -s -X GET http://localhost:8080/posts \
    -H 'Authorization: Basic m87fqb18ssk' \
    -H 'Content-type: application/json' | python \
    -m json.tool
