curl -X PATCH http://localhost:8080/posts/67dd86b5fe13d497a3b7425a/text \
    -H 'Authorization: Basic 67dc2db36a68ef2c2fd5cf1e' \
    -H 'Content-Type: application/json' \
    -d '{"text":"debugging"}' -v