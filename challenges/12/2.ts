const input = await Deno.readTextFile("input/12.txt");
const rows = input.split("\n");

type Direction = ([x, y]: [number, number]) => [number, number];
type OtherDirs = [Direction, Direction];
const X_OTHER: OtherDirs = [([x, y]) => [x + 1, y], ([x, y]) => [x - 1, y]];
const Y_OTHER: OtherDirs = [([x, y]) => [x, y + 1], ([x, y]) => [x, y - 1]];
const DIRECTIONS: {
  fn: Direction;
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
          if (rows[newY]?.[newX] !== plant) {
            if (
              !foundPerimiters.has(
                `${neighbouringPlantCoords[0]},${neighbouringPlantCoords[1]} dir=${direction.name}`
              )
            ) {
              sides++;
              for (const otherDirection of direction.other) {
                let coords = neighbouringPlantCoords;
                let dirCoords = direction.fn(coords);
                while (
                  rows[coords[1]]?.[coords[0]] === plant &&
                  rows[dirCoords[1]]?.[dirCoords[0]] !== plant
                ) {
                  // console.log(
                  //   "adding",
                  //   coords,
                  //   "as",
                  //   rows[coords[1]]?.[coords[0]]
                  // );
                  foundPerimiters.add(
                    `${coords[0]},${coords[1]} dir=${direction.name}`
                  );
                  coords = otherDirection(coords);
                  dirCoords = direction.fn(coords);
                }
              }
            }
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
