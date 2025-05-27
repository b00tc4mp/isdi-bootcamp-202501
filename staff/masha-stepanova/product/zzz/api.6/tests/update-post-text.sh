curl -X PATCH http://localhost:8080/posts/67e596f8a2457b9c61eee1da/text \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UwNjU1YjE2M2U4MTIxMTU2YTQxZGIiLCJpYXQiOjE3NDMwOTg5NDJ9.dvbHTusJXoQwqsPtBSCsnmvaOhiezz90X9UaxcDTctI' \
    -H 'Content-Type: application/json' \
    -d '{"text":"miau miau miau"}' -v