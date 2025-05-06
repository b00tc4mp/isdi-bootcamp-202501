require('./find.js')

console.info('TEST find')

console.info('CASE find the first number greater than 10')

{
    const nums = [5, 12, 8, 130, 44]

    const numsBy2 = nums.find(element => element > 10)

    console.assert(nums.length === 5, 'nums.length is 5')
    console.assert(nums[0] === 5, 'nums[0] is 5')
    console.assert(nums[1] === 12, 'nums[1] is 12')
    console.assert(nums[2] === 8, 'nums[2] is 8')
    console.assert(nums[3] === 130, 'nums[3] is 130')
    console.assert(nums[4] === 44, 'nums[4] is 44')

    console.assert(numsBy2 === 12, 'numsBy2 is 12')
}

console.info('CASE find first number greater than 131')

{
    const nums = [5, 12, 8, 130, 44]

    const numsBy2 = nums.find(element => element > 131)

    console.assert(nums.length === 5, 'nums.length is 5')
    console.assert(nums[0] === 5, 'nums[0] is 5')
    console.assert(nums[1] === 12, 'nums[1] is 12')
    console.assert(nums[2] === 8, 'nums[2] is 8')
    console.assert(nums[3] === 130, 'nums[3] is 130')
    console.assert(nums[4] === 44, 'nums[4] is 44')

    console.assert(numsBy2 === undefined, 'numsBy2 is undefined')
}

console.info('CASE first element divisible by 2 in the array')

{
    const nums = [0, 1, , , , 5, 6]

    const numsBy2 = nums.find((element, index) => {
        return typeof element === "number" && element % 2 === 0;
    })

    console.assert(nums.length === 7, 'nums.length is 7')
    console.assert(nums[0] === 0, 'nums[0] is 0')
    console.assert(nums[1] === 1, 'nums[1] is 1')
    console.assert(nums[2] === undefined, 'nums[2] is undefined')
    console.assert(nums[3] === undefined, 'nums[3] is undefined')
    console.assert(nums[4] === undefined, 'nums[4] is undefined')
    console.assert(nums[5] === 5, 'nums[5] is 5')
    console.assert(nums[6] === 6, 'nums[6] is 66')

    console.assert(numsBy2 === 0, 'numsBy2 is 0')
}


console.info('CASE console log index and element')

{
    const nums = [1, 2, 3, 4, 5, 6, 7]

    const numsBy2 = nums.find((element, index, array) => {
        return element % 2 === 0
    })

    console.assert(nums.length === 7, 'nums.length is 7')
    console.assert(nums[0] === 1, 'nums[0] is 1')
    console.assert(nums[1] === 2, 'nums[1] is 1')
    console.assert(nums[2] === 3, 'nums[2] is 3')
    console.assert(nums[3] === 4, 'nums[3] is 4')
    console.assert(nums[4] === 5, 'nums[4] is 5')
    console.assert(nums[5] === 6, 'nums[5] is 6')
    console.assert(nums[6] === 7, 'nums[6] is 7')

    console.assert(numsBy2 === 2, 'numsBy2 is 2')
}