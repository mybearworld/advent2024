const input = await Deno.readTextFile("input/7.txt");

const OPERATORS: ((n1: number, n2: number) => number)[] = [
  (n1, n2) => n1 + n2,
  (n1, n2) => n1 * n2,
  (n1, n2) => n1 * 10 ** Math.floor(Math.log10(n2) + 1) + n2,
];

const operations = input.split("\n").map((operation) => {
  const [resultString, operandsString] = operation.split(": ");
  const result = parseInt(resultString);
  const operands = operandsString.split(" ").map((s) => parseInt(s));
  return { result, operands };
});

const validOperation = (operation: { result: number; operands: number[] }) => {
  const intermediateResults = [];
  let i = -1;
  for (const operand of operation.operands) {
    i++;
    if (i === 0) {
      intermediateResults.push(operand);
      continue;
    }
    const isLast = i === operation.operands.length - 1;
    for (const result of [...intermediateResults]) {
      for (const operator of OPERATORS) {
        if (!isLast) {
          intermediateResults.push(operator(result, operand));
        } else if (operator(result, operand) === operation.result) {
          return true;
        }
      }
    }
  }
  return false;
};

let sum = 0;
operations.forEach((operation) => {
  if (validOperation(operation)) {
    sum += operation.result;
  }
});
console.log(sum);
