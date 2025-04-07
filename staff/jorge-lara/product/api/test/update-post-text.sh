curl -X PATCH http://localhost:8080/posts/arvih5to6gc/text \
    -H 'content-type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2UzM2JhNDg5ZmUyNDAxM2QwNjMzM2MiLCJpYXQiOjE3NDI5NDY0NzV9.eJA7CBL2itFl8PMqcPcKK-npBTaNfwl2FLzM_NNFxIw' \
    -d '{"text":"potatoes"}' -v 