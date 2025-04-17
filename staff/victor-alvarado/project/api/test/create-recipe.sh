curl -X POST http://localhost:8080/recipes \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ZhYjc5Njc5ZjY2YWNlMGUyYzI5Y2MiLCJpYXQiOjE3NDQ4OTQ3ODIsImV4cCI6MTc0NDg5ODM4Mn0.BuwRDjLlQEXLHigD0mmygLTqDs2UcjRvYBKUcFv5uno' \
-H 'Content-Type: application/json' \
-d '{
        "image": "https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
        "title": "Receta de Bandeja Paisa",
        "description": "Deliciosa receta de la bandeja paisa.",
        "cookingTime": 45
    }' -v