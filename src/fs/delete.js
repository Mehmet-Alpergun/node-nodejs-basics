import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  const folderPath = path.join(__dirname, "files");
  const filePath = path.join(folderPath, "fileToRemove.txt");

  try {
    await fs.access(filePath);

    await fs.unlink(filePath);
  } catch {
    throw new Error("FS operation failed");
  }
};

await remove();
