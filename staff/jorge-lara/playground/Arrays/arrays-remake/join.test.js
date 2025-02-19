require('./join.js');

console.info('TEST join');

console.info('CASE: joining an array with different separators');

{
    const arr = ["Wind", "Water", "Fire"];

    console.assert(arr.join() === 'Wind,Water,Fire', 'should return Wind,Water,Fire');
    console.assert(arr.join(', ') === 'Wind, Water, Fire', 'should return Wind, Water, Fire');
    console.assert(arr.join('') === 'WindWaterFire', 'should return WindWaterFire');
}