curl -X POST http://localhost:8080/posts \
    -H 'content-type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UzM2JhNDg5ZmUyNDAxM2QwNjMzM2MiLCJpYXQiOjE3NDI5NDY0NzV9.eJA7CBL2itFl8PMqcPcKK-npBTaNfwl2FLzM_NNFxIw' \
    -d '{"userId":"20y8wll1xsu","text":"patata","url":"https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg"}' -v