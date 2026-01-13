curl -X PATCH http://localhost:8080/posts/67eac96495a688874ca41430/text \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2U4ZWE5MTcyZTQ0NWIxYjhmNmI1ZTUiLCJpYXQiOjE3NDM0NDAzNTV9.EoNd5IoXdgrsJTowuWZoOVwwg0k-ZAQQoBLdoU2HgVU' \
    -H 'Content-type: application/json' \
    -d '{"text":"ROCKY"}' \
    -v