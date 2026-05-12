import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;
let todos = [
  { id: 1778600517426, task: "Buy groceries" },
  { id: 1778601112630, task: "Wake up" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && (url === "/" || url === "/index.html")) {
    fs.readFile(path.join(process.cwd(), "index.html"), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (method === "GET" && url === "/api/todos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else if (method === "POST" && url === "/api/todos") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const task = parsed.task ? parsed.task.trim() : "";

        if (!task) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Task content cannot be empty" }));
        }
        const newTodo = { id: Date.now(), task};
        todos.push(newTodo);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTodo));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
