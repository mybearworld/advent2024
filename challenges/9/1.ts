const input = await Deno.readTextFile("input/9.txt");

const fileSystem: ({ type: "file"; id: number } | { type: "blank" })[] = [];
let fileID = 0;
for (let i = 0; i < input.length; i++) {
  const num = parseInt(input[i]);
  if (i % 2 === 0) {
    for (let j = 0; j < num; j++) {
      fileSystem.push({ type: "file", id: fileID });
    }
    fileID++;
  } else {
    for (let j = 0; j < num; j++) {
      fileSystem.push({ type: "blank" });
    }
  }
}

while (true) {
  const blankSpace = fileSystem.findIndex((entry) => entry.type === "blank");
  const lastFile = fileSystem.findLastIndex((entry) => entry.type === "file");
  if (blankSpace > lastFile) {
    break;
  }
  fileSystem[blankSpace] = fileSystem[lastFile];
  fileSystem[lastFile] = { type: "blank" };
}

const checksum = fileSystem.reduce(
  (acc, entry, i) => (entry.type === "file" ? acc + entry.id * i : acc),
  0
);
console.log(checksum);
