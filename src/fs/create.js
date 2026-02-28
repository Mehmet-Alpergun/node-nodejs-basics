import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// __dirname oluşturmak için
// import.meta.url dosya urlsini alır
// path dirname bu dosyanın bulunduğu klasöre kadar olan kısmı alır
const __filename = fileURLToPath(import.meta.url); // url windows yoluna çevirdi C:\Users\Mehmet\Desktop\project\src\fs\copy.js
const __dirname = path.dirname(__filename); // bu C:\project\src\fs

const create = async () => {
  // Write your code here
  try {
    const filePath = path.join(__dirname, "files", "fresh.txt");

    await fs.writeFile(filePath, "I am fresh and young", {
      flag: "wx",
    });
  } catch (err) {
    if (err.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await create();
