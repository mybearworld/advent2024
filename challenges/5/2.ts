const input = await Deno.readTextFile("input/5.txt");

const [rulesString, updatesString] = input.split("\n\n");

const rules = rulesString.split("\n").map((rule) => {
  const [before, after] = rule.split("|");
  return { before, after };
});
const updates = updatesString.split("\n").map((update) => {
  const indices = new Map<string, number>();
  const pages = update.split(",");
  pages.forEach((page, i) => {
    indices.set(page, i);
  });
  if (pages.length % 2 !== 1) {
    throw new Error(`Update with an even number of pages: ${update}`);
  }
  const middle = parseInt(pages[Math.floor(pages.length / 2)]);
  return { pages, indices, middle };
});

let result = 0;
updates.forEach((update) => {
  const failed = rules.some((rule) => {
    return (
      (update.indices.get(rule.before) ?? -Infinity) >
      (update.indices.get(rule.after) ?? Infinity)
    );
  });
  if (failed) {
    const fixed = update.pages.toSorted((a, b) => {
      const rule = rules.find(
        (rule) =>
          (rule.before === a && rule.after === b) ||
          (rule.before === b && rule.after === a)
      );
      return rule === undefined ? 0 : rule.before === a ? -1 : 1;
    });
    result += parseInt(fixed[Math.floor(fixed.length / 2)]);
  }
});

console.log(result);
