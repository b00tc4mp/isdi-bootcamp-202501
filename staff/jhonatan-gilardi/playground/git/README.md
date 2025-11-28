# git cheat sheet

![git logo](https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png))

## git config
configura tus credenciales globales o locales
```sh
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@example.com"
```

## git init
inicializa un repositorio en el directorio actual
```sh
git init
``` 

## git clone 
clona un repositorio remoto
```sh
git clone
http://github.com/usuario/repositorio.git
```

## git status
verifica el estado del repositorio (archivos añadidos,archivos modificados,etc)

```sh
git status
```

## git add
añade archivos a area de preparacion (staging)
```sh
git add archivo.txt
git add .  # Añade todos los cambios en el directorio actual
```

## git commit
guarda los cambios en el historial del repositorio

```sh
git commit -m "Mensaje descriptivo del cambio preferentemente en ingles"
```

## git log 
muestra el historial de commits.
```sh
git log
git log --oneline #muestra el historial  resumido
```

## git branch
muestra la ramas existentes o crea una nueva.
```sh
git branch  #lista de ramas
git branch nueva-rama  #crea una nueva rama
```

## git checkout
cambia de rama o restaura archivos
```sh
git checkout nueva-rama
git checkout archivo.txt
```

## git switch
cambia de rama (remplazo moderno de checkout)
```sh
git switch  #cambia de rama como ser de main a develop
git switch nueva-rama
```
