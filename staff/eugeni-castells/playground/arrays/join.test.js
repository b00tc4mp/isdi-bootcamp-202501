console.info("CASE join array with no arguments");

{
  const elements = ["Fire", "Air", "Water"];

  const universe = elements.join();

  console.assert(elements.length === 3, "elements length 3");
  console.assert(elements[0] === "Fire", "elements[0] is Fire");
  console.assert(elements[1] === "Air", "elements[1] is Air");
  console.assert(elements[2] === "Water", "elements[2] is Water");
  console.assert(universe === "Fire,Air,Water", 'universe is "Fire,Air,Water"');
}

// console.log(elements.join(""));
// Expected output: "FireAirWater"

// console.log(elements.join("-"));
// Expected output: "Fire-Air-Water"
