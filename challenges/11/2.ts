const input = await Deno.readTextFile("input/11.txt");
const numbers = input.split(" ").map((n) => parseInt(n));

const m = new Map<`n=${number} stepsLeft=${number}`, number>();
const blinkN = (number: number, stepsLeft = 75): number => {
  if (stepsLeft === 0) {
    return 0;
  }
  const stringifiedCall = `n=${number} stepsLeft=${stepsLeft}` as const;
  const memoized = m.get(stringifiedCall);
  if (memoized) {
    return memoized;
  }
  const memoCall = (result: number) => {
    m.set(stringifiedCall, result);
    return result;
  };
  if (number === 0) {
    return memoCall(blinkN(1, stepsLeft - 1));
  }
  const stringNumber = number.toString();
  if (stringNumber.length % 2 === 0) {
    return memoCall(
      blinkN(
        parseInt(stringNumber.slice(0, stringNumber.length / 2)),
        stepsLeft - 1
      ) +
        blinkN(
          parseInt(stringNumber.slice(stringNumber.length / 2)),
          stepsLeft - 1
        ) +
        1
    );
  }
  return memoCall(blinkN(number * 2024, stepsLeft - 1));
};

console.log(numbers.reduce((acc, n) => acc + blinkN(n), numbers.length));
