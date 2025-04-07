# PARA CREAR UN POST Y ENVIARSELO AL ORDENADOR DE MANU

curl -X POST http://192.168.1.143:8080/posts -H 'Authorization: Basic m85us02s8bc' -H 'Content-type: application/json' -d '{ "image":"https://m.media-amazon.com/images/I/61fcg8g9JoL._AC_UF1000,1000_QL80_.jpg","text":"Pedorro"}' -v