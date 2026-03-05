import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const srcPath = path.join(__dirname, "files");
  const destPath = path.join(__dirname, "files_copy");

  try {
    await fs.access(srcPath);

    try {
      await fs.access(destPath);
      throw new Error("Destination already exists");
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    await fs.cp(srcPath, destPath, { recursive: true });
  } catch {
    throw new Error("FS operation failed");
  }
};

await copy();
