import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module’de __dirname almak için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listFiles = async () => {
  const folderPath = path.join(__dirname, "files"); // files klasörü

  try {
    // 1️⃣ Klasör var mı kontrol et
    await fs.access(folderPath);

    // 2️⃣ Klasördeki dosya ve klasörleri listele
    const filenames = await fs.readdir(folderPath);

    // 3️⃣ Konsola yazdır
    console.log(filenames);
  } catch {
    // Hata varsa → klasör yok veya başka bir FS hatası
    throw new Error("FS operation failed");
  }
};

// Fonksiyonu çalıştır
await listFiles();
