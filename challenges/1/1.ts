const input = (await Deno.readTextFile("input/1.txt")).split("\n");
const arr1 = [];
const arr2 = [];
for (const line of input) {
  const [item1, item2] = line.split("   ");
  arr1.push(parseInt(item1));
  arr2.push(parseInt(item2));
}
arr1.sort();
arr2.sort();
let sum = 0;
for (let i = 0; i < arr1.length; i++) {
  sum += Math.max(arr1[i], arr2[i]) - Math.min(arr1[i], arr2[i]);
}
console.log(sum);
