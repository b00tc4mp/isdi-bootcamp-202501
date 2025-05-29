# [App Name]

## Intro

Tzend is a fitness app designed for both beginners and experienced users, offering access to a wide range of workouts and training routines. Beyond exploration, users can also create their own personalized exercises and routines, adding a unique and tailored experience. Additionally, Tzend includes a powerful progress tracking system that helps visualize individual transformation and performance over time.


![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Btd2d4czU4aXdjdGFhb3F6OXF4ZWd2N3lubTJrMzBzYjVlZXRiciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orieKRjkyDUti23sY/giphy.gif)

## Functional

### Use Cases

Admin
- Accept/Decline workout
- Accept/Decline routine

User (Anonym)
- Explore public/suggested content (Home page)
- Complete training test (Home page)
- View recommended workouts && routines (Home page)
- Look up and filter routines (Routines feed page)
- View routine details (Routine detail page)
- Look up and filter workouts (Workouts feed page)
- View workout details (Workout detail page)
- Restricted acces to Profile & Breakdown 

User (Registered)
- Register 
- Login
- Explore public/suggested content (Home page)
- Quick acces/navigation to key features: Current routine, last workout, smart suggestions (Home page)
- Change/update user data (Profile page)
- Logout (Profile page)
- Toggle light/dark theme (Profile page)
- Look up and filter routines (Routines feed page)
- View individual routine details (Routine detail page)
- Interact with the routine: Save, like, mark as done (Routine detail page)
- Edit reps/sets/weight/rest per workout inside routine (Routine detail page)
- Create a custom routine (Create routine page)
- Look up and filter workouts (Workouts feed page)
- View individual workout details (Workout detail page)
- Interact with the workout: Save, like, mark as done (Workout detail page)
- Create a custom workout (Create workout page)
- Visualize progress charts(Breakdown page)
- Compare muscle group performance (Breakdown page)
- Access future AI-based composition analysis (Breakdown page – upcoming)


### UXUI Design 

[Figma] (https://www.figma.com/design/V3oHXXQcurlsZh34OnCsZ0/FinalProject?node-id=0-1&p=f&t=Ag0ck2OISQ07MvE5-0)

## Technical

### Blocks

- App (the client-side application)
- API (the server-side API)
- DB (the database)

### Packages

- doc (the documentation)
- app (the client-side application)
- api (the server-side API)
- dat (the data model and driver)
- com (the common validations, utils, ...)

### Data model

Admin
- role(string, enum: 1 (anonymous) | 2 (registered) | 3 (admin))
- id (UUID)
- alias
- password
- createdAt

Anonym User
- role(string, enum: 1 (anonymous) | 2 (registered) | 3 (admin))
- id (temporal UUID) 
- createdAt

User (Registered)
· USER DATA
- role(string, enum: 1 (anonymous) | 2 (registered) | 3 (admin))
- id(UUID)
- name (string)
- last name (string)
- alias (string)
- password (hashed string) (bcrypt)
- level (string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- interests ( [strings]) // enum: 1 (calysthenics) | 2: (strength) | 3: (cardio)...
- createdAt
- updatedAt


Workout
- id (UUID)
- name (string)
- description (string)
- muscle group (string)
- difficulty (int/string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- category (int/string, enum: 1 (calysthenics) | 2: (strength) | 3: (cardio)...)
- images([string])
- realized (boolean)
- status (string, enum: 1 (accepted) | 2: (pending) | 3: (declined)) // operative_accepted (boolean)
- createdAt: date
- createdBy?: UUID

UserWorkoutInteraction 
  - userId: UUID
  - workoutId: UUID
  - liked: boolean
  - saved: boolean
  - completed: boolean

WorkoutProgress 
  - userId: UUID
  - workoutId: UUID
  - date: date
  - weightUsed: number
  - notes?: string


Routine
- id (UUID)
- name (string)
- description? (string)
- goal (string) //gain strength, resistance, etc
- muscle group (string)
- duration (string)
- type (string, enum: 1 (home) | 2: (gym) | 3: (outside))
- difficulty (string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- frequencySuggestion?: (string)
- image?: (string)
- realized (boolean)
- status (string, enum: 1 (accepted) | 2: (pending) | 3: (declined)) // operative_accepted (boolean)
- createdAt: date
- createdBy?: UUID

RoutineWorkout 
  - routineId: UUID (FK)
  - workoutId: UUID (FK)
  - order: int
  - sets: number
  - reps: number
  - weight?: number
  - restTime?: number // in seconds

  UserRoutineInteraction 
  - userId: UUID
  - routineId: UUID
  - liked: boolean
  - saved: boolean
  - completed: boolean
  - customValues?: JSON // futura expansión



### Technologies

- HTML/CSS/JS (...)
- TypeScript
- React (...)
- Node (...)
- Express (...)
- MongoDB/SH (...)
- Mocha & Chai (...)
- Tailwind
- [...]

### Test Coverage

[...]

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/70)