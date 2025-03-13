curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Basic m87fqb18ssk' \
    -H 'Content-type: application/json' \
    -d '{
            "image":"https://media.giphy.com/media/ANWIS2HYfROI8/giphy.gif?cid=790b7611olwkdrysre9cz4vp6bydmqlcm8vwrk5f83snopta&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            "text":"dididi"
        }' -v