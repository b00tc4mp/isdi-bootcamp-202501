<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7c0rKToaSWcqTL2skL3hR2wlb1nJlofNZ-g&s" width="100%" height="auto" />

<br/>

# Bash cheat sheet

Link documentació: https://linuxstans.com/bash-cheat-sheet/

**tabulador** -> autocompleta adreces i arxius.

## pwd (print working directory)

```sh
pwd

kativ@LAPTOP-6HBHEV5F MINGW64 ~/workspace/isdi-bootcamp-202501/staff/eugeni-castells/playground/bash
```

Des de quina carpeta estàs executant.

## ls (list)

```sh
ls
README.md  staff/
```

Llistar què hi ha dins de la carpeta.

## mkdir (make directory)

```sh
mkdir
```

Crear carpeta (make directory)

## clear

```sh
clear
```

Netejar consola.

## cat (Concatenate and write files)

```sh
cat
```

Llegir un arxiu a bash.

## mkdir -p "name"

```sh
mkdir -p new-folder
```

Crea una carpeta que es diu newFolder.

## mkdir -p "folder"/"subfolder"

```sh
mkdir -p new-folder/new-sub-folder
```

Crea un directori amb una carpeta dins d'una carpeta.

## .gitkeep

```sh
folder.gitkeep
```

S'utilitza per poder guardar la carpeta a git encara que no hi hagi res a dins.

## touch

```sh
touch folder.gitkeep
```

Va a la carpeta en qüestió i hi afegeix .gitkeep.
També serveix per a crear un arxiu.

```sh
touch newFile.md
```

Crea un arxiu a la ruta actual que es diu newFile.md

## cp (copy)

```sh
cp file destination-directory
```

Copia i envia un arxiu a la ruta definida.

## mv (move)

```sh
mv file new-name
```

Si no defineixes una ruta sinó que hi poses un nom que no fa match amb cap directori de la ruta actual, canviarà el nom de l'arxiu.

```sh
mv file new-rute
```

Si en canvi definim una nova ruta, s'enviarà l'arxiu a la nova ruta.

## cd (change directory)

```sh
cd ../upper-folder
```

Canvia la ruta a una carpeta superior.

## rmdir (remove directory)

```sh
rmdir directory-name
```

Elimina la carpeta corresponent.
