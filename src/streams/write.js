import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");

  const writable = createWriteStream(filePath);

  process.stdin.pipe(writable);
};

await write();
