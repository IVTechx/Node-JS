import fs from "fs";
import path from "path";

export const OUTPUT_PATH = path.join(process.cwd(), "access.log");

export function generateLogs() {
  return new Promise((resolve) => {
    const stream = fs.createWriteStream(OUTPUT_PATH);
    let i = 100000;

    function write() {
      while (i > 0) {
        i--;
        const timestamp = new Date().toISOString();
        const method = Math.random() > 0.5 ? "GET" : "POST";
        const status = [200, 404, 500][Math.floor(Math.random() * 3)];
        const responseTime = Math.floor(Math.random() * 400) + 10;

        const logLine = `${timestamp} - ${method} - STATUS: ${status} - TIME: ${responseTime}ms\n`;

        if (i === 0) {
          stream.write(logLine, () => {
            stream.end();
            resolve();
          });
        } else if (!stream.write(logLine)) {
          return stream.once("drain", write);
        }
      }
    }
    write();
  });
}
