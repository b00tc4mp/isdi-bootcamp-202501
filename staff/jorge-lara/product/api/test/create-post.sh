curl -X POST http://localhost:8080/posts \
    -H 'content-type: application/json' \
    -H 'Authorization: Basic 20y8wll1xsu' \
    -d '{"userId":"20y8wll1xsu","text":"patata","url":"https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg"}' -v