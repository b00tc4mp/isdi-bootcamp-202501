import 'dotenv/config'
import { data, User, Level } from './index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB_TEST } = process.env

data
  .connect(MONGO_URL, MONGO_DB_TEST)
  .then(() => {
    return Promise.all([User.deleteMany({}), Level.deleteMany({})])
  })
  .then(() => {
    return Level.insertMany([
      {
        name: 'Basic conditions',
        type: 'quiz',
        description: 'Test your understanding of basic conditions.',
        body: 'let a = 10;\n let b = 8;\n if (a > 2) {\n b += a;\n}\n console.log(b);',
        resultOptions: ['12', '23', '34', '18'],
        expectedResult: '18',
      },
      {
        name: 'Sum variables',
        type: 'fillInBlank',
        description: 'Complete the line of code to obtain the sum of two numbers.',
        body: `const num1 = 5; const num2 = 3;\n// add two numbers\nconst sum = __________;\nconsole.log('The sum of ' + num1 + ' and ' + num2 + ' is: ' + sum);`,
        expectedResult: 'num1 + num2',
        difficulty: 2,
      },
      {
        name: `Loop 'for'`,
        type: 'quiz',
        description: `Practice using 'for' loops. What will print the console.log?`,
        body: `let total = 0;\nfor (let i = 0; i < 3; i++) {\n  total += i;\n}\nconsole.log(total);`,
        resultOptions: ['1', '2', '3', '4'],
        expectedResult: '3',
      },
      {
        name: 'String Concatenation',
        type: 'fillInBlank',
        description: 'Complete the code to concatenate two strings. Remember to add a white space between two variables.',
        body: `const firstName = "John";\nconst lastName = "Doe";\nconst fullName = __________;\nconsole.log(fullName);`,
        expectedResult: 'firstName + " " + lastName',
        difficulty: 3,
      },
      {
        name: 'Boolean logic',
        type: 'quiz',
        description: 'Understand basic boolean logic. What will print the console.log?',
        body: 'let isSunny = true; let isWeekend = false;\nconsole.log(isSunny && isWeekend);',
        resultOptions: ['true', 'false', 'undefined', 'null'],
        expectedResult: 'false',
      },
      {
        name: 'Array length',
        type: 'quiz',
        description: 'Find the length of an array. What will print the console.log?',
        body: 'const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits.length);',
        resultOptions: ['2', '3', '4', '"3"'],
        expectedResult: '3',
      },
      {
        name: 'typeof operator',
        type: 'quiz',
        description: 'Use typeof to determine a variable type.',
        body: 'const age = 30;\nconsole.log(typeof age);',
        resultOptions: ['"string"', '"number"', '"object"', '"undefined"'],
        expectedResult: '"number"',
      },
      {
        name: 'Array access',
        type: 'fillInBlank',
        description: 'Access the third element of the array.',
        body: `const colors = ["red", "green", "blue", "yellow"];\nconst thirdColor = __________;\nconsole.log(thirdColor);`,
        expectedResult: 'colors[2]',
        difficulty: 2,
      },
      {
        name: 'Function declaration',
        type: 'fillInBlank',
        description: 'Write a basic function to multiply two numbers. White spaces between each element are very important!',
        body: `function multiply(a, b) {\n __________\n}\nconsole.log(multiply(2, 3));`,
        expectedResult: 'return a * b;',
        difficulty: 2,
      },
      {
        name: 'Comparison operators',
        type: 'quiz',
        description: 'Compare two values using strict equality. What will print the console.log?',
        body: 'let x = "5"; let y = 5;\nconsole.log(x === y);',
        resultOptions: ['true', 'false', '"true"', '"false"'],
        expectedResult: 'false',
      },
      {
        name: 'Switch statement',
        type: 'fillInBlank',
        description: 'Complete the switch case structure.',
        body: `let fruit = "banana";\nswitch (fruit) {\n  case "apple":\n    console.log("Apple!");\n    break;\n  ___\n    console.log("Banana!");\n    break;\n  default:\n    console.log("Unknown fruit");\n}`,
        expectedResult: 'case "banana":',
        difficulty: 2,
      },
      {
        name: 'While loop',
        type: 'quiz',
        description: 'Practice using a while loop.',
        body: 'let i = 0;\nlet sum = 0;\nwhile (i < 3) {\n  sum += i;\n  i++;\n}\nconsole.log(sum);',
        resultOptions: ['3', '4', '5', '6'],
        expectedResult: '3',
      },
      {
        name: 'Object access',
        type: 'fillInBlank',
        description: 'Access a value from an object using dot notation.',
        body: `const person = { name: "Alice", age: 25 };\nconst personName = __________;\nconsole.log(personName);`,
        expectedResult: 'person.name',
        difficulty: 1,
      },
      {
        name: 'Math with modulus',
        type: 'quiz',
        description: 'Understand the modulus (%) operator. What will print the console.log?',
        body: 'let x = 10;\nlet y = 3;\nconsole.log(x % y);',
        resultOptions: ['1', '3', '0', '2'],
        expectedResult: '1',
        difficulty: 3,
      },
      {
        name: 'Function with return value',
        type: 'fillInBlank',
        description: 'Complete the function to return the square of a number. White spaces between each element are very important!',
        body: 'function square(n) {\n __________\n}\nconsole.log(square(4));',
        expectedResult: 'return n * n;',
        difficulty: 2,
      },
      {
        name: 'Array push',
        type: 'quiz',
        description: 'Understand how to add elements to an array. What will print the console.log?',
        body: 'const arr = [1, 2];\narr.push(3);\nconsole.log(arr.length);',
        resultOptions: ['2', '3', '4', 'undefined'],
        expectedResult: '3',
        difficulty: 2,
      },
      {
        name: 'for loop with condition',
        type: 'quiz',
        description: 'Understand loop increments. What will print the console.log?',
        body: 'let count = 0;\nfor (let i = 1; i <= 5; i++) {\n  count += i;\n}\nconsole.log(count);',
        resultOptions: ['10', '15', '20', '5'],
        expectedResult: '15',
        difficulty: 3,
      },
      {
        name: 'Object destructuring',
        type: 'fillInBlank',
        description: 'Extract a value from an object using destructuring. White spaces between each element are very important!',
        body: 'const user = { name: "Lia", age: 22 };\nconst ___ = user;\nconsole.log(name);',
        expectedResult: '{ name }',
        difficulty: 3,
      },
      {
        name: 'Nested if statements',
        type: 'quiz',
        description: 'Understand how nested conditions work. What will print the console.log?',
        body: 'let a = 7;\nif (a > 5) {\n  if (a < 10) {\n    console.log("Yes");\n  }\n}',
        resultOptions: ['Yes', 'No', 'undefined', 'Error'],
        expectedResult: 'Yes',
        difficulty: 2,
      },
      {
        name: 'Falsy value check',
        type: 'quiz',
        description: 'Do you know what is considered falsy in JavaScript? What will print the console.log?',
        body: 'const value = 0;\nif (value) {\n  console.log("Truthy");\n} else {\n  console.log("Falsy");\n}',
        resultOptions: ['Truthy', 'Falsy', 'Error', 'undefined'],
        expectedResult: 'Falsy',
        difficulty: 2,
      },
    ])
  })
  .then(([level1, level2, level3]) => {
    return bcrypt.hash('Patata2!', 10).then((hash) => {
      return User.insertMany([
        {
          name: 'Test Test',
          email: 'test@test.com',
          username: 'testtest',
          password: hash,
        },
        {
          name: 'Pepito Grillo',
          email: 'pepito@grillo.com',
          username: 'pepitogrillo',
          password: hash,
        },
        {
          name: 'Calendula',
          email: 'calen@dula.com',
          username: 'calendula',
          password: hash,
        },
        {
          name: 'Ada Lovelace',
          email: 'ada@code.com',
          username: 'adalove',
          password: hash,
        },
      ])
    })
  })
  .catch((error) => console.error('❌ Error populating DB:', error))
  .finally(() => data.disconnect())
