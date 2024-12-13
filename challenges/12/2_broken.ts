// This was my initial solution, and it does work for the example inputs, but
// not for my actual input. The next day, I tried the alternate approach in
// 2.ts and that worked

const input = await Deno.readTextFile("input/12.txt");
const rows = input.split("\n");

type OtherDirs = ([x, y]: [number, number]) => [
  [number, number],
  [number, number],
];
const X_OTHER: OtherDirs = ([x, y]: [number, number]) => [
  [x + 1, y],
  [x - 1, y],
];
const Y_OTHER: OtherDirs = ([x, y]: [number, number]) => [
  [x, y + 1],
  [x, y - 1],
];
const DIRECTIONS: {
  fn: ([x, y]: [number, number]) => [number, number];
  name: string;
  other: OtherDirs;
}[] = [
  { fn: ([x, y]) => [x, y - 1], name: "up", other: X_OTHER },
  { fn: ([x, y]) => [x + 1, y], name: "right", other: Y_OTHER },
  { fn: ([x, y]) => [x, y + 1], name: "down", other: X_OTHER },
  { fn: ([x, y]) => [x - 1, y], name: "left", other: Y_OTHER },
];

const alreadyConsidered = new Set<`${number},${number}`>();
let price = 0;
let y = -1;
for (const row of rows) {
  y++;
  let x = -1;
  for (const plant of row) {
    x++;
    if (alreadyConsidered.has(`${x},${y}`)) {
      continue;
    }
    let area = 1;
    let sides = 0;
    const foundPerimiters = new Set<`${number},${number} dir=${string}`>();
    let neighbouringPlants = new Set<`${number},${number}`>([`${x},${y}`]);
    while (neighbouringPlants.size !== 0) {
      const newNeighbouringPlants = new Set<`${number},${number}`>();
      for (const neighbouringPlant of neighbouringPlants) {
        const neighbouringPlantCoords = neighbouringPlant
          .split(",")
          .map((n) => parseInt(n)) as [number, number];
        for (const direction of DIRECTIONS) {
          const [newX, newY] = direction.fn(neighbouringPlantCoords);
          // console.log(
          //   neighbouringPlantCoords,
          //   "->",
          //   newX,
          //   newY,
          //   foundPerimiters
          // );
          const hadAdjacentPerimeter = direction
            .other(neighbouringPlantCoords)
            .some(([coordX, coordY]) =>
              foundPerimiters.has(`${coordX},${coordY} dir=${direction.name}`)
            );
          if (rows[newY]?.[newX] !== plant) {
            if (!hadAdjacentPerimeter) {
              sides++;
            }
            foundPerimiters.add(
              `${neighbouringPlantCoords[0]},${neighbouringPlantCoords[1]} dir=${direction.name}`
            );
            continue;
          }
          if (
            !alreadyConsidered.has(`${newX},${newY}`) &&
            !newNeighbouringPlants.has(`${newX},${newY}`)
          ) {
            area++;
            newNeighbouringPlants.add(`${newX},${newY}`);
          }
        }
        alreadyConsidered.add(
          `${neighbouringPlantCoords[0]},${neighbouringPlantCoords[1]}`
        );
      }
      neighbouringPlants = newNeighbouringPlants;
    }
    console.log(`Field ${plant}, area ${area}, sides ${sides}`);
    price += area * sides;
  }
}
console.log(price);
