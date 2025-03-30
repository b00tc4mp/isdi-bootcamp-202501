curl -X POST http://localhost:8080/posts/new \
    -H 'Content-type: application/json' \
    -H 'Authorization: Basic 0078dfd4e3168502717c19a4905d239202' \
    -d '{
    "imageSrc":"https://i.ibb.co/v4RTvBdq/frank.png",
    "textDescription":"guitarrita"
    }' -v