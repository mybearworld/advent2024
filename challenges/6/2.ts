// This is my slowest, weirdest advent of code solution yet
// But it works ¯\_(ツ)_/¯

const input = await Deno.readTextFile("input/6.txt");

const DIRECTIONS: (([x, y]: [number, number]) => [number, number])[] = [
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
] as const;
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

const simulate = (
  direction: number,
  space: [number, number],
  obstacles: Set<`${number},${number}`>,
  checkObstacles = true
):
  | { type: "loop" }
  | { type: "quit"; loopObstacles: Set<`${number},${number}`> } => {
  const originalDirection = direction;
  const originalSpace = space;
  const visitedStates = new Set<`${number},${number} dir=${number}`>();
  const loopObstacles = new Set<`${number},${number}`>();
  const checkedObstacles = new Set<`${number},${number}`>();
  if (obstacles.has(`${space[0]},${space[1]}`)) {
    // this is probably a sign of a bug in the code somewhere but uh uh uhhhh uh
    // uhhhhhhh uhh uhhhhhh uhh
    return { type: "quit", loopObstacles };
  }
  while (true) {
    visitedStates.add(`${space[0]},${space[1]} dir=${direction}`);
    let attemptedNextSpace = DIRECTIONS[direction](space);
    let triedDirections = 1;
    while (obstacles.has(`${attemptedNextSpace[0]},${attemptedNextSpace[1]}`)) {
      if (triedDirections === 4) {
        return { type: "loop" };
      }
      direction++;
      direction %= DIRECTIONS.length;
      attemptedNextSpace = DIRECTIONS[direction](space);
      triedDirections++;
    }
    space = attemptedNextSpace;
    if (checkObstacles && !checkedObstacles.has(`${space[0]},${space[1]}`)) {
      if (
        simulate(
          originalDirection,
          originalSpace,
          obstacles.union(
            new Set<`${number},${number}`>([`${space[0]},${space[1]}`])
          ),
          false
        ).type === "loop"
      ) {
        loopObstacles.add(`${space[0]},${space[1]}`);
      }
      checkedObstacles.add(`${space[0]},${space[1]}`);
    }
    if (
      space[0] < 0 ||
      space[0] >= outOfBoundsX ||
      space[1] < 0 ||
      space[1] >= outOfBoundsY
    ) {
      return { type: "quit", loopObstacles };
    }
    if (visitedStates.has(`${space[0]},${space[1]} dir=${direction}`)) {
      return { type: "loop" };
    }
  }
};

const result = simulate(INITIAL_DIRECTION, start, obstacles);
if (result.type === "quit") {
  console.log(result.loopObstacles, result.loopObstacles.size);
} else {
  throw new Error("This state results in a loop");
}
