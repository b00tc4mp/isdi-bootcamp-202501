"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const InteractiveRosarioMap = () => {
  return (
    <MapContainer
      center={[-32.9468, -60.6394]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-32.9468, -60.6394]}>
        {" "}
        {/* Mismo centro para el marcador de prueba */}
        <Popup>Estás en el corazón de Rosario!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default InteractiveRosarioMap;
