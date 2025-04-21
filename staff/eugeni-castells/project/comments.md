Als models de mongoose no es poden utilitzar tipats de typescript, perquè s'executen en temps de compilació.
Als esquemes de mongoose, s'ha d'utilitzar Schema.Types.ObjectId, i als tipats Types.ObjectId

Si volem afegir estils dinàmics reactius als props, haurem de crear un objecte al mateix coponent i fer-ho així:

const dynamicDotsWrapperStyle = {
...styles.dotsWrapper,
bottom: dotsHeight,
};

Perquè el StyleSheet.create es crea una vegada al moment de carregar el mòdul, fora del component i agnòstic als seus props.
