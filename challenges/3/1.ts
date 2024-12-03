const input = await Deno.readTextFile("input/3.txt");

let sum = 0;
for (const [, n1, n2] of input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)) {
  sum += parseInt(n1) * parseInt(n2);
}
console.log(sum);
