curl -X POST http://localhost:8080/posts \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2RkM2FhY2FlNmVlYmQyOWRkZjU1YzciLCJpYXQiOjE3NDI5MDE5MDZ9.wZUBy7NQJr2aXigiX9KohcW8A_MfDerCBbQeBp55evI' -H 'Content-type: application/json' \
 -d '{
        "image":"https://media.giphy.com/media/ihrA3vYbabfMhIlcaR/giphy.gif?cid=790b7611l9g48v02slry2mgk1r8a6mb37kxgsxuloo3fz0sz&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        "text":"Lorem ipsum ..."
    }' -v