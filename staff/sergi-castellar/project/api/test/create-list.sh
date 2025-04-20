curl -X POST http://localhost:8080/couples/lists \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA1MDMyNDZkMGZlN2ZkNDkwNmFiZjUiLCJpYXQiOjE3NDUxNTkzNzMsImV4cCI6MTc2MTQwMjU3M30.My-jTCHRvw1j0Gjdkw8wFn-MeKHvxuM1uSgF12RQud4' \
    -H 'Content-type: application/json' \
    -d '{
    "title":"SUPER LISTA TITULO DE PRUEBA",
    "color":"red"
    }' -v