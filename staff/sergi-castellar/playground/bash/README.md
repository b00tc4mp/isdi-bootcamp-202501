# BASH CHEAT SHEET 
![markdown logo](https://imgs.search.brave.com/NwK7X1gAPso42sydkea8S4XOwzcIjb4wktpUR74PrcE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy52ZXJ5aWNvbi5j/b20vcG5nLzEyOC9i/dXNpbmVzcy92c2Nv/ZGUtcHJvZ3JhbS1p/dGVtLWljb24vbWFy/a2Rvd24tNC5wbmc)

---
# COMANDOS BÁSICOS DE GIT


## touch
crear archivo en la ruta seleccionada
```sh
touch /users/sergi-castellar/playground/nuevo-archivo.txt
```

## status
ver los cambios que se han realizado
```sh
status
```

## branch
muestra las ramas existentes
```sh
branch
```
o crea una nueva
```sh
branch nueva-rama
```

## checkout
cambia a una rama
```sh
checkout nueva-rama
```
o crea una y cambia a ella
```sh
checkout -b nueva-rama
```

---
# COMANDOS DE BASH
## pwd (print working directory)
show current directory
```sh
pwd /users/sergi-castellar/
```

## ls (list)
inspect the current files in your working directory
```sh
ls
```

## cd (change directory)
cambiar el repositorio a una carpeta concreta
```sh
cd /users/sergi-castellar/playground
```

## mkdir (make directory)
crear carpeta en la ruta seleccionada
```sh
mkdir /users/sergi-castellar/playground/nueva-carpeta
```

## rm
eliminar archivo de la ruta seleccionada
```sh
rm /users/sergi-castellar/playground/nuevo-archivo.txt
```


---
# CICLOS
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

---
# OTROS
## clear
Limpia la consola
```sh
clear
```