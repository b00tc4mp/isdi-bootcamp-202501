curl -X PUT http://localhost:8080/couples/lists/68050963c859dd9a1a4a99bc \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA1MDk2M2M4NTlkZDlhMWE0YTk5ODgiLCJpYXQiOjE3NDUxNjA1ODcsImV4cCI6MTc2MTQwMzc4N30.xVSeDFD0tNOmtfN-FUwFtFUqV9MJ5RqY9PjAPMRIXVk' \
    -H 'Content-type: application/json' \
    -d '{
    "title":"un titulo updateado",
    "color":"black"
    }' -v