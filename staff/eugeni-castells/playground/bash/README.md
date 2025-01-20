<img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/markdown-5.png" width="100%" height="auto" />

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

## git clone

```sh
git clone
git clone https://github.com/ricartts/isdi-bootcamp-202501
```

Clonar repositori.

## cat (Concatenate and write files)

```sh
cat
```

Llegir un arxiu a bash.

## git branch

```sh
git branch
$ git branch
  develop
* feature/playground
  main
```

Veure les branques que hi ha al repositori. L'asterisc marca a quina branca estem.

## git Branch "name"

```sh
git branch newBranch
```

Crea una branca amb el nom de newBranch

## git switch "name"

```sh
git switch branch || git checkout -b branch
```

Canvia a la branca branch. Si no existeix la branca en crearà una de nova amb el nom branch.

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

## git status

```sh
git status
$ git status
On branch feature/playground
Your branch is up to date with 'origin/feature/playground'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    staff/eugeni-castells/playground/.gitkeep
```

Et diu si tens canvis per posar a stage o commit.

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

## git add

```sh
git add changes.js
```

Afegir a stage una carpeta o document.

## git log

```sh
git log
commit 3343c50a0d56070b05b791cc26ea2d1a2ce82094 (HEAD -> feature/playground, origin/feature/playground)
Author: Eugeni <ecastellsricart@gmail.com>
Date:   Mon Jan 20 15:40:49 2025 +0100

    add playground with gitkeep file #7
```

Per veure l'historial dels commits del repositori. Per sortir, ctrl + q.

## git commit -m

```sh
git commit -m "message #1"
```

Fas el commit. Els canvis actuals estan llestos per pujar-ho al repo. Al missatge hi ha d'haver el número d'issue amb el signe #. En aquest cas, es tracta de l'issue número 1.

## git push

```sh
git push
```

Puges els commits del local al repositori de github.

```sh
git push --set-upstream origin <branchName>
```

Puja una branca nova del local al github. Amb --set-upstream (o -u), li dius que només cal especificar la branca una vegada.
