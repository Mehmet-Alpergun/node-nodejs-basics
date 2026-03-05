import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const folderPath = path.join(__dirname, "files");
  const oldPath = path.join(folderPath, "wrongFilename.txt");
  const newPath = path.join(folderPath, "properFilename.md");

  try {
    await fs.access(oldPath);

    try {
      await fs.access(newPath);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    await fs.rename(oldPath, newPath);
  } catch {
    throw new Error("FS operation failed");
  }
};

await rename();
