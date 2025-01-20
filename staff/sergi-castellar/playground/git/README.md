# GIT CHEAT SHEET 
![markdown logo](https://git-scm.com/images/logos/downloads/Git-Icon-Black.png)

---
# COMANDOS BÁSICOS DE GIT



## status
ver los cambios que se han realizado
```sh
git status
```

## branch
muestra las ramas existentes
```sh
git branch
```
o crea una nueva
```sh
git branch nueva-rama
```

## checkout
cambia a una rama
```sh
git checkout nueva-rama
```
o crea una y cambia a ella
```sh
git checkout -b nueva-rama
```

## add
Añadir cambios al área de preparación (staging area) de Git. Este paso es necesario antes de realizar un commit.
```sh
git add .
```

## commit
Guarda los cambios del área de preparación (staging area) en el historial de commits del repositorio local. Cada commit es como una "instantánea" del estado del proyecto en un momento dado.
```sh
git commit -m "mensaje de subida"
```

## push
Envia los cambios de tu repositorio local a un repositorio remoto (como GitHub, GitLab, etc.). Este comando es lo que sube los commits al servidor remoto
```sh
git push origin nombre-rama
```
Si la primera vez usamos -u con el push, le dejaremos claro a que rama subir los push a partir de ahora sin necesidad de especificarlo
```sh
git push -u origin nombre-rama
```
Y para las proximas veces, sera necesario usar únicamente:
```sh
git push
```

## log
Sirve para ver el historial de commits
```sh
git log
```