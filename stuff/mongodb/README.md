```sh
test> show databases
admin   40.00 KiB
config  12.00 KiB
local   40.00 KiB
test> db.users.insertOne({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab7dc4004605bfaa729a0')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  }
]
test> db.users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab8514004605bfaa729a1')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  }
]
test> db.users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab8854004605bfaa729a2')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8854004605bfaa729a2'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  }
]
test> db.users.insertOne({ name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab8b24004605bfaa729a3')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8854004605bfaa729a2'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.find({ name: 'a' })

test> db.users.find({ name: /a/ })
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.find({ name: /^C/ })
[
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.updateOne({ _id: ObjectId('67dab8854004605bfaa729a2') }, { $set: { password: '234234234' } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8854004605bfaa729a2'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '234234234'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.deleteOne({ _id: ObjectId('67dab8854004605bfaa729a2') })
{ acknowledged: true, deletedCount: 1 }
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> show collections
users
test> db.posts.insertOne({ author: ObjectId('67dab8b24004605bfaa729a3'), image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3kyNDE3d2RzaWxxYXA5OTd2MXBsdWQzOTR6ODBncHd3djJja3ljdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kqwx0Rab82TfcVr0Kv/giphy.gif', text: 'me myself and i', createdAt: new Date, modifiedAt: null })
{
  acknowledged: true,
  insertedId: ObjectId('67daba784004605bfaa729a4')
}
test> show collections
posts
users
test> db.posts.find()
[
  {
    _id: ObjectId('67daba784004605bfaa729a4'),
    author: ObjectId('67dab8b24004605bfaa729a3'),
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3kyNDE3d2RzaWxxYXA5OTd2MXBsdWQzOTR6ODBncHd3djJja3ljdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kqwx0Rab82TfcVr0Kv/giphy.gif',
    text: 'me myself and i',
    createdAt: ISODate('2025-03-19T12:37:12.679Z'),
    modifiedAt: null
  }
]
test> db.posts.find({ author: ObjectId('67dab8b24004605bfaa729a3') })
[
  {
    _id: ObjectId('67daba784004605bfaa729a4'),
    author: ObjectId('67dab8b24004605bfaa729a3'),
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3kyNDE3d2RzaWxxYXA5OTd2MXBsdWQzOTR6ODBncHd3djJja3ljdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kqwx0Rab82TfcVr0Kv/giphy.gif',
    text: 'me myself and i',
    createdAt: ISODate('2025-03-19T12:37:12.679Z'),
    modifiedAt: null
  }
]
test> db.posts.find({ author: ObjectId('67dab8514004605bfaa729a1') })
test> db.users.createIndex({ email: 1 }, { unique: true })
email_1
test> db.users.createIndex({ username: 1 }, { unique: true })
username_1
test> db.users.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { email: 1 }, name: 'email_1', unique: true },
  { v: 2, key: { username: 1 }, name: 'username_1', unique: true }
]
test> 
```