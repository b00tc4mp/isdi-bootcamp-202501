import  { useEffect } from "react";
import { useSearchParams } from "react-router";
export const Search = () => {
  const [searchParamas, setSearchParams] = useSearchParams();

  const query = searchParamas.get("q");

  useEffect(() => {
    //esto de aqui es para capturar el valor que ingresas en la url 
    const query = searchParamas.get("q");

    //TODO logic. searchUser with query
    console.log(query);
  }, [searchParamas]);
  // hago el submit del formulario y llamo a la funcion handleSearch que recoje el valor del input y lo setea en el searchParams (query) y esto me cambiara la url y si la cambia llama a la funcion useEffect que tiene el onSearch(query) que es la que hace la busqueda de los usuarios, por lo que al cambiar el valor del input se hace la busqueda de los usuarios y se renderizan en la pantalla
  const handleSearch = (event) => {
    event.preventDefault();


    const form = event.target

    const query = form.query.value;

    setSearchParams({ q: query });
  };

  return (
    <form onSubmit={handleSearch} className="search">
      <input
        type="text"
        name="query"
        id="query"
        defaultValue={query}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};


