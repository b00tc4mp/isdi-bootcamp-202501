curl -X PUT http://localhost:8080/couples/diary/68079de49df028a61c3aa2fe \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA3OWNhOWRhMDk3ZTg0NzgwOTBkMzIiLCJpYXQiOjE3NDUzMjkzMzEsImV4cCI6MTc2MTU3MjUzMX0.7PnJU3C7hnT2Q2ejZngKAlHb2o4rzwOx0ffqZjXPJlg' \
    -H 'Content-type: application/json' \
    -d '{
    "text":"una descripcion updateada"
    }' -v