curl -X POST http://localhost:8080/couples/join \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODAxMzc5MTQ1MDNkMmU0NGJkMjM0YWUiLCJpYXQiOjE3NDQ5ODI0NDUsImV4cCI6MTc2MTIyNTY0NX0.fF5nKIr3rzLPljk-kTMyiWf3Z7FFpOAKIf8ESMWHSow' \
    -H 'Content-type: application/json' \
    -d '{
    "inviteCode":"COUPLE-a8fcf6f692bcb0546fe8"
    }' -v