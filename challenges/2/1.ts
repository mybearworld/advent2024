const input = await Deno.readTextFile("input/2.txt");
let validCount = 0;
for (const record of input.split("\n")) {
  let previousLevel: number | null = null;
  let ascending: boolean | null = null;
  let valid = true;
  for (const levelString of record.split(" ")) {
    const level = parseInt(levelString);
    if (previousLevel !== null && ascending === null) {
      ascending = level > previousLevel;
    }
    if (
      previousLevel !== null &&
      ((ascending && level < previousLevel) ||
        (!ascending && level > previousLevel) ||
        Math.abs(previousLevel - level) < 1 ||
        Math.abs(previousLevel - level) > 3)
    ) {
      valid = false;
      break;
    }
    previousLevel = level;
  }
  console.log(record, valid);
  if (valid) {
    validCount++;
  }
}
console.log(validCount);
