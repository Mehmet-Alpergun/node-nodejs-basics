import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renameFile = async () => {
  const folderPath = path.join(__dirname, "files"); // fs/filenames klasörü
  const oldPath = path.join(folderPath, "wrongFilename.txt");
  const newPath = path.join(folderPath, "properFilename.md");

  try {
    // 1️⃣ Kaynak dosya var mı kontrol et
    await fs.access(oldPath);

    // 2️⃣ Hedef dosya var mı kontrol et
    try {
      await fs.access(newPath);
      // Dosya zaten varsa hata fırlat
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
      // ENOENT ise hedef dosya yok → devam
    }

    // 3️⃣ Dosyayı yeniden adlandır
    await fs.rename(oldPath, newPath);
  } catch {
    throw new Error("FS operation failed");
  }
};

// Fonksiyonu çalıştır
await renameFile();
