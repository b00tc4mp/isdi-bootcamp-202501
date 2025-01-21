# Comandos esenciales de Bash

1. Navegación: pwd, ls, cd (ruta), cd...
2. Archivos y carpetas: touch (archivo), mkdir (carpeta), mv (origen)(destino), cp (origen)(destino), rm (archivo), rm -r (carpeta)
3. Ver contenido: cat (archivo), less (archivo), grep "texto" (archivo)
4. Permisos: chmod (permisos)(archivo), chown (usuario):(grupo) (archivo)
5. Otros: find . -name"<

## pwd ()
Si  estás perdido en el sistema de archivos este comando te dice donde estás

## ls (listar archivos y carpetas)
- ls: muestra archivos y carpetas
- ls -l: muestra detalles como permisos, tamaño y fecha
- ls -la: incluye archivos ocultos (los que empiezan por .)

## cd (cambiar directorio)
cd Documentos

## volver al directorio anterior
cd ..

## ir al directorio raíz
cd/

## crear un archivo vacío
touch (archivo.txt)

## crear una carpeta
mkdir mi_carpeta

## mover archivo.txt a la carpeta Documentos
mv archivo.txt Documentos/

## renombrar archivo.txt a nuevo_nombre.txt
mv archivo.txt nuevo_nombre.txt

## copiar archivos o carpetas
cp archivo.txt Documentos/

## copiar una carpeta entera
cp -r mi_carpeta/ copia_carpeta

## eliminar archivos  
rm archivo.txt

## eliminar carpeta
rm -r mi_carpeta

## mostrar contenido de un narchivo
cat archivo.txt

## ver contenido con paginación 
less archivo_largo.txt

## buscar texto dentro de un archivo
grep "hola" archivo.txt

## cambiar permisos
chmod 700 archivo.txt

## cambiar propietario
chown (usuario):(grupo) (archivo)
sudo chown marta:marta archivo.txt

## buscar archivo o carpeta
find . -name "archivo.txt"

## ver procesos activos
ps aux

## detener un proceso
kill (PID)
kill 12345

## limpiar terminal
clear
