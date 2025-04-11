
export default function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        extensions: ['.js', '.jsx'],
        alias: {
          com: '../com',           // ✅ correcto: com está fuera de app
          '@logic': './logic',     // ✅ porque babel.config.js está en app/
          '@view': './view',
          '@data': './data',
          '@util': './util',
          '@assets': './assets'
        }
      }]
    ]
  }
}
