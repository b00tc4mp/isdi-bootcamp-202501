# COMANDOS TERMINAL BASH

![markdown logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXHktiyBz6yFVoyh0QcrqGwoGUyo18t9EPA&s)

## pwd (print working directoy)

Muestra la ruta en la que te encuentras.

```sh
pwd
/users/arnau-romero
```
## ls (list)
Muestra todos los ficheros del directorio en el que me encuentro.
```sh
$ ls
README.md  staff/
```
## cd (change directory)
Para acceder a una carpeta o fichero. Ejemplo:
```sh
cd users/arnau-romero/playground/
```
Así entrariamos en la carpeta playground.
## mkdir (make directory)
Crea una carpeta nueva en el directorio que nos encontramos.
```sh
mkdir arnau
```
## rmdir (remove directory)
Borra directorios (los directorios deben estar vacíos).
```sh
rmdir arnau
```
## rm -r (remove directory)
Borra directorios (los directorios pueden no estar vacíos).
```sh
rm -r arnau
```
## touch 
Crea un archivo nuevo en la ruta que le indiques.
```sh
touch users/arnau-romero/playground/arnau.txt
```
Esto crearia un bloc de notas que se llama arnau.
## rm
Borra un archivo
```sh
rm users/arnau-romero/playground/arnau.txt
```
Esto borraria un bloc de notas que se llama arnau.

## cp 

Copia los archivos del directorio.
```sh
cp users/arnau-romero/playground/
```
Esto copiaria los archivos del directorio playground.

## kill

Acabar con un processo que se esta realizando.
```sh
kill [process_ID]
```
## cat
Muestra el contenido de un archivo.
```sh
cat [arnau.txt]
```
## cp
Copiar archivos.
```sh
cp arnau.txt arnau
```
Esto copiaria el elemento arnau.txt dentro de la carpeta arnau.
## mv
Mueve un archivo a otra ruta o renombrar-lo.

```sh
mv arnau.txt arnau
```
Esto moveria el archivo arnau.txt dentro de la carpeta arnau.

```sh
mv arnau.txt arnauromero.txt
```
Aqui le cambiaríamos el nombre al archivo de arnau a arnauromero.