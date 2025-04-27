<img src="https://imgs.search.brave.com/MEQDe4Za8XXJAKyQA4C9cccYgPKMlDZQM47VF8oxWJQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy82/LzYyL0dpdC1sb2dv/LW9yYW5nZS5zdmc" width="100%" height="auto" />

<br/>

# Git cheat sheet

## git clone

```sh
git clone
git clone https://github.com/ricartts/isdi-bootcamp-202501
```

Clonar repositori.

## git branch

```sh
git branch
$ git branch
  develop
* feature/playground
  main
```

Veure les branques que hi ha al repositori. L'asterisc marca a quina branca estem.

## git branch "name"

```sh
git branch newBranch
```

Crea una branca amb el nom de newBranch

## git switch "name"

```sh
git switch branch || git checkout -b branch
```

Canvia a la branca branch. Si no existeix la branca en crearà una de nova amb el nom branch.

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

```sh
git log --oneline
2c01731 (HEAD -> feature/playground, origin/feature/playground) bash Readme image change #7
d665001 add Readme.md with Git commands WIP #7
d4b4320 add Readme.md with bash commands WIP #7
3343c50 add playground with gitkeep file #7
fdfbd3c (origin/develop, develop) add my folder #7
3c4188a (origin/main, origin/HEAD, main) Initial commit
```

Per veure l'historial dels commits del repositori. Per sortir, ctrl + q. El --oneline t'ho posa de manera resumida.

## git commit -m "message"

```sh
git commit -m "message #1"
```

Fas el commit. Els canvis actuals estan llestos per pujar-ho al repo. Al missatge hi ha d'haver el número d'issue amb el signe #. En aquest cas, es tracta de l'issue número 1..

## git push

```sh
git push
```

Puges els commits del local al repositori de github.

```sh
git push --set-upstream origin <branchName>
```

Puja una branca nova del local al github. Amb --set-upstream (o -u), li dius que només cal especificar la branca una vegada.

## git reset "commit hash"

```sh
git reset "commit hash"
```

Elimina el commit amb el hash corresponent.

## git checkout file

```sh
$ git checkout README.md
Updated 0 paths from the index
```

Ens recupera l'arxiu de la ruta corresponent. Revisa tots els commits i el recupera si existeix.
