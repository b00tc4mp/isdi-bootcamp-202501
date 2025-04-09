# **Code Quest** 🧠⚔️  
Learn JavaScript by playing - complete levels, climb the rankings and become a coding hero!

## 🧭 Intro

**Code Quest** is an educational and responsive web application created as the final project of the fullstack web development bootcamp at ISDI Coders. Its goal is to teach JavaScript through fun mechanics inspired by video games.

Users can register, progress through interactive levels, see their progress, compare their performance in a global ranking and participate in special challenges.

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmtycDVvOW9iaDB3ZnR0b3dkNGl1Y2tyNXZnNjVvOTFnb2FqZzRjZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif)

## 🎮 Functional

### Use Cases

User:
- view personal profile
- view personal progress
- play level
- continue level
- view global ranking


**Additional (for future development):**
- daily mission
- weekly challenge

### 🧑‍🎨 UI/UX Design

[Figma – Code Quest](https://www.figma.com/design/0yRNElqp7b39phRq02jCbF/isdi-bootcamp-202501-project?node-id=0-1&p=f&t=54cSFbCiFl92GlpH-0)

## 🧪 Technical

### Blocks

- **App** 
- **API** 
- **DB** 

### 📦 Packages

- `app` (front-end with React and CSS/Tailwind)
- `api` (server with Node/Express, MongoDB, Mongoose)
- `com` (validations, errors)
- `doc` (documentation)

### 📊 Data Model

#### `User`
```js
{
  id: string (string, uuid),
  name: (string, min length 3, max length 30),
  email: (string, max length 30),
  username: (string, min length 3, max length 20),
  password: (string, min length 8, max length 30),
  createdAt: (Date)
  generalProgress: ([Level.id]),
  currentLevel: (Level.id)
}
```

#### `Level`
```js
{
  id: (string, uuid),
  type: (string), // example: "quiz", "dragAndDrop", "fillInBlank"
  description: (string, max length 300),
  body: (string), // content of the test or challenge
  expectedResult: (string), // o structure for validation
  difficulty: (number)
}
```

### 🧰 Technologies

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Data Base:** MongoDB + Mongoose
- **Testing:** Mocha + Chai + c8
- **Security:** JWT + Bcryptjs

### ✅ Code Coverage

...

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/85)
