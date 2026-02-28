import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFile = async () => {
  const folderPath = path.join(__dirname, "files"); // fs/filenames klasörü
  const filePath = path.join(folderPath, "fileToRemove.txt");

  try {
    // Dosya var mı kontrol et
    await fs.access(filePath);

    // Dosyayı sil
    await fs.unlink(filePath);
  } catch {
    // Hata varsa (dosya yok veya başka bir FS hatası)
    throw new Error("FS operation failed");
  }
};

// Fonksiyonu çalıştır
await deleteFile();
