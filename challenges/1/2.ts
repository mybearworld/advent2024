const input = (await Deno.readTextFile("input/1.txt")).split("\n");
const numbers = [];
const occurences = new Map<number, number>();
for (const line of input) {
  const [item1, item2] = line.split("   ");
  numbers.push(parseInt(item1));
  const nItem2 = parseInt(item2);
  occurences.set(nItem2, (occurences.get(nItem2) ?? 0) + 1);
}
let similarity = 0;
for (const number of numbers) {
  similarity += number * (occurences.get(number) ?? 0);
}
console.log(similarity);
