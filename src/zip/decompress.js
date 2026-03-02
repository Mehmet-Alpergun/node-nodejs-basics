import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream/promises";
import { rename, unlink } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const sourcePath = join(__dirname, "files", "archive.gz");
  const tempPath = join(__dirname, "files", "fileToCompress.tmp.txt");
  const finalPath = join(__dirname, "files", "fileToCompress.txt");

  try {
    // pipeline ile geçici dosyaya yazıyoruz
    await pipeline(
      createReadStream(sourcePath),
      createGunzip(),
      createWriteStream(tempPath),
    );

    // Başarılıysa temp dosyayı final dosya olarak rename ediyoruz
    await rename(tempPath, finalPath);
    console.log("Decompression successful.");
  } catch (err) {
    console.error("Decompression failed:", err.message);

    // Eğer temp dosya varsa sil
    try {
      await unlink(tempPath);
    } catch (e) {
      // Silme başarısız olabilir, genellikle dosya yoktur
    }
  }
};

await decompress();
