const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const port = Number(process.env.PORT || 4173);
const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function localAddresses() {
  const nets = os.networkInterfaces();
  const addresses = ["localhost"];
  Object.values(nets).forEach((list) => {
    (list || []).forEach((entry) => {
      if (entry.family === "IPv4" && !entry.internal) addresses.push(entry.address);
    });
  });
  return addresses;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const requestPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = path.resolve(root, `.${requestPath}`);

  if (!target.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(target, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("Codex Prism is running:");
  localAddresses().forEach((address) => {
    console.log(`  http://${address}:${port}/index.html`);
    console.log(`  http://${address}:${port}/index.html?demo=auto&time=60`);
  });
});
