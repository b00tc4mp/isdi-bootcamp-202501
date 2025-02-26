require('./find')

console.info('TEST find')

console.info('CASE search a number greater than 10')

{
    const array1 = [5, 12, 8, 130, 44];

    const found = array1.find((element) => element > 10);

    console.assert(found  === 12, '5 is the index 0')
}

console.info('CASE Find an object in an array by one of its properties')

{
    const inventory = [
        { name: "apples", quantity: 2 },
        { name: "bananas", quantity: 0 },
        { name: "cherries", quantity: 5 },
      ];
      
      function isCherries(fruit) {
        return fruit.name === "cherries";
      }
      
      console.assert(inventory.find(isCherries), 'cherries are found');
      // { name: 'cherries', quantity: 5 }
      
}
