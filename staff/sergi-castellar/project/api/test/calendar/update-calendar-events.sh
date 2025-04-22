curl -X PUT http://localhost:8080/couples/events/6806a8760d48a8cb80dbd4e1 \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA2YTg2MjIxY2E3ZmI2NjU2MDMxNWYiLCJpYXQiOjE3NDUyNjY3ODcsImV4cCI6MTc2MTUwOTk4N30.XwEWeVltDk7PhEHxDhWfSA4CTHIZDEDL-AFW-uM-gO8' \
    -H 'Content-type: application/json' \
    -d '{
    "title":"un titulo updateado",
    "description":"despcription updated"
    }' -v