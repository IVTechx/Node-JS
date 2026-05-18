import fs from "fs";
import readline from "readline";

export const stats = {
  totalRequests: 0,
  totalResponseTime: 0,
  statusCounts: { 200: 0, 404: 0, 500: 0 },
  peakHeapMB: 0,
};

export async function processLogFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  for await (const line of rl) {
    if (!line.trim()) continue;

    stats.totalRequests++;

    if (line.includes("STATUS: 200")) stats.statusCounts[200]++;
    if (line.includes("STATUS: 404")) stats.statusCounts[404]++;

    if (line.includes("STATUS: 500")) {
      stats.statusCounts[500]++;

      console.log(`[ALERT] ${new Date().toISOString()} - HTTP 500 Internal Server Error detected.`);
    }

    const timeMatch = line.match(/TIME:\s*(\d+)/);
    if (timeMatch) {
      stats.totalResponseTime += parseInt(timeMatch[1], 10);
    }

    const mem = process.memoryUsage().heapUsed / 1024 / 1024;
    if (mem > stats.peakHeapMB) stats.peakHeapMB = mem;
  }

  stats.peakHeapMB = Math.round(stats.peakHeapMB * 100) / 100;
  stats.averageResponseTimeMs = stats.totalRequests
    ? Math.round(stats.totalResponseTime / stats.totalRequests)
    : 0;
}
