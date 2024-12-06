const input = await Deno.readTextFile("input/6.txt");

const DIRECTIONS: (([x, y]: [number, number]) => [number, number])[] = [
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
];
const INITIAL_DIRECTION = 0;

let y = -1;
const obstacles = new Set<`${number},${number}`>();
let start: [number, number] | undefined = undefined;
const rows = input.split("\n");
for (const row of rows) {
  y++;
  let x = -1;
  for (const space of row) {
    x++;
    if (space === "#") {
      obstacles.add(`${x},${y}`);
    } else if (space === "^") {
      start = [x, y];
    }
  }
}
if (start === undefined) {
  throw new Error("Couldn't find starting position");
}
const outOfBoundsX = rows[0].length;
const outOfBoundsY = rows.length;

let direction = INITIAL_DIRECTION;
let space: [number, number] = start;
const visitedSpaces = new Set<`${number},${number}`>();
while (
  space[0] >= 0 &&
  space[0] < outOfBoundsX &&
  space[1] >= 0 &&
  space[1] < outOfBoundsY
) {
  visitedSpaces.add(`${space[0]},${space[1]}`);
  let attemptedNextSpace = DIRECTIONS[direction](space);
  while (obstacles.has(`${attemptedNextSpace[0]},${attemptedNextSpace[1]}`)) {
    direction++;
    direction %= DIRECTIONS.length;
    attemptedNextSpace = DIRECTIONS[direction](space);
  }
  space = attemptedNextSpace;
}
console.log(visitedSpaces.size);
