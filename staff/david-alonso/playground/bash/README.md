# Bash cheat sheet

![markdown logo](https://blogs.upm.es/estudiaciencia/wp-content/uploads/sites/643/2020/04/bash-1024x614.jpg)

**tabulador** -> autocompleta direcciones y archivos

## pwd (Print working directory)
```sh
/Users/david-alonso
```
## ls (list)
```sh
README.md
```
## cd (change directory)
```sh 
cd staff/david-alonso
```
## cat (muestra el contenido del archivo)
```sh

```
## ... (retroceso)
```sh 
```

## clear (limpia la terminal)

## git clone (Clonar repositorio)
```sh
git clone
git clone https://github.com/ricartts/isdi-bootcamp-202501
```
## git branch (muestra las ramas del repositorio, el * muestra en cual estamos)
```sh
git branch
$ git branch
  develop
* feature/playground
  main
```

## git Branch "name" (Crea una rama con el nombre de newBranch)
```sh
git branch newBranch
```
## git switch "name" (Cambia a la rama branch. Si no existe la rama, creará una nueva con el nombre branch)
```sh
git switch branch || git checkout -b branch
```

## mkdir -p "name" (Crea una carpeta llamada newFolder.)
```sh
mkdir -p new-folder
```

## mkdir -p "name" (Crea una carpeta que es diu newFolder)
```sh
mkdir -p new-folder
```

## mkdir -p "folder"/"subfolder" (Crea un directorio con una carpeta dentro de una carpeta)
```sh
mkdir -p new-folder/new-sub-folder
```

## .gitkeep (Se utiliza para guardar la carpeta a git aunque no haya nada dentro)
```sh
folder.gitkeep
```

## git status (Te dice si tienes cambios para poner en stage o commit)
```sh
git status
$ git status
On branch feature/playground
Your branch is up to date with 'origin/feature/playground'.
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    staff/eugeni-castells/playground/.gitkeep
```

## touch (Va a la carpeta en cuestión y añade .gitkeep. También sirve para crear un archivo)
```sh
touch folder.gitkeep
```
## (Crea un aarchivo a la ruta actual newFile.md)

```sh
touch newFile.md
```

## git add (Agregar a stage una carpeta o documento.)
```sh
git add changes.js
```

## git log (Para ver el historial de los commits del repositorio. Para salir, ctrl + q.)
```sh
git log
commit 3343c50a0d56070b05b791cc26ea2d1a2ce82094 (HEAD -> feature/playground, origin/feature/playground)
Author: Eugeni <ecastellsricart@gmail.com>
Date:   Mon Jan 20 15:40:49 2025 +0100
    add playground with gitkeep file #7
```

## git commit -m (Haces el commit. Los cambios actuales están listos para subirlo al repo. En el mensaje debe haber el número de issue con el signo #. En este caso, se trata de la salida número 1.)
```sh
git commit -m "message #1"
```

## git push (Subes los commites del local en el repositorio de github.)
```sh
git push
```
## (Sube una nueva rama del local al github. Con --set-upstream (o -u), le dices que basta con especificar la rama una vez)
```sh
git push --set-upstream origin <branchName>
```







