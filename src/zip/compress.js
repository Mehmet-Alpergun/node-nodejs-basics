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
    // pipeline ile geçici dosyaya yazıyoruz
    await pipeline(
      createReadStream(sourcePath),
      createGzip(),
      createWriteStream(tempPath),
    );

    // Başarılıysa final dosyaya geçiyoruz
    await rename(tempPath, finalPath);
    console.log("Compression successful.");
  } catch (err) {
    console.error("Compression failed:", err.message);

    // Eğer temp dosya varsa sil
    try {
      await unlink(tempPath);
    } catch (e) {
      // Silme başarısız olabilir, genellikle dosya yoktur
    }
  }
};

await compress();
