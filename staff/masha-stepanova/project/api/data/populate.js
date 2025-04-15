import 'dotenv/config'
import { data, User, Level } from './index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB_TEST } = process.env

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Level.deleteMany({})
        ])
    })
    .then(() => {
        return Level.insertMany([
            {
                name: 'Basic conditions',
                type: 'quiz',
                description: 'Test your understanding of basic conditions.',
                body: 'let a = 10; let b = 8; if (a > 2) b += a; console.log(b);',
                resultOptions: ['12', '23', '34', '18'],
                expectedResult: '18'
            },
            {
                name: 'Sum variables',
                type: 'fillInBlank',
                description: 'Complete the line of code to obtain the sum of two numbers.',
                body: `const num1 = 5; const num2 = 3;\n// add two numbers\nconst sum = ___;\nconsole.log('The sum of ' + num1 + ' and ' + num2 + ' is: ' + sum);`,
                expectedResult: 'num1 + num2'
            },
            {
                name: `Loop 'for'`,
                type: 'quiz',
                description: `Practice using 'for' loops.`,
                body: `let total = 0;\nfor (let i = 0; i < 3; i++) {\n  total += i;\n}\nconsole.log(total);`,
                resultOptions: ['1', '2', '3', '4'],
                expectedResult: '3'
            }
        ])
    })
    .then(([level1, level2, level3]) => {
        return bcrypt.hash('Patata2!', 10)
            .then(hash => {
                return User.insertMany([
                    {
                        name: 'Test Test',
                        email: 'test@test.com',
                        username: 'testtest',
                        password: hash,
                        generalProgress: [level1._id, level2._id]
                    },
                    {
                        name: 'Pepito Grillo',
                        email: 'pepito@grillo.com',
                        username: 'pepitogrillo',
                        password: hash,
                        generalProgress: [],
                        currentLevel: level1._id
                    },
                    {
                        name: 'Calendula',
                        email: 'calen@dula.com',
                        username: 'calendula',
                        password: hash,
                        generalProgress: [level1._id],
                        currentLevel: level2._id
                    },
                    {
                        name: 'Ada Lovelace',
                        email: 'ada@code.com',
                        username: 'adalove',
                        password: hash,
                        generalProgress: [level1._id, level2._id, level3._id],
                        currentLevel: level3._id
                    }
                ])
            })
    })
    .catch(error => console.error('❌ Error populating DB:', error))
    .finally(() => data.disconnect())
