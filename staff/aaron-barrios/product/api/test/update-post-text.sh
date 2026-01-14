curl -X PATCH http://localhost:8080/posts/67e40bf2894414cea3cdd6f4/text \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2RjMmRiMzZhNjhlZjJjMmZkNWNmMWUiLCJpYXQiOjE3NDI5OTg2NzUsImV4cCI6MTc0MzAwMjI3NX0.l1afGO45DuasYe3v4xtMDlXsmljHDpK1fxByMHJrbdk' \
    -H 'Content-Type: application/json' \
    -d '{"text":"coconut yeah"}' -v