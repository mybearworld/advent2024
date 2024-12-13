const input = await Deno.readTextFile("input/12.txt");
const rows = input.split("\n");

const DIRECTIONS: (([x, y]: [number, number]) => [number, number])[] = [
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
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
    let perimeter = 0;
    let neighbouringPlants = new Set<`${number},${number}`>([`${x},${y}`]);
    while (neighbouringPlants.size !== 0) {
      const newNeighbouringPlants = new Set<`${number},${number}`>();
      for (const neighbouringPlant of neighbouringPlants) {
        const neighbouringPlantCoords = neighbouringPlant
          .split(",")
          .map((n) => parseInt(n)) as [number, number];
        for (const direction of DIRECTIONS) {
          const [newX, newY] = direction(neighbouringPlantCoords);
          if (rows[newY]?.[newX] !== plant) {
            perimeter++;
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
    console.log(`Field ${plant}, area ${area}, perimeter ${perimeter}`);
    price += area * perimeter;
  }
}
console.log(price);
