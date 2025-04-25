const ImageCarousel = ({ imageUrl }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Opcional: Overlay para mejorar la legibilidad del texto */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
    </div>
  );
};

export default ImageCarousel;
