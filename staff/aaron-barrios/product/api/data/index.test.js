import {data} from './index.js'

data.connect('mongodb://localhost:27017', 'test')
.then(()=> data.users.insertOne({ name: 'John Doe', email: 'john@doe.com', username: 'john', password: 'jojojo' }))
.then(result => console.log(result))
.then(() => console.log(`It's over`))

// .catch(error => console.log(error)) => previous
.catch(console.error) // => access directly to error method
.finally(() => data.disconnect())