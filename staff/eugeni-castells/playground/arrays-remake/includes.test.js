require("./includes");

console.info("TEST includes");

console.info("CASE check one element existent in array");

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(4);

  console.assert(boolean === true, "boolean is true");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}

console.info("CASE check one element non-existent in array");

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(5);

  console.assert(boolean === false, "boolean is false");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}

console.info(
  "CASE check existent element in array and a positive index but not find"
);

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(2, 3);

  console.assert(boolean === false, "boolean is false");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}

console.info(
  "CASE check existent element in array and a positive index and find"
);

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(2, 1);

  console.assert(boolean === true, "boolean is false");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}

console.info(
  "CASE check existent element in array and a negative index larger than length"
);

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(2, -10);

  console.assert(boolean === true, "boolean is false");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}

console.info(
  "CASE check existent element in array and a negative index lower than length and find"
);

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(4, -1);

  console.assert(boolean === true, "boolean is true");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}

console.info(
  "CASE check existent element in array and a negative index lower than length and not find"
);

{
  const nums = [1, 2, 3, 4];

  const boolean = nums.includes(2, -1);

  console.assert(boolean === false, "boolean is false");
  console.assert(nums[0] === 1, "nums[0] is 1");
  console.assert(nums[1] === 2, "nums[1] is 2");
  console.assert(nums[2] === 3, "nums[2] is 3");
  console.assert(nums[3] === 4, "nums[3] is 4");
  console.assert(nums.length === 4, "nums length is 4");
}
