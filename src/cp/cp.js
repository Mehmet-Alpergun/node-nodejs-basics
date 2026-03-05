import { spawn } from "node:child_process";
import { stdin, stdout } from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = join(__dirname, "files", "script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  stdin.on("data", (data) => {
    child.stdin.write(data);
  });

  child.stdout.on("data", (data) => {
    stdout.write(data);
  });
};

spawnChildProcess(["hello", "world"]);
