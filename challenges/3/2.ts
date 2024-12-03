const input = await Deno.readTextFile("input/3.txt");

let sum = 0;
let doMultiply = true;
for (const [, operation, n1, n2] of input.matchAll(
  /(mul|do|don't)\((?:(\d{1,3}),(\d{1,3}))?\)/g
)) {
  console.log(operation, n1, n2, doMultiply);
  if (operation === "do") {
    doMultiply = true;
  } else if (operation === "don't") {
    doMultiply = false;
  } else if (operation === "mul" && doMultiply) {
    if (n1 === undefined || n2 === undefined) {
      continue;
    }
    sum += parseInt(n1) * parseInt(n2);
  }
}
console.log(sum);
