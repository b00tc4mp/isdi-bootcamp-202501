# Git

![Git logo](https://imgs.search.brave.com/hHpm-bAKw7C2sZzlUCJrr6GUrl-fnWUWZjKMaJXV_o4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3Zjk4MWNlZjEw/MTRjMGI1ZTQ4YmUu/cG5n)

---

## git init

`git init` initializes a new Git repository in the current directory.

```sh
git init
```

```sh
mkdir new_project
cd new_project
git init
```

---

## git add

`git add` stages changes to be included in the next commit.

```sh
git add <file_or_directory>
```

```sh
git add file.txt
git add
```

---

## git commit

`git commit` records the staged changes in the repository's history.

```sh
git commit -m "message"
```

```sh
git commit -m "Initial commit"
```

---

## git branch

`git branch` is used to list, create, or delete branches.

- List all branches
```sh
git branch
```

- Create a new branch
```sh
git branch new-feature
```

- Delete a branch
```sh
git branch -d old-branch
```

---

## git checkout / git switch

`git checkout` is used to switch branches or restore files. 
`git switch` is a modern alternative to switching branches.

```sh
git checkout <branch_name>
git switch <branch_name>
```

```sh
git checkout main
git switch feature-branch
```

---

## git push

`git push` uploads local commits to a remote repository.

```sh
git push <remote> <branch>
```

```sh
git push origin main
```

---

## git log

`git log` displays a log of commits in the repository.

```sh
git log
```

```sh
git log --oneline
```

---

## git status

`git status` shows the status of changes in the working directory and staging area.

```sh
git status
```

---

## git clone

`git clone` is used to create a local copy of a remote repository.

```sh
git clone <repository_url>
```

```sh
git clone https://github.com/user/repo.git
```

