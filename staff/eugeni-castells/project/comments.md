Als models de mongoose no es poden utilitzar tipats de typescript, perquè s'executen en temps de compilació.
Als esquemes de mongoose, s'ha d'utilitzar Schema.Types.ObjectId, i als tipats Types.ObjectId

Si volem afegir estils dinàmics reactius als props, haurem de crear un objecte al mateix coponent i fer-ho així:

const dynamicDotsWrapperStyle = {
...styles.dotsWrapper,
bottom: dotsHeight,
};

Perquè el StyleSheet.create es crea una vegada al moment de carregar el mòdul, fora del component i agnòstic als seus props.

Seria útil crear una propietat a van que sigui occupiedDate? Així no hem de passar per trips=>startDate&&endDate

Els populate de mongoose són només en memòria local. Si després intentes fer una query amb una dada populada et donarà error perquè el populate no s'ha fet a la base de dades.
