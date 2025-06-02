curl -X POST http://localhost:8080/orders \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODNkZDNiY2M0ODJjNzRlZTEwNzk4ZjUiLCJpYXQiOjE3NDg4ODIzNjcsImV4cCI6MTc0ODg5MzE2N30.sH722aj8DhiMyd8kyL_ZTQ3R4XPNHqAmsg0P6msReWE' \
    -H 'Content-type: application/json' \
    -d '{
        "menuId":"683dd3bcc482c74ee10798fd", 
        "bread":"integral"}' \
    -v
