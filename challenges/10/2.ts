const input = await Deno.readTextFile("input/10.txt");
const grid = input.split("\n");

const BASE_HEIGHT = "0";
const HEIGHTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const DIRECTIONS: (([x, y]: [number, number]) => [number, number])[] = [
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
];

let totalScore = 0;
let y = -1;
for (const row of grid) {
  y++;
  let x = -1;
  for (const cell of row) {
    x++;
    if (cell !== BASE_HEIGHT) {
      continue;
    }
    let forks: [number, number][] = [[x, y]];
    for (const height of HEIGHTS) {
      const nextForks: [number, number][] = [];
      for (const fork of forks) {
        for (const direction of DIRECTIONS) {
          const [nextX, nextY] = direction(fork);
          if (grid[nextY]?.[nextX] === height) {
            nextForks.push([nextX, nextY]);
          }
        }
      }
      forks = nextForks;
      if (nextForks.length === 0) {
        break;
      }
    }
    totalScore += forks.length;
  }
}
console.log(totalScore);
