import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");

  const readable = createReadStream(filePath, { encoding: "utf-8" });

  readable.pipe(process.stdout);
};

await read();
