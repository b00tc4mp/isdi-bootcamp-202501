curl -X GET http://localhost:8080/hello -v

curl -X POST -d '{"name:"name","age":0}' -H 'Content-Type: application/json' -v http://localhost:8080/new
# /separar en tests