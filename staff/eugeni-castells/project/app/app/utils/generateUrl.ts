export const generateUrl = (baseUrl: string, params: object) => {
  let querySign = "?";

  //Object.entries() transforma en un array anidat d'arrays on cada item és un array amb el primer valor igual al nom de la propietat i el segon el valor de la propietat
  const queryString = Object.entries(params)
    .filter(([_, value]) => {
      return value !== null && value !== undefined;
    })
    //Fem un map on, per cada item agafarem la posició 1 de l'item, l'encodarem perquè tingui format url segur i farem el mateix amb el valor
    //d'aquesta manera podrem asociar url params a un valor i els podrem extreure al back
    .map(([property, value]) => {
      return `${encodeURIComponent(property)}=${encodeURIComponent(value)}`;
    })
    //Posem el join per tal que els elements de l'array s'encadenin amb aquest valor. Això permet posar més d'un item de cerca a la url
    .join("&");

  if (queryString === "") querySign = "";

  //Posem l'interrogant perquè s'interpreti com una query
  const url = `${baseUrl}${querySign}${queryString}`;

  return url;
};
