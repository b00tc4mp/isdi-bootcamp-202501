curl -X POST http://localhost:8080/users \
    -H 'Content-type: application/json' \
    -d '{"name":"John Doe","email":"john@doe.com","username":"john","password":"jojojo"}' -v