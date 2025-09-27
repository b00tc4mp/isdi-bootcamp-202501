curl -X POST http://localhost:8080/users \
    -H 'Content-Type: application/json' \
    -d '{"name":"diego armando","lastname":"maradona","email":"diego@gmail.com","username":"maradona","password":"123123123"}' \
    -v