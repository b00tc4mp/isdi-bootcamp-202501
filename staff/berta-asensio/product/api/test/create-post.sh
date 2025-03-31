curl -X POST http://localhost:8080/posts \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2U4ZWE5MTcyZTQ0NWIxYjhmNmI1ZTUiLCJpYXQiOjE3NDM0MTU0ODl9.wKtUlfJya_udt-83iFgv0NODvxk31Q_XiXpcJUJId5U' \
    -H 'Content-type: application/json' \
    -d '{
        "image":"https://media.giphy.com/media/mx0rj9sZRBcGTwEIX1/giphy.gif?cid=790b7611jiqaknu9whanizk5cl8xsude31ecmhuhj3wkru9a&ep=v1_gifs_trending&rid=giphy.gif&ct=g","text":"You are a ROCK"
        }' \
    -v