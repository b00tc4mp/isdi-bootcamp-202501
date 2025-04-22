# [App Name]

## Intro

Tzend is a fitness app designed for both beginners and experienced users, offering access to a wide range of workouts and training routines. Beyond exploration, users can also create their own personalized exercises and routines, adding a unique and tailored experience. Additionally, Tzend includes a powerful progress tracking system that helps visualize individual transformation and performance over time.


![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Btd2d4czU4aXdjdGFhb3F6OXF4ZWd2N3lubTJrMzBzYjVlZXRiciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orieKRjkyDUti23sY/giphy.gif)

## Functional

### Use Cases

Moderator
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
- Look up workouts/routines saved in wishlist (Profile page)
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
<!-- - dat (the data model and driver) -->
- com (the common validations, utils, ...)


### Data model

User 
  - id (UUID)
  - role (string, enum: ('anonymous', 'regular', 'moderator', 'default'))
  - name? (string)
  - lastName? (string)
  - alias (string)
  - password  (string) (hashed)
  - level? (string, enum: ('beginner', 'intermediate', 'advanced'))
  - interests? ([string])
  - createdAt (date)
  - modifiedAt? (date)
  - workouts? ([Workout.id])
  - routines? ([Routine.id]) --> //with populate check if completed


<!-- · PHYSICAL DATA (FUTURE INTEGRATION)
- userId (User.id)
- Gender (string, enum: 1 (male) | 2 (female) | 3 (other))
- Height (number)
- weight (number)
- Skin folds ([number])
- createdAt (date) -->


Workout
- id (UUID)
- createdBy? (User.id)
- name (string)
- muscleGroup (string)
- feedImage (string)
- type (number/string, enum: 1 (calysthenics) | 2: (strength) | 3: (cardio)...)
- difficulty (number/string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- description (string)
- executionImages([string])
- status (string, enum: 1 (accepted) | 2: (pending) | 3: (declined)) -> //if state === pending, can edit workout
- likes ([User.id])
- saves ([User.id])
- createdAt (date)


WorkoutProgress (conjunto de workoutProgress) -> poder borrar el punto
  - user (User.id)
  - workout (Workout.id) 
  - weightUsed (number)
  - createdAt (date)
  - notes? (string) (???)


Routine
- id (UUID)
- createdBy? (User.id)
- name (string)
- goal (string) //gain strength, resistance, etc
- muscle group (string)
- feedImage (string)
- locationType (number/string, enum: 1 (home) | 2: (gym) | 3: (outside))
- difficulty (number/string, enum: 1 (begginer) | 2: (intermediate) | 3: (advanced))
- status (number/string, enum: 1 (accepted) | 2: (pending) | 3: (declined))
- description? (string)
- executionImages? (string)
- duration (string)
- frequencySuggestion? (string)
- likes ([User.id])
- saves ([User.id])
- createdAt (date)
- modifiedAt (date)
- workouts ([RutineWorkout])

RoutineWorkout 
- id (UUID)
- workout (Workout.id),
- order? number,
- sets? number,
- reps? number,
- time? number,
- weight? number,
- restTime? number


### Technologies

- HTML/CSS/JS (...)
- TypeScript
- React (...)
- React Native (...)
- Node (...)
- Express (...)
- MongoDB/SH (...)
- Mongoose
- Mocha & Chai (...)
- JWT 
- Zod
- Morgan
- Winston
- c8
- [...]

### Test Coverage

[...]

## Planning

[Issue Tracking](https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/70)