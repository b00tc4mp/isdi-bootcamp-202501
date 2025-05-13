import "dotenv/config";
import { connectToDatabase, disconnectFromDatabase } from "./index.js";
import { Property, User } from "./models/index.js";

async function populateDatabase() {
  // Conectar a la base de datos
  await connectToDatabase();

  // Datos de ejemplo para poblar
  const properties = [
    {
      title: "Balcón superluminoso en esquina",
      description:
        "Disfrutá de la sencillez de este alojamiento ubicado muy cerca de bv. Oroño, los parques del río y la zona de Pichincha. El departamento es un mono ambiente equipado con cama queen, heladera, horno eléctrico, hornalla, TV, aire acondicionado, mesa para 2, sillón de 2 cuerpos con su mesita ratona y un sillón con mesita en balcón. Muy iluminado porque está en esquina con ventanas de ambos frentes. Puerta blindada se seguridad. Esta en un edificio con solo dos departamentos por piso.",
      location: "Rosario, Argentina",
      type: "apartment",
      bedrooms: 1,
      images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1337793640838862941/original/509db246-c9ac-479c-8dcf-c7ab63a79070.jpeg?im_w=960",
      ],
      airbnbUrl:
        "https://www.airbnb.com.ar/rooms/1337793640838862941?viralityEntryPoint=1&unique_share_id=9F2076DE-BC86-4B00-A897-754C634F9BEA&slcid=4e9f290667074072b5ee90c29bef3292&s=76&feature=share&adults=1&channel=native&slug=BjKKOYYf&source_impression_id=p3_1747119842_P3acAS0Z4X-y2j8L",
    },
    {
      title: "Céntrico muy silencioso",
      description:
        "Disfrutá de una experiencia con estilo en este alojamiento céntrico. Ubicado cerca de todo. Cuenta con una habitación con cama matrimonial al contra frente, que junto con las persianas, hace que sea muy silencioso. Baño completo. Aire acondicionado potente que enfría todo el departamento. Living con sillón en L con almohadones y decoración muy copada. Cocina completa con todo lo que necesites para cocinar. Patio lindo con plantas y sector lavadero. Lavarropas y microondas. TV y wifi.",
      location: "Rosario, Argentina",
      type: "apartment",
      bedrooms: 1,
      images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1342968949934997965/original/a5cd92a4-d7b4-4bc8-a174-f2e7a956bafd.jpeg?im_w=960",
      ],
      airbnbUrl:
        "https://www.airbnb.com.ar/rooms/1342968949934997965?viralityEntryPoint=1&unique_share_id=4D175E42-A55B-4828-A2C8-C17B76CF71B6&slcid=1de2aeae956d41a39dd904adab74e495&s=76&feature=share&adults=1&channel=native&slug=BxPMjjXs&source_impression_id=p3_1747119965_P3Ymji8rV0VC6dMX",
    },
    {
      title: "La casita de Pichincha. Jardín, parrilla y cochera",
      description:
        "Casa restaurada en pleno barrio Pichincha combina el encanto de la arquitectura original con todas las comodidades modernas. Ubicada a metros de los mejores bares, restaurantes y espacios culturales de la ciudad; ideal para los eventos de Metropolitano y el Alto Rosario.",
      location: "Rosario, Argentina",
      type: "house",
      bedrooms: 1,
      images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1394540026623981154/original/f7d35d0f-b36e-42f0-a1aa-a44de0e48026.jpeg?im_w=960",
      ],
      airbnbUrl:
        "https://www.airbnb.com.ar/rooms/1394540026623981154?viralityEntryPoint=1&unique_share_id=A0A4BE84-6799-4D7B-B21F-10E4C74FC1C8&slcid=b3a0f1004c4249bc94552b5e1eb889a1&s=76&feature=share&adults=1&channel=native&slug=s1isvE1m&source_impression_id=p3_1747120091_P3jvIsEr-rWrg9Az",
    },
    {
      title: "Planta baja con 3 patios llenos de plantas y luz",
      description:
        "Relajate en este alojamiento único. Es un edificio de solo 3 departamentos pero al estar en PB parece una casita. Ambientes amplios y espaciosos. Cuenta con 3 patios llenos de plantas. Parrilla para hacerte un asadito. Dos baños. Aires acondicionados en todos los ambientes. Lavadero. Muy silencioso para descansar de noche. Está ubicado en el mejor barrio de la ciudad, a metros de un hotel 5 estrellas con seguridad 24 horas",
      location: "Rosario, Argentina",
      type: "house",
      bedrooms: 2,
      images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1079200456129925546/original/c0aa2629-526e-4b96-b66d-3a970693c232.jpeg?im_w=960",
      ],
      airbnbUrl:
        "https://www.airbnb.com.ar/rooms/1079200456129925546?viralityEntryPoint=1&unique_share_id=98EAEDC6-9F97-493B-A5F5-DBB48DFE357C&slcid=ec212ac83f5b460f8e44a7cc89bc887a&s=76&feature=share&adults=1&channel=native&slug=buyrnTBU&source_impression_id=p3_1747120191_P3xMNBBa_au7yweB",
    },
    {
      title: "Casa antigua restaurada con encanto",
      description:
        "Casa antigua completamente restaurada, conservando su encanto original.",
      location: "Refinería, Rosario, Argentina",
      type: "house",
      bedrooms: 2,
      images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1079200456129925546/original/c0aa2629-526e-4b96-b66d-3a970693c232.jpeg?im_w=960",
      ],
      airbnbUrl:
        "https://www.airbnb.com.ar/rooms/1079200456129925546?viralityEntryPoint=1&unique_share_id=98EAEDC6-9F97-493B-A5F5-DBB48DFE357C&slcid=ec212ac83f5b460f8e44a7cc89bc887a&s=76&feature=share&adults=1&channel=native&slug=buyrnTBU&source_impression_id=p3_1747120191_P3xMNBBa_au7yweB",
    },
    {
      title: "Superluminoso con vista al Río Paraná. A nuevo!",
      description:
        "Hermoso departamento reciclado a estrenar hasta 6 personas en el centro de Rosario. Todos los ambientes cuentan con una hermosa vista al rio Paraná. Algo que lo hace único son sus 3 dormitorios (dos con cama matrimonial y una con dos camas twin size, todos con AA). Cuenta con TV en el living y en el dormitorio principal. Tiene 2 baños, cocina completamente equipada con todo lo que van a necesitar y hay lavarropas.",
      location: "Rosario, Argentina",
      type: "apartment",
      bedrooms: 3,
      images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1322066881196464817/original/41e8637a-c237-4677-82b6-8c9df2c9e18c.jpeg?im_w=960",
      ],
      airbnbUrl:
        "https://www.airbnb.com.ar/rooms/1322066881196464817?viralityEntryPoint=1&unique_share_id=A47106FC-B16C-4D9E-9356-31034FAB98AC&slcid=9ee62794663741208d0e32c7a8cdbf2f&s=76&feature=share&adults=1&channel=native&slug=t71Oq6rG&source_impression_id=p3_1747120348_P3mTMCICklUZG2U6",
    },
  ];

  try {
    // Verificar si la base de datos ya tiene datos
    const existingCount = await Property.countDocuments();
    if (existingCount > 0) {
      console.log(
        "La base de datos ya está poblada. No se insertarán datos duplicados."
      );
      await disconnectFromDatabase();
      return;
    }

    // Insertar los datos
    const inserted = await Property.insertMany(properties);
    console.log(
      `Se han insertado ${inserted.length} propiedades en la colección 'Property'`
    );
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
  } finally {
    // Desconexión garantizada
    try {
      await disconnectFromDatabase();
      console.log("Desconectado de la base de datos");
    } catch (disconnectError) {
      console.error("Error al desconectar:", disconnectError.message);
    }
  }

  process.exit(0); // Salida controlada
}

populateDatabase();
