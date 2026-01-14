require('./findIndex')

console.info('TEST findIndex')

console.info('CASE find index greater than 13')

{
    const nums = [5, 12, 8, 130, 44]

    const numsBy2 = nums.findIndex(element => element > 13)

    console.assert(nums.length === 5, 'nums.length is 5')
    console.assert(nums[0] === 5, 'nums[0] is 5')
    console.assert(nums[1] === 12, 'nums[1] is 12')
    console.assert(nums[2] === 8, 'nums[2] is 8')
    console.assert(nums[3] === 130, 'nums[3] is 130')
    console.assert(nums[4] === 44, 'nums[4] is 44')

    console.assert(numsBy2 === 3, 'numsBy2 is 12')
}

console.info('CASE find all numbers greater than 131')

{
    const nums = [5, 12, 8, 130, 44]

    const numsBy2 = nums.findIndex(element => element > 131)

    console.assert(nums.length === 5, 'nums.length is 5')
    console.assert(nums[0] === 5, 'nums[0] is 5')
    console.assert(nums[1] === 12, 'nums[1] is 12')
    console.assert(nums[2] === 8, 'nums[2] is 8')
    console.assert(nums[3] === 130, 'nums[3] is 130')
    console.assert(nums[4] === 44, 'nums[4] is 44')

    console.assert(numsBy2 === -1, 'numsBy2 is -1')
}

console.info('CASE first element divisible by 2 in the array')

{
    const nums = [5, 12, 8, 130, 44]

    const numsBy2 = nums.findIndex((element, index) => {
        console.log(`Visited Index: ${index}, with value: ${element}`);
        return typeof element === "number" && element % 2 === 0;
    })

    console.assert(nums.length === 5, 'nums.length is 5')
    console.assert(nums[0] === 5, 'nums[0] is 5')
    console.assert(nums[1] === 12, 'nums[1] is 12')
    console.assert(nums[2] === 8, 'nums[2] is 8')
    console.assert(nums[3] === 130, 'nums[3] is 130')
    console.assert(nums[4] === 44, 'nums[4] is 44')

    console.assert(numsBy2 === 1, 'numsBy2 is 1')
}


console.info('CASE console log index and element')

{
    const nums = [5, 13, 91, 8, 44]

    const numsBy2 = nums.findIndex((element, index, array) => {
        console.log(`Checking element: ${element}, at index: ${index}, in array: [${array}]`)
        return element % 2 === 0
    })

    console.assert(nums.length === 5, 'nums.length is 5')
    console.assert(nums[0] === 5, 'nums[0] is 5')
    console.assert(nums[1] === 13, 'nums[1] is 13')
    console.assert(nums[2] === 91, 'nums[2] is 91')
    console.assert(nums[3] === 8, 'nums[3] is 8')
    console.assert(nums[4] === 44, 'nums[4] is 44')

    console.assert(numsBy2 === 3, 'numsBy2 is 2')
}