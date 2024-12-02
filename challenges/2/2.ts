const input = await Deno.readTextFile("input/2.txt");

const validateRecord = (
  levels: string[],
  ignore: number | undefined = undefined
) => {
  let previousLevel: number | null = null;
  let ascending: boolean | null = null;
  let valid = true;
  for (let i = 0; i < levels.length; i++) {
    if (i === ignore) {
      continue;
    }
    const level = parseInt(levels[i]);
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
  if (!valid && ignore === undefined) {
    for (let i = 0; i < levels.length; i++) {
      const validWithDampener = validateRecord(levels, i);
      if (validWithDampener) {
        return true;
      }
    }
  }
  return valid;
};

let validCount = 0;
for (const record of input.split("\n")) {
  const valid = validateRecord(record.split(" "));
  console.log(record, valid);
  if (valid) {
    validCount++;
  }
}
console.log(validCount);
