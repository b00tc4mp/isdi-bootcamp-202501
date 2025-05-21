import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Bed } from "lucide-react";
import { MotionDiv, MotionButton } from "../atoms/MotionWrapper.jsx";
const PropertyCard = ({
  property: { title, description, location, bedrooms, images, airbnbUrl, id },
}) => {
  return (
    <MotionDiv
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className="rounded-lg shadow-md overflow-hidden group">
        {/* Imagen con efecto overlay */}
        {images && images.length > 0 && (
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={images[0]}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
            <MotionDiv className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Contenido de la tarjeta */}
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            {location}
          </div>
          {bedrooms !== undefined && (
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Bed className="w-4 h-4 mr-2" />
              {bedrooms === 1 ? "1 Dormitorio" : `${bedrooms} Dormitorios`}
            </div>
          )}
        </CardContent>

        {/* Footer con animación en el botón */}
        {airbnbUrl && (
          <CardFooter className="p-6 flex justify-end">
            <MotionButton
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button asChild>
                <Link
                  href={airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Ver en Airbnb
                </Link>
              </Button>
            </MotionButton>
          </CardFooter>
        )}
      </Card>
    </MotionDiv>
  );
};

export default PropertyCard;
/**
 * Consideraciones:

Enlace Dinámico: Si en el futuro deseas que el botón "Ver más" redirija a una página específica de cada propiedad dentro de tu propia aplicación o a un enlace externo diferente para cada propiedad, necesitarás agregar una prop adicional al componente Card (por ejemplo, linkUrl) y pasar la URL correspondiente desde el map en LandingPage. Luego, usarías esa prop en el atributo href del <a> tag.
 */
