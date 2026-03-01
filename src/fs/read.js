import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module için __dirname tanımı
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  console.log(filePath);
  try {
    // 1️⃣ Dosya var mı kontrol et
    await fs.access(filePath);

    // 2️⃣ Dosyayı oku (utf-8 ile string olarak)
    const content = await fs.readFile(filePath, "utf-8");

    // 3️⃣ İçeriği konsola yazdır
    console.log(content);
  } catch {
    // Dosya yoksa veya başka bir FS hatası varsa
    throw new Error("FS operation failed");
  }
};

await read();
