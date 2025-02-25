require('./map.js')

console.info('TESTING MAP METHOD')

console.info('CASE map all numbers from array to themselves multiplied by 2')

{
    const nums = [1, 4, 9, 16]

    const numsBy2 = nums.map((x) => x * 2)

    console.assert(nums.length === 4, 'nums.length is 4')
    console.assert(nums[0] === 1, 'nums[0] is 1')
    console.assert(nums[1] === 4, 'nums[1] is 4')
    console.assert(nums[2] === 9, 'nums[2] is 9')
    console.assert(nums[3] === 16, 'nums[3] is 16')

    console.assert(numsBy2.length === 4, 'numsBy2.length is 4')
    console.assert(numsBy2[0] === 2, 'numsBy2[0] is 2')
    console.assert(numsBy2[1] === 8, 'numsBy2[1] is 8')
    console.assert(numsBy2[2] === 18, 'numsBy2[2] is 18')
    console.assert(numsBy2[3] === 32, 'numsBy2[3] is 32')
}

console.info('CASE map all numbers to themselves multiplied by 2 and offset of 10 from object')

{
    const nums = [1, 4, 9, 16]
    const argument = { value: 10 }

    const numsBy2Plus10 = nums.map(function (x) {
        return x * 2 + this.value
    }, argument)

    console.assert(nums.length === 4, 'nums.length is 4')
    console.assert(nums[0] === 1, 'nums[0] is 1')
    console.assert(nums[1] === 4, 'nums[1] is 4')
    console.assert(nums[2] === 9, 'nums[2] is 9')
    console.assert(nums[3] === 16, 'nums[3] is 16')

    console.assert(numsBy2Plus10.length === 4, 'numsBy2Plus10.length is 4')
    console.assert(numsBy2Plus10[0] === 12, 'numsBy2Plus10[0] is 12')
    console.assert(numsBy2Plus10[1] === 18, 'numsBy2Plus10[1] is 18')
    console.assert(numsBy2Plus10[2] === 28, 'numsBy2Plus10[2] is 28')
    console.assert(numsBy2Plus10[3] === 42, 'numsBy2Plus10[3] is 42')
}

console.info('CASE map all numbers to themselves multiplied by 2 plus index')

{
    const nums = [1, 4, 9, 16]

    const numsBy2PlusIndex = nums.map((x, index) => x * 2 + index)

    console.assert(nums.length === 4, 'nums.length is 4')
    console.assert(nums[0] === 1, 'nums[0] is 1')
    console.assert(nums[1] === 4, 'nums[1] is 4')
    console.assert(nums[2] === 9, 'nums[2] is 9')
    console.assert(nums[3] === 16, 'nums[3] is 16')

    console.assert(numsBy2PlusIndex.length === 4, 'numsBy2PlusIndex.length is 4')
    console.assert(numsBy2PlusIndex[0] === 2, 'numsBy2PlusIndex[0] is 2')
    console.assert(numsBy2PlusIndex[1] === 9, 'numsBy2PlusIndex[1] is 9')
    console.assert(numsBy2PlusIndex[2] === 20, 'numsBy2PlusIndex[2] is 20')
    console.assert(numsBy2PlusIndex[3] === 35, 'numsBy2PlusIndex[3] is 35')
}

console.info('CASE map all numbers to themselves multiplied by 2 plus index and array length')

{
    const nums = [1, 4, 9, 16]

    const numsBy2PlusIndexAndLength = nums.map((x, index, array) => x * 2 + index + array.length)

    console.assert(nums.length === 4, 'nums.length is 4')
    console.assert(nums[0] === 1, 'nums[0] is 1')
    console.assert(nums[1] === 4, 'nums[1] is 4')
    console.assert(nums[2] === 9, 'nums[2] is 9')
    console.assert(nums[3] === 16, 'nums[3] is 16')

    console.assert(numsBy2PlusIndexAndLength.length === 4, 'numsBy2PlusIndex.length is 4')
    console.assert(numsBy2PlusIndexAndLength[0] === 6, 'numsBy2PlusIndex[0] is 6')
    console.assert(numsBy2PlusIndexAndLength[1] === 13, 'numsBy2PlusIndex[1] is 13')
    console.assert(numsBy2PlusIndexAndLength[2] === 24, 'numsBy2PlusIndex[2] is 24')
    console.assert(numsBy2PlusIndexAndLength[3] === 39, 'numsBy2PlusIndex[3] is 39')
}