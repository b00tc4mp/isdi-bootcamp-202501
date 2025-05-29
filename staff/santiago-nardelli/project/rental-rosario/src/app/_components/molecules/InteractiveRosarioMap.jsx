"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configurar el ícono del marcador
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje del ícono
  popupAnchor: [1, -34], // Punto de anclaje del popup
  shadowSize: [41, 41], // Tamaño de la sombra
});
const InteractiveRosarioMap = () => {
  return (
    <MapContainer
      center={[-32.9468, -60.6394]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full border-0 shadow-none rounded-none md:border-2 md:border-black md:shadow-md md:rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[-32.9468, -60.6394]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        {" "}
        <Popup>
          {" "}
          <span style={{ animation: "fadeIn 1s ease-in-out" }}>
            Estás en el corazón de Rosario!
          </span>
        </Popup>
      </Marker>
      <Marker
        position={[-32.9477132, -60.6304658, 17]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        <Popup>Monumento Histórico Nacional a la Bandera</Popup>
      </Marker>
      <Marker
        position={[-32.9533, -60.6583]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        <Popup>Parque Independencia</Popup>
      </Marker>
      <Marker
        position={[-32.9431, -60.6502]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        <Popup>Plaza San Martin</Popup>
      </Marker>
      <Marker
        position={[-32.9349524, -60.6572342, 17]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        <Popup>Pichincha</Popup>
      </Marker>
      <Marker
        position={[-32.92349, -60.663003]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        <Popup>Puerto Norte</Popup>
      </Marker>
      <Marker
        position={[-32.88104, -60.687575]}
        icon={defaultIcon}
        riseOnHover={true}
      >
        <Popup>La Florida</Popup>
      </Marker>
    </MapContainer>
  );
};

export default InteractiveRosarioMap;
