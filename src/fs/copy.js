import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const copy = async () => {
  // Write your code here
  const srcPath = path.join(__dirname, "files");
  const destPath = path.join(__dirname, "files_copy");

  try {
    // check if source exists
    await fs.access(srcPath);

    // check if destination already exists
    try {
      await fs.access(destPath);
      throw new Error("Destination already exists"); // files_copy already exists
    } catch (err) {
      // destination does not exist -> continue
      if (err.code !== "ENOENT") throw err;
    }

    await fs.cp(srcPath, destPath, { recursive: true });
  } catch {
    throw new Error("FS operation failed");
  }
};

await copy();
