curl -X POST http://localhost:8080/timers \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ZmNjkzNzI0Y2VhNThlNTNhN2E0NDEiLCJpYXQiOjE3NDQ3OTE4OTYsImV4cCI6MTc0NDg3ODI5Nn0.GiYAzfRMd_s577cC3Xtt5TkzcSj36n9folAGWMVXWVM' -H 'Content-type: application/json' \
 -d '{
        "time":20,"pauseTime":7,"tag":"Yoga"
    }' -v