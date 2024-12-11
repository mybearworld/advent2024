const input = await Deno.readTextFile("input/11.txt");

const blink = (numbers: number[]): number[] => {
  return numbers.flatMap((number) => {
    if (number === 0) {
      return 1;
    }
    const stringNumber = number.toString();
    if (stringNumber.length % 2 === 0) {
      return [
        parseInt(stringNumber.slice(0, stringNumber.length / 2)),
        parseInt(stringNumber.slice(stringNumber.length / 2)),
      ];
    }
    return number * 2024;
  });
};

let numbers = input.split(" ").map((n) => parseInt(n));
for (let i = 0; i < 25; i++) {
  numbers = blink(numbers);
}
console.log(numbers.length);
