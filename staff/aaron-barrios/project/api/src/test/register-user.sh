curl -X POST http://localhost:8080/users \
    -H 'Content-type: application/json' \
    -d '{
            "name":"Frank",
            "lastName":"Pereira",
            "email":"fran@kie.com",
            "alias":"frankie",
            "password":"fafafa"
        }' -v