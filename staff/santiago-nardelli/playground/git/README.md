# Git Cheat Sheet 
![Git logo](https://imgs.search.brave.com/MEQDe4Za8XXJAKyQA4C9cccYgPKMlDZQM47VF8oxWJQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy82/LzYyL0dpdC1sb2dv/LW9yYW5nZS5zdmc)

## Git Init
* Inicializa un nuevo repositorio Git en el directorio actual.

```sh
git init 
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
## Git Clone
* Allows me to clone a repo of GitHub in local repo of cpu


```sh
git clone "name repository github (link)"
```