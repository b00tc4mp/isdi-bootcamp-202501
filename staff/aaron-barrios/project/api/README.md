# isdi-bootcamp-202501
isdi-bootcamp-202501

--- API ---

- levantar mongodb 
cd D:\MONGODB\mongodb-win32-x86_64-windows-8.0.5
bin\mongod.exe --dbpath data

- levantar mongosh
 D:\MONGODB\mongosh-2.4.2-win32-x64\bin\mongosh.exe mongodb://localhost/tzend-test

- limpiar/compilar typescript
npm run build:dev

- levantar api
npm run start:dev

- script dev en package json que me une ambos comandos
npm run dev

- ejecutar archivos .spec (test de logica locales) -> primero compila los.ts y luego ejecuta sobre esa compilación todo en una
npm run compile test

- ejecutar archivos .sh (test de peticiones a api)
bash src/test/register-user.sh

- llenar la base de datos de mongo (ejecutar un populate desde api)
npm run populate