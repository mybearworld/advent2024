const input = await Deno.readTextFile("input/8.txt");

const rows = input.split("\n");
let y = -1;
const antennas: { frequency: string; x: number; y: number }[] = [];
for (const row of rows) {
  y++;
  let x = -1;
  for (const cell of row) {
    x++;
    if (cell !== ".") {
      antennas.push({ frequency: cell, x, y });
    }
  }
}
const outOfBoundsY = rows.length;
const outOfBoundsX = rows[0].length;
const withinBounds = (x: number, y: number) =>
  x > -1 && y > -1 && x < outOfBoundsX && y < outOfBoundsY;

let i = -1;
const antidotes = new Set<`${number},${number}`>();
for (const antenna of antennas) {
  i++;
  for (let j = i + 1; j < antennas.length; j++) {
    const antenna2 = antennas[j];
    if (antenna.frequency !== antenna2.frequency) {
      continue;
    }
    const xDiff = antenna.x - antenna2.x;
    const yDiff = antenna.y - antenna2.y;
    if (withinBounds(antenna.x + xDiff, antenna.y + yDiff)) {
      antidotes.add(`${antenna.x + xDiff},${antenna.y + yDiff}`);
    }
    if (withinBounds(antenna2.x - xDiff, antenna2.y - yDiff)) {
      antidotes.add(`${antenna2.x - xDiff},${antenna2.y - yDiff}`);
    }
  }
}
console.log(antidotes.size);
