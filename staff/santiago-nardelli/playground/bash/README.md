# Bash Cheat Sheet 
![Markdown logo](https://imgs.search.brave.com/NwK7X1gAPso42sydkea8S4XOwzcIjb4wktpUR74PrcE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy52ZXJ5aWNvbi5j/b20vcG5nLzEyOC9i/dXNpbmVzcy92c2Nv/ZGUtcHJvZ3JhbS1p/dGVtLWljb24vbWFy/a2Rvd24tNC5wbmc)

## pwd (print working directory)

* Show current directory

```sh
pwd
/Users/santiagonardelli
```
## ls

* Displays files within folder

```sh
ls
```
## ls -a

* Muestra ficheros ocultos 

```sh
ls -a
```
## Mkdir

* I create folder

```sh
mkdir "folder name"
```
### Example
-  mkdir staff/santiago-nardelli/playground/bash

## Touch
*I create file inside a folder 

```sh
touch "name file"
```
### Example
-   touch staff/santiago-nardelli/playground/bash/README.md
## mv 
* Mueve documentos entre carpetas
*Si no encuentra una ruta donde mover, crea un nuevo archivo  
```sh
mv example.txt "nombre de la carpeta"
```
## rm -r 

* remueve carpetas que contienen carpetas dentro 
```sh
rm -r "nombre de la carpeta"
```
## cp 

* copia ficheros 
```sh
cp "direccion donde quiero copiarlo" "donde lo copio"
```
## Rmdir

* Remove folder

```sh
rmdir "name file"
```

## Git Clone
* Allows me to clone a repo of GitHub in local repo of cpu


```sh
git clone "name repository github"
```

## Cat
* Let me see content in a file
 
```sh
cat "name file"
```

## Git Branch
* Shows the git work branches  

```sh
git branch
```

## Git Branch (name)
* Create a new branch for me 


```sh
git branch "name new branch"
```
## Git  Switch (name of branch)
* Changes me to the desired branch

```sh
git switch "name branch"
```

## Git  Add (name of Folder)
* Add files to staging area (index)

```sh
git add "name folder"
```
### Example

* git add staff/santiago-nardelli/.gitkeep

## Git  Push (name of Folder)
*I do it when I upload the commit so complete I only go git push to upload the changes to the same commit 


```sh
git push -u origin "name branch"
```
### Example

* git push --set-upstream origin develop
*git push -u orgin develop(main)

## Git Checkout -b (name of Branch)
*This command creates and changes to the created branch


```sh
git checkout -b
```
### Example

```sh
 git checkout -b feature/playground
```
 ## Git commit --amend -m "nuevo nombre "
*  I modify the last commit created (the name)


```sh
git commit --amend -m "nuevo nombre "
```
## Git Commit 

* I create a commit that is a documentation

```sh
git commit -m "name of commit"
```

## Git Log 

* Shows the commits history.

```sh
git log
```

## Git Diff 

*  Shows the differences between files or branches.

```sh
git diff
```
## Git Status 

*  Shows the current state of the repository.

```sh
git status
```
## Git Config --list

* Shows the current Git settings.

```sh
git config --list
```

## Git Fetch

* Download changes from the remote repository without combining them

```sh
git fetch <nombre-remoto>
```

## Git Merge 
* Combine changes from another branch in the current one.

```sh
git merge <rama>
```