import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";
import { rename, unlink } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const sourcePath = join(__dirname, "files", "fileToCompress.txt");
  const tempPath = join(__dirname, "files", "archive.tmp.gz");
  const finalPath = join(__dirname, "files", "archive.gz");

  try {
    await pipeline(
      createReadStream(sourcePath),
      createGzip(),
      createWriteStream(tempPath),
    );

    await rename(tempPath, finalPath);
    console.log("Compression successful.");
  } catch (err) {
    console.error("Compression failed:", err.message);

    try {
      await unlink(tempPath);
    } catch (e) {}
  }
};

await compress();
