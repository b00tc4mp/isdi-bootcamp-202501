# Bash cheatsheet

## pwd (print working directory)
Show current directory
```sh
pwd
/Users/jorgelara
```
## ls (list)
See all that is inside of a directory
```sh
ls
README.md staff
```

## cd (change directory)
Change the actual directory for other that you type
```sh
cd staff/jorge-lara/playground
```

## mkdir (make directory)
Creates a new directory(folder)
```sh
mkdir staff/jorge-lara/playground
```

## touch
Creates a file
```sh
touch staff/jorge-lara/playground/bash/README.sh
```

## cat (content)
See the content of a file
```sh
cat README.sh
Hello World
```

## rm (remove)
Removes a file
```sh
rm staff/jorge-lara/playgrond/bash/README.sh
```

## cp (copy)
Copy files and directories

- Copy between two files. The first parameter **(README.sh)** is the file you want to copy and the second parameter **(READMECopy.sh)** is the copied file
```sh
cp README.sh READMECopy.sh
README.sh  READMECopy.sh
```
- Copy files to a directory. The last parameter  **(playground/)** is the destination directory
```sh
cp README.sh READMECopy.sh playground/
```
-Copy directories like the same way copying files.
```sh
cp -R staff/jorge-lara/playground staff/jorge-lara/playgroundCopy
```

## mv (move)
Moves a file to another directory. Also you can change the name of a file witout moving to another directory
```sh
mv example1/example1.txt examples
```