const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const useState = React.useState;
const useEffect = React.useEffect;

/**
 * Componente que demuestra el uso básico de useEffect para actualizar el título
 * de la página cuando cambia el nombre del usuario.
 */
const EjemploBasico = () => {
    

    const [nombre, setNombre] = useState('');
    const [tituloPagina, setTituloPagina] = useState('Título Original');

    

    useEffect(() => {
        // Función principal del efecto
        document.title = tituloPagina;

        // Función de limpieza que se ejecuta antes de cada nueva ejecución
        return () => {
            document.title = 'Título por defecto';
        };
    }, [tituloPagina]);

    

    return (
        <section >
            <div>
                <h1>Ejemplo Básico de useEffect</h1>
            </div>
            <div >
                <div >
                    <label 
                        htmlFor="nombre-input" 
                       
                    >
                        Ingresa tu nombre:
                    </label>
                    <input
                        id="nombre-input"
                        value={nombre}
                        onChange={(e) => {
                            setNombre(e.target.value);
                            setTituloPagina(`Hola ${e.target.value}`);
                        }}
                        placeholder="Tu nombre aquí..."
                        
                    />
                </div>
                
                <p >
                    El título actual de la página es: {tituloPagina}
                </p>
            </div>
        </section>
    );
};

root.render(<EjemploBasico />);