const InteractiveMap = ({ staticMapUrl }) => {
  return (
    <img
      src={staticMapUrl}
      alt="Mapa de la ubicación"
      className="w-full h-96"
    />
  );
};

export default InteractiveMap;
