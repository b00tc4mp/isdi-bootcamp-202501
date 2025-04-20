curl -X POST http://localhost:8080/recipes \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODAzODlmOWRmNWZmYWMxNmNiZmM5YmEiLCJpYXQiOjE3NDUwNjIzOTksImV4cCI6MTc0NTA2NTk5OX0.b8kJSew-kbcjtb8Ve4h_k-L1YMKT_blwKuGTm9-4xK4' \
-H 'Content-Type: application/json' \
-d '{
        "image": "https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
        "title": "Receta de Bandeja Paisa",
        "description": "Deliciosa receta de la bandeja paisa.",
        "cookingTime": 45
    }' -v