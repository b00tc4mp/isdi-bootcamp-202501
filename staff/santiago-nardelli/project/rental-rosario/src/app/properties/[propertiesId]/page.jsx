import Image from "next/image";
export const generateMetadata = ({ params }) => {
  return {
    title: `Propiedad ${params.propertiesId}`,
  };
};

export default function PropertiesDetail({ params }) {
  return (
    <section className="p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Imagen destacada */}
        <Image
          src={`https://via.placeholder.com/800x400?text=Propiedad+${params.propertiesId}`}
          alt={`Propiedad ${params.propertiesId}`}
          className="w-full h-64 object-cover"
        />

        {/* Contenido */}
        <div className="p-6">
          {/* Título */}
          <h1 className="text-2xl font-bold mb-4">
            Propiedad {params.propertiesId}
          </h1>

          {/* Descripción */}
          <p className="text-gray-700 mb-6">
            Esta es una descripción detallada de la propiedad {params.propertiesId}. Aquí puedes incluir información sobre las características principales, como el tamaño, el número de habitaciones, baños, y cualquier otra información relevante.
          </p>

          {/* Información adicional */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Precio</h2>
              <p className="text-gray-600">$1,200/mes</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Ubicación</h2>
              <p className="text-gray-600">Rosario, Santa Fe</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Habitaciones</h2>
              <p className="text-gray-600">3</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Baños</h2>
              <p className="text-gray-600">2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}