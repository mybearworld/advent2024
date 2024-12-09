const input = await Deno.readTextFile("input/9.txt");

type File = { type: "file"; length: number; id: number };
type Blank = { type: "blank"; length: number };
const fileSystem: (File | Blank)[] = [];
let fileID = 0;
for (let i = 0; i < input.length; i++) {
  const length = parseInt(input[i]);
  if (i % 2 === 0) {
    fileSystem.push({ type: "file", id: fileID, length });
    fileID++;
  } else {
    fileSystem.push({ type: "blank", length });
  }
}

const ignoredFiles = new Set<number>();
while (true) {
  const lastFileIndex = fileSystem.findLastIndex(
    (entry) => entry.type === "file" && !ignoredFiles.has(entry.id)
  );
  if (lastFileIndex === -1) {
    break;
  }
  const lastFile = fileSystem[lastFileIndex] as File;
  const blankSpaceIndex = fileSystem.findIndex(
    (entry, i) =>
      entry.type === "blank" &&
      entry.length >= lastFile.length &&
      i < lastFileIndex
  );
  if (blankSpaceIndex === -1) {
    ignoredFiles.add(lastFile.id);
    continue;
  }
  const blankSpace = fileSystem[blankSpaceIndex];
  if (blankSpaceIndex > lastFileIndex) {
    break;
  }
  fileSystem[lastFileIndex] = {
    type: "blank",
    length: lastFile.length,
  };
  fileSystem.splice(blankSpaceIndex, 1, lastFile, {
    type: "blank",
    length: blankSpace.length - lastFile.length,
  });
}

const checksum = fileSystem
  .flatMap((entry) => Array(entry.length).fill(entry))
  .reduce(
    (acc, entry, i) => (entry.type === "file" ? acc + entry.id * i : acc),
    0
  );
console.log(checksum);
