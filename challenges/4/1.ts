const input = await Deno.readTextFile("input/4.txt");

const FIRST_LETTER = "X";
const REST_LETTERS = ["M", "A", "S"];

type Direction = (r: number, c: number) => [number, number];
const adjacent: Direction[] = [
  (r, c) => [r, c + 1],
  (r, c) => [r, c - 1],
  (r, c) => [r + 1, c],
  (r, c) => [r - 1, c],
  (r, c) => [r + 1, c + 1],
  (r, c) => [r + 1, c - 1],
  (r, c) => [r - 1, c + 1],
  (r, c) => [r - 1, c - 1],
];

const rows = input.split("\n");
let matches = 0;
for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const columns = rows[rowIndex];
  for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    const letter = columns[columnIndex];
    if (letter !== FIRST_LETTER) {
      continue;
    }
    let possibleMatches: {
      cell: [number, number];
      dir: Direction | undefined;
    }[] = [{ cell: [rowIndex, columnIndex], dir: undefined }];
    for (let letterI = 0; letterI < REST_LETTERS.length; letterI++) {
      const letter = REST_LETTERS[letterI];
      const newPossibleMatches: typeof possibleMatches = [];
      for (const match of possibleMatches) {
        const dirs = match.dir === undefined ? adjacent : [match.dir];
        for (const dir of dirs) {
          const [nextRowIndex, nextColumnIndex] = dir(
            match.cell[0],
            match.cell[1]
          );
          const nextLetter = rows[nextRowIndex]?.[nextColumnIndex];
          if (nextLetter !== letter) {
            continue;
          }
          newPossibleMatches.push({
            cell: [nextRowIndex, nextColumnIndex],
            dir,
          });
        }
      }
      if (letterI === REST_LETTERS.length - 1) {
        matches += newPossibleMatches.length;
      }
      possibleMatches = newPossibleMatches;
    }
  }
}
console.log(matches);
