import { generateLogs, OUTPUT_PATH } from "./generate-logs.js";
import { processLogFile } from "./stream-processor.js";
import { createServer } from "./report-server.js";

async function main() {
  console.log("Generating log file.");
  await generateLogs();

  console.log("Processing...");
  await processLogFile(OUTPUT_PATH);

  console.log("\n Server is on http://localhost:3000/stats");
  createServer().listen(3000);
}

main().catch(console.error);
