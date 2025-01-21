# Bash cheat sheet

![Bash logo](https://imgs.search.brave.com/gnEEr5bPK3I2IV-jLRYgaYlPe8vZcOlx3uru9MRTBiM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzEyODU5/MzAvc2NyZWVuc2hv/dHMvNDA0MDI5MS9t/ZWRpYS9hMzg0ZWNm/MmFmYjdlNTc1ZDEw/NDljZDg4N2Q1Yzdk/My5wbmc_cmVzaXpl/PTQwMHgzMDAmdmVy/dGljYWw9Y2VudGVy)

## Basic terminal commands

### Navigation

#### pwd (path to working directory)

Show current directory

```sh
pwd
/Users/lucianoparavanit
```

#### ls (list)

Lists files and directories in the current directory

```sh
ls 
README.md staff
```

#### cd  (change directory)

To change the directory

```sh
cd staff/lucianoparavanit/playground
```

### File Operations

#### touch

Creates an empty file

```sh
touch new_file.txt
```

Creates an empty file in a specified directory, useful for maintaining empty directories in Git.

```sh
touch staff/lucianoparavanit/.gitkeep
```

#### cat

Display file content

```sh
cat <filename>
```

#### rm

Deletes a file

```sh
rm file_to_delete.txt
```

#### clear

To clean the console

```sh
clear
```

## File and Directory Management

### Creating Directories

#### mkdir

To create a directory

```sh
mkdir new_folder
```

#### mkdir -p

Creates a directory and its specified subdirectories

```sh
mkdir -p staff/lucianoparavanit
```

#### rmdir

Removes a directory (if empty)

```sh
rmdir empty_folder
```

### Copying and Moving files

#### cp

```bash
cp <source> <destination>
```

#### mv

```sh
mv <source> <destination>
```



