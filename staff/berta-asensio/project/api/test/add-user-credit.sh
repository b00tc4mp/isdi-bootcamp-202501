curl -X POST http://localhost:8080/users/self/credit \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODUxYzA2ZjhhZDQ1ODYxZmFjZTNhZjMiLCJpYXQiOjE3NTAxODgxOTcsImV4cCI6MTc1MDE5ODk5N30.mCNvY7dQpsDsDdUaLVijOoxSwQOFxFC5tm_OExAsstc' \
    -H 'Content-type: application/json' \
    -d '{"amount": 25}' \
    -v