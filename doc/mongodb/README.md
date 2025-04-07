# MongoDB

# Commands

## Find a document
### db.users.find()

```sh
db.users.find({ ciudad: "Madrid" })
```

## Delete a document
### db.users.deleteOne()

```sh
db.users.deleteOne({ nombre: "Ana" })
```

## Add a document
### db.users.insertOne()

```sh
db.users.insertOne({
  nombre: "Ana",
  edad: 25,
  ciudad: "Barcelona" })
```

## Update document
### db.users.updateOne()

```sh
db.users.updateOne({ nombre: "Juan" }, { $set: { edad: 31 } })
````

## Agregations
### db.users.aggregate([])

```sh
db.users.aggregate([
  { $group: { _id: "$ciudad", total: { $sum: 1 }}}])
````

## Show collections
### show collections
```sh
show collections
posts
users
````

