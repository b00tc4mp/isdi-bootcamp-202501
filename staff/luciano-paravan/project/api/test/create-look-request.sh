curl -X POST http://localhost:8080/lookRequests \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODFiNzFkNmY3ZmUyYjk5NWI3OTUxMTIiLCJpYXQiOjE3NDY2MjkwODQsImV4cCI6MTc0NjYzNjI4NH0.HKYBx33dh-aY126ntB1SnVu8JDv4DXnoN169y_yu3no" \
-H "Content-type: application/json" \
-d '{
        "contextOccasion": ["casual"],
        "location": "outdoor",
        "temperature": "warm",
        "timeOfDay": "afternoon",
        "style": "trendy",
        "additionalDetails": "date",
        "allowExternalSuggestions": true
    }' -v
