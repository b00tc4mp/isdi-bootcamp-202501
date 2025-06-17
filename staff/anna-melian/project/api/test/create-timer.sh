curl -X POST http://localhost:8080/timers \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA2NGEyNzM2OWYwNmEyM2I3NTczZWUiLCJpYXQiOjE3NDUyNDI3MjYsImV4cCI6MTc0NTMyOTEyNn0.OO6JbDlFlIeSnsp9EGcEVlM3tZnef-drXLvIAwPguo8' -H 'Content-type: application/json' \
 -d '{
        "time":20,"pauseTime":7,"tag":"Yoga"
    }' -v