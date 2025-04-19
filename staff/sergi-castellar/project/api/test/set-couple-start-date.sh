curl -X PATCH http://localhost:8080/couples/date-start \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODAyY2YwMmRkYjhkZmIxYzlkZjhjOTAiLCJpYXQiOjE3NDUwNzAxMDQsImV4cCI6MTc2MTMxMzMwNH0.ZTwH6ag2OpT7Ux8VI-wl_h8tjaVW50RNYXgMjDO1Gjw' \
    -H 'Content-type: application/json' \
    -d '{
    "dateStart":"2025,04,04"
    }' -v