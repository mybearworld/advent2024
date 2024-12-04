const input = await Deno.readTextFile("input/4.txt");

const CENTER_LETTER = "A";
const FIRST_EDGE_LETTER = "M";
const SECOND_EDGE_LETTER = "S";
const checkDiagonal = (
  diagonal: readonly [string | undefined, string | undefined]
) =>
  (diagonal[0] === FIRST_EDGE_LETTER && diagonal[1] === SECOND_EDGE_LETTER) ||
  (diagonal[0] === SECOND_EDGE_LETTER && diagonal[1] === FIRST_EDGE_LETTER);

const rows = input.split("\n");
let matches = 0;
for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const columns = rows[rowIndex];
  for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    const letter = columns[columnIndex];
    if (letter !== CENTER_LETTER) {
      continue;
    }
    const firstDiagonal = [
      rows[rowIndex + 1]?.[columnIndex + 1],
      rows[rowIndex - 1]?.[columnIndex - 1],
    ] as const;
    const secondDiagonal = [
      rows[rowIndex + 1]?.[columnIndex - 1],
      rows[rowIndex - 1]?.[columnIndex + 1],
    ] as const;
    if (checkDiagonal(firstDiagonal) && checkDiagonal(secondDiagonal)) {
      matches++;
    }
  }
}
console.log(matches);
