/*
Vehicle
    Wheeled
        Motorized
            Combustion
                Car
                Moto
                Bus
                Scooter
            Electrical
                ECar
                EScooter
                Train
        Manual
            Bicycle
            Skate
    Aerial
        Plane
        Helicopter
        Drone
        Rocket
*/

// Vehicle 

function Vehicle(capacity) {
    this.capacity = capacity
}

Vehicle.prototype.printCapacity = function () { console.log('Vehicle capacity is ' + this.capacity + ' 👤') }

// Wheeled

function Wheeled(capacity, numberOfWheels) {
    Vehicle.call(this, capacity)
    this.numberOfWheels = numberOfWheels
}

Wheeled.prototype = Object.create(Vehicle.prototype)
Wheeled.prototype.constructor = Wheeled

Wheeled.prototype.printNumberOfWheels = function () { console.log('Wheeled number of wheels is ' + this.numberOfWheels + ' 🛞') }

// Aerial

function Aerial(capacity, maxHeight) {
    Vehicle.call(this, capacity)
    this.maxHeight = maxHeight
}

Aerial.prototype = Object.create(Vehicle.prototype)
Aerial.prototype.constructor = Aerial

Aerial.prototype.printMaxHeight = function () { console.log('Aerial max height is ' + this.maxHeight + ' 📏') }

// Motorized

function Motorized(capacity, numberOfWheels, horsePower) {
    Wheeled.call(this, capacity, numberOfWheels)
    this.horsePower = horsePower
}

Motorized.prototype = Object.create(Wheeled.prototype)
Motorized.prototype.constructor = Motorized

Motorized.prototype.printHorsePower = function () { console.log('Motorized horse power is ' + this.horsePower + ' 🐴') }

// Manual

function Manual(capacity, numberOfWheels, calories) {
    Wheeled.call(this, capacity, numberOfWheels)
    this.calories = calories
}

Manual.prototype = Object.create(Wheeled.prototype)
Manual.prototype.constructor = Manual

Manual.prototype.printCalories = function () { console.log('Manual calories is ' + this.calories + ' 🔥') }

// Combustion

function Combustion(capacity, numberOfWheels, horsePower, fuelType) {
    Motorized.call(this, capacity, numberOfWheels, horsePower)
    this.fuelType = fuelType
}

Combustion.prototype = Object.create(Motorized.prototype)
Combustion.prototype.constructor = Combustion

Combustion.prototype.printFuelType = function () { console.log('Combustion fuel type is ' + this.fuelType + ' ⛽️') }

// Car

function Car(horsePower, fuelType) {
    Combustion.call(this, 5, 4, horsePower, fuelType)
    this.fuelType = fuelType
}

Car.prototype = Object.create(Combustion.prototype)
Car.prototype.constructor = Car

Car.prototype.printCar = function () { console.log('Car 🚗') }

// Bus

function Bus(horsePower, fuelType) {
    Combustion.call(this, 50, 6, horsePower, fuelType)
    this.fuelType = fuelType
}

Bus.prototype = Object.create(Combustion.prototype)
Bus.prototype.constructor = Bus

Bus.prototype.printBus = function () { console.log('Bus 🚌') }

// demos

var vehicle = new Vehicle(100)
vehicle.printCapacity()

var wheeled = new Wheeled(2, 4)
wheeled.printCapacity()
wheeled.printNumberOfWheels()

var aerial = new Aerial(100, 4000)
aerial.printCapacity()
aerial.printMaxHeight()

var motorized = new Motorized(3, 3, 100)
motorized.printCapacity()
motorized.printNumberOfWheels()
motorized.printHorsePower()

var manual = new Manual(1, 4, 2000)
manual.printCapacity()
manual.printNumberOfWheels()
manual.printCalories()

var combustion = new Combustion(2, 4, 400, 'gas')
combustion.printCapacity()
combustion.printNumberOfWheels()
combustion.printHorsePower()
combustion.printFuelType()

var car = new Car(100, 'diesel')
car.printCapacity()
car.printNumberOfWheels()
car.printHorsePower()
car.printFuelType()
car.printCar()

var bus = new Bus(500, 'diesel')
bus.printCapacity()
bus.printNumberOfWheels()
bus.printHorsePower()
bus.printFuelType()
bus.printBus()


// VM9352: 30 Vehicle capacity is 100 👤
// VM9352: 30 Vehicle capacity is 2 👤
// VM9352: 42 Wheeled number of wheels is 4 🛞
// VM9352: 30 Vehicle capacity is 100 👤
// VM9352: 54 Aerial max height is 4000 📏
// VM9352: 30 Vehicle capacity is 3 👤
// VM9352: 42 Wheeled number of wheels is 3 🛞
// VM9352: 66 Motorized horse power is 100 🐴
// VM9352: 30 Vehicle capacity is 1 👤
// VM9352: 42 Wheeled number of wheels is 4 🛞
// VM9352: 78 Manual calories is 2000 🔥
// VM9352: 30 Vehicle capacity is 2 👤
// VM9352: 42 Wheeled number of wheels is 4 🛞
// VM9352: 66 Motorized horse power is 400 🐴
// VM9352: 90 Combustion fuel type is gas ⛽️
// VM9352: 30 Vehicle capacity is 5 👤
// VM9352: 42 Wheeled number of wheels is 4 🛞
// VM9352: 66 Motorized horse power is 100 🐴
// VM9352: 90 Combustion fuel type is diesel ⛽️
// VM9352: 102 Car 🚗
// VM9352: 30 Vehicle capacity is 50 👤
// VM9352: 42 Wheeled number of wheels is 6 🛞
// VM9352: 66 Motorized horse power is 500 🐴
// VM9352: 90 Combustion fuel type is diesel ⛽️
// VM9352: 114 Bus 🚌