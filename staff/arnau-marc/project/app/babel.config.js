// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Elimina cualquier referencia a nativewind aquí
    // plugins: ['nativewind/babel'],  // Elimina esta línea si está presente
  };
};
