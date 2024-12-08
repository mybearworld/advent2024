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
    let antennaX = antenna.x;
    let antennaY = antenna.y;
    while (withinBounds(antennaX, antennaY)) {
      antidotes.add(`${antennaX},${antennaY}`);
      antennaX += xDiff;
      antennaY += yDiff;
    }
    let antenna2X = antenna.x;
    let antenna2Y = antenna.y;
    while (withinBounds(antenna2X, antenna2Y)) {
      antidotes.add(`${antenna2X},${antenna2Y}`);
      antenna2X -= xDiff;
      antenna2Y -= yDiff;
    }
  }
}
console.log(antidotes.size);
