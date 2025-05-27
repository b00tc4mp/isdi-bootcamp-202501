curl -X PATCH http://localhost:8080/posts/67eb9756ff07daabb9471876/text \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ViOTY0MDdkNDRkYmUwOGY2ZTkxZmEiLCJpYXQiOjE3NDM0OTMxNjF9.oAUU5CQcUCx1v46MmSEZQgJM74hhj54QLBM_PVv0pNg' \
    -H 'Content-Type: application/json' \
    -d '{"text":"miau miau miau"}' -v