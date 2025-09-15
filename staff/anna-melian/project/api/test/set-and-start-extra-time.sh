curl -X PATCH http://localhost:8080/timers/6800b2e3528144fdc51102b7/extraTime \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODAwYjJlMzUyODE0NGZkYzUxMTAyYjQiLCJpYXQiOjE3NDQ4NzYyNzksImV4cCI6MTc0NDk2MjY3OX0.iewcMUNCtoE_lJHOh8HrRJrPCEdG1-JLge98nD800r0' -H 'Content-type: application/json' \
 -d '{
        "timeExtra":30
    }' -v