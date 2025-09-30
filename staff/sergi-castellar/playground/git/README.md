# GIT CHEAT SHEET 
![markdown logo](https://git-scm.com/images/logos/downloads/Git-Icon-Black.png)

---
# COMANDOS BÁSICOS DE GIT

## init
Se utiliza para inicializar un nuevo repositorio Git en un directorio. Convierte un directorio en un repositorio Git vacío. Solo necesitas usarlo una vez al empezar un proyecto o al clonar un proyecto existente.
```sh
git init
```
## clone
Se utiliza para clonar un repositorio remoto y crear una copia local de ese repositorio en tu máquina. Este comando descarga todo el historial de commits, las ramas y el contenido del repositorio remoto a tu directorio local, lo que te permite trabajar en él de forma independiente.
```sh
git clone https://github.com/b00tc4mp/isdi-bootcamp-202501
```
Par clonar solo una rama del repositorio, usamos este formato: 
```sh
git clone --single-branch --branch develop https://github.com/b00tc4mp/isdi-bootcamp-202501
```

## status
ver los cambios que se han realizado
```sh
git status
```
Para detectar el contenido nuevo:
```sh
git status -u
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
git checkout distinta-rama
```
o crea una nueva y cambia a ella
```sh
git checkout -b nueva-rama
```

## switch
Es una forma más simple y clara de cambiar entre ramas en un repositorio. Se usa como una alternativa más fácil y específica a git checkout para cambiar de rama.
```sh
git switch distinta-rama
```
o crea una nueva y cambia a ella
```sh
git checkout -c nueva-rama
```

## add
Añadir cambios al área de preparación (staging area) de Git. Este paso es necesario antes de realizar un commit. Para añadir todos los cambios realizados:
```sh
git add .
```
Para añadir cambios concretos, hacemos lo siguiente:
```sh
git add staff/sergi-castellar/...../README.md
```

## commit
Guarda los cambios del área de preparación (staging area) en el historial de commits del repositorio local. Cada commit es como una "instantánea" del estado del proyecto en un momento dado.
```sh
git commit -m "mensaje de subida"
```
→ Para hacer commits diferenciando archivos, hacemos adds con los archivos concretos que queramos.

## push
Envia los cambios de tu repositorio local a un repositorio remoto (como GitHub, GitLab, etc.). Este comando es lo que sube los commits al servidor remoto
```sh
git push origin nombre-rama
```
Si la primera vez usamos -u con el push, le dejaremos claro a que rama subir los push a partir de ahora sin necesidad de especificarlo
```sh
git push --set-upstream origin nombre-rama
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