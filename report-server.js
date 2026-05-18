import http from "http";
import { stats } from "./stream-processor.js";

export function createServer() {
  return http.createServer((req, res) => {
    if (req.url === "/stats") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h1> Log Metrics</h1>
        <table border="1" cellpadding="10" style="border-collapse:collapse;">
          <tr>
          <th>Metric</th><th>Value</th>
          </tr>
          <tr>
          <td>Total Requests</td><td>${stats.totalRequests}</td>
          </tr>
          <tr>
          <td>Avg Response Time</td><td>${stats.averageResponseTimeMs} ms</td>
          </tr>
          <tr>
          <td>Status 200</td><td>${stats.statusCounts[200]}</td>
          </tr>
          <tr>
          <td>Status 404</td><td>${stats.statusCounts[404]}</td>
          </tr>
          <tr>
          <td>Status 500</td><td>${stats.statusCounts[500]}</td>
          </tr>
          <tr>
          <td>Peak Memory</td><td>${stats.peakHeapMB} MB</td>
          </tr>
          <tr>
          <td>Memory Goal (<50MB)</td>
          <td>${stats.peakHeapMB < 50 ? "PASSED" : "FAILED"}</td>
          </tr>
        </table>
      `);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });
}
