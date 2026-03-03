import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  const results = new Array(cpuCount);

  const workers = [];

  for (let i = 0; i < cpuCount; i++) {
    const worker = new Worker("./worker.js", {
      workerData: 10 + i,
    });

    workers.push(
      new Promise((resolve) => {
        worker.on("message", (message) => {
          results[i] = message;
          resolve();
        });

        worker.on("error", () => {
          results[i] = {
            status: "error",
            data: null,
          };
          resolve();
        });
      }),
    );
  }

  await Promise.all(workers);

  console.log(results);
};

await performCalculations();
