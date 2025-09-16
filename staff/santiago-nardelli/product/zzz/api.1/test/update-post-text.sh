#!/bin/bash

URL="http://localhost:3000/posts/m7yy5inv-mif332ssjcf/text"
AUTH="Authorization: Basic m7yy45qb-rv1cg9xnbg"
CONTENT_TYPE="Content-type: application/json"
DATA='{"text":"hello diego"}'

curl -X PATCH "$URL" -H "$AUTH" -H "$CONTENT_TYPE" -d "$DATA" -v